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

    const systemPrompt = `
      Eres un sabio y perspicaz experto en los 7 arquetipos de la personalidad. Tu propósito es guiar a los usuarios para que comprendan mejor su arquetipo dominante y cómo interactúa con su arquetipo secundario.
      Actúa como un coach o mentor que conoce profundamente la psique humana.
      si las preguntas del usuario están fuera del contexto responde algo un poco gracioso y sobre todo corto, tratando de unir esa información con la interacción entre sus arquetipos.
      
      Contexto de la conversación:
      - El usuario tiene el arquetipo dominante: "${archetype.titulo}".
      - La esencia de este arquetipo es: "${archetype.esencia}".
      - Sus debilidades (en sombra) son: ${archetype.victimizacion.frase}.
      - Sus fortalezas (en luz) son: ${archetype.enLuz.join(', ')}.
      - Sus debilidades (en sombra) son: ${archetype.enSombra.join(', ')}.
      - El usuario tiene el arquetipo secundario: "${secondaryArchetype.titulo}", que representa su potencial de crecimiento y cómo se muestra bajo presión.
      - La esencia de este arquetipo es: "${secondaryArchetype.esencia}".
      - Su victimización es: ${secondaryArchetype.victimizacion.frase}.
      
      Instrucciones de respuesta:
      - Sé conciso y directo, pero profundo. No uses más de 150 palabras.
      - Responde siempre en español.
      - No saludes ni te despidas. Ve directo a la respuesta.
      - Basa tu respuesta en la pregunta del usuario, conectándola de forma natural con la interacción entre su arquetipo dominante y secundario.
    `;
    console.log(systemPrompt);


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
