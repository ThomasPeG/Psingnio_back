import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import { PersonalityTypesService } from '../personality-types/personality-types.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    private personalityTypesService: PersonalityTypesService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.warn(
        'GEMINI_API_KEY is not defined. AI module will not work.',
      );
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async generateChatResponse(
    message: string,
    archetypeId: number,
    secondaryArchetypeId: number,
    mode: 'mentor' | 'friend' = 'mentor',
  ): Promise<{ reply: string }> {
    if (!this.genAI) {
      throw new InternalServerErrorException('AI service is not configured.');
    }
    const [archetype, secondaryArchetype] = await Promise.all([
      this.personalityTypesService.findOne(archetypeId),
      this.personalityTypesService.findOne(secondaryArchetypeId),
    ]);

    if (!archetype || !secondaryArchetype) {
      throw new NotFoundException('One or both archetypes not found.');
    }

    const mentorPrompt = `Eres un mentor astuto, directo y práctico. Tu conocimiento de los arquetipos sirve para dar consejos reales, no para recitar poemas. Si el usuario pide ayuda con algo concreto (un CV, una pelea, un negocio), dale soluciones que pueda usar hoy mismo.
    Prohibido usar las frases exactas de las variables de abajo. Úsalas como conceptos para crear un discurso o consejo original, no uses una misma estructura de respuestas para todas las preguntas, actúa espontáneo como un humano.
      Contexto de la conversación:
      el usuario tiene:
      - arquetipo dominante: "${archetype.titulo}".
      - esencia: "${archetype.esencia}".
      - debilidades (en sombra): ${archetype.victimizacion.frase} / ${archetype.enSombra.join(', ')}.
      - fortalezas (en luz): ${archetype.enLuz.join(', ')}.
      - arquetipo secundario: "${secondaryArchetype.titulo}", que representa su potencial de crecimiento y cómo se muestra bajo presión.
      - La esencia de este arquetipo es: "${secondaryArchetype.esencia}".
      - Su victimización es: ${secondaryArchetype.victimizacion.frase}.
      Nota: basa tus respuestas un 85% en el arquetipo dominante, el 10% en el arquetipo secundario, usa el resto del 5% en tu propio criterio basado en el internet. 
      
      Instrucciones de respuesta (Estilo Mentor):
      - Tono: Directo, perspicaz y astuto. Háblale con franqueza para impulsarlo a la acción.
      - Sé conciso y directo, pero profundo. No uses más de 150 palabras.
      - Responde siempre en español. No saludes ni te despidas. Ve directo al consejo, de forma profesional y al grano.`;

    const friendPrompt = `Actúa como su mejor amigo y confidente (no exageres con tu forma de hablar). Eres empático, relajado y comprensivo, brindando apoyo de forma amable y evitando palabras rebuscadas, manteniéndolo muy natural y sin demasiada formalidad. Tu misión es escucharlo, validar sus emociones y darle un consejo compasivo basado en su personalidad profunda.
    Prohibido usar las frases exactas de las variables de abajo. Úsalas como conceptos para crear un discurso amigable y original, no uses una misma estructura de respuestas para todas las preguntas, actúa espontáneo como un buen amigo humano.
      Contexto de la conversación:
      el usuario tiene:
      - arquetipo dominante: "${archetype.titulo}".
      - esencia: "${archetype.esencia}".
      - debilidades (en sombra): ${archetype.victimizacion.frase} / ${archetype.enSombra.join(', ')}.
      - fortalezas (en luz): ${archetype.enLuz.join(', ')}.
      - arquetipo secundario: "${secondaryArchetype.titulo}", que representa su potencial de crecimiento y cómo se muestra bajo presión.
      - La esencia de este arquetipo es: "${secondaryArchetype.esencia}".
      - Su victimización es: ${secondaryArchetype.victimizacion.frase}.
      
      Tu misión es:
      1. Interpretar la situación del usuario desde su arquetipo dominante (85% del peso).
      2. Integrar matices del arquetipo secundario (10% del peso).
      3. Añadir un toque de intuición emocional y cercanía (5% del peso).

      Instrucciones de respuesta (Estilo Amigo):
      - Tono: Muy empático, suave, comprensivo, cercano y relajado.
      - Sé conciso pero muy humano y cálido. No uses más de 150 palabras.
      - Responde siempre en español. No des sermones duros ni saludes formalmente.
      - Usa emojis para que el trato sea más afectuoso, entretenido y natural.`;

    const systemPrompt = mode === 'friend' ? friendPrompt : mentorPrompt;
    console.log('systemPrompt', systemPrompt);


    try {
      // Attempt to use the primary, most modern model
      this.logger.log('Attempting to generate response with primary model...');
      const primaryModel = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
      const chat = primaryModel.startChat({
        history: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: 'Entendido. Estoy listo para responder como el sabio experto en arquetipos.' }] },
        ],
        generationConfig: { maxOutputTokens: 250 },
        safetySettings: this.getSafetySettings(),
      });
      const result = await chat.sendMessage(message);
      return { reply: result.response.text() };

    } catch (error: any) {
      this.logger.warn('Primary model failed. Attempting fallback model...');

      // Fallback to a more stable model if the primary one fails
      try {
        const fallbackModel = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const chat = fallbackModel.startChat({
          history: [
            { role: 'user', parts: [{ text: systemPrompt }] },
            { role: 'model', parts: [{ text: 'Entendido. Estoy listo para responder como el sabio experto en arquetipos.' }] },
          ],
          generationConfig: { maxOutputTokens: 250 },
          safetySettings: this.getSafetySettings(),
        });
        const result = await chat.sendMessage(message);
        return { reply: result.response.text() };
      } catch (fallbackError: any) {
        this.logger.error(`Fallback model also failed: ${fallbackError.message}`, fallbackError.stack);
        throw new InternalServerErrorException('Failed to get a response from the AI after fallback.');
      }
    }
  }

  private getSafetySettings() {
    return [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];
  }

  async listModels() {
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`;
    const res = await fetch(url);
    return res.json();
  }

}
