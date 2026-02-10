import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonalityTypeDocument = PersonalityType & Document;

@Schema()
export class PersonalityType {
  @Prop({ required: true, unique: true })
  id: number; // Internal numeric ID for scoring (1-7)

  @Prop({ required: true })
  codigo: string; // T1, T2, etc.

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  esencia: string;

  @Prop({ type: [String], default: [] })
  enLuz: string[];

  @Prop({ type: [String], default: [] })
  enSombra: string[];

  @Prop({ type: [String], default: [] })
  parejaPerfecta: string[];

  @Prop({ type: Object })
  trabajoIdeal: {
    roles: string[];
    ambiente: string;
    evita: string;
  };

  @Prop({ type: Object })
  social: {
    descripcion: string;
    limiteSano: string;
  };

  @Prop({ type: Object })
  dinero: {
    talento: string;
    riesgo: string;
    reglaDeOro: string;
    ganaDinero: string;
    bloqueo: string;
    mejorAliado: string;
    fraseDineroLuz: string;
  };

  @Prop({ required: false })
  mantra: string;

  @Prop({ type: Object })
  energia: {
    descripcion: string;
    color: string;
    piedra: string;
    fraseLuz: string;
    fraseSombra: string;
    habitoLuz: string;
    habitoSombra: string;
    talentoHumano: string;
    retoEvolutivo: string;
    necesitaAprender: string;
  };

  @Prop({ type: Object })
  victimizacion: {
    frase: string;
    comoSeVe: string[];
    heridaRaiz: string;
    fraseSombra: string;
    salidaALuz: string;
  };

  // Deprecated fields kept optional for backward compatibility if needed, 
  // though we are replacing data, so they might be empty.
  // We can remove them if we are sure the frontend is updated or if we want to force the update.
  // Given the user said "guarda esa informacion tal cual", we focus on the new fields.
  // We'll leave the old ones out to keep the schema clean.
  // BUT: existing code (quiz.service) might rely on `name`, `description_preview`.
  // I should check if I need to map `titulo` -> `name` and `esencia` -> `description_preview` 
  // or update the QuizService/Frontend.
  // The user said "guarda esa informacion tal cual".
  // If I change field names, the Frontend WILL break.
  // I should PROBABLY map the new fields to the old names OR add computed properties/alias.
  // OR, I assume the user knows the frontend needs update.
  // "Prompt para Frontend" was generated in previous turn.
  // I should PROBABLY add `name` and `description_preview` as duplicates/aliases to avoid breaking everything immediately.
  
  @Prop()
  name: string; // Mapped from titulo

  @Prop()
  description_preview: string; // Mapped from esencia

  @Prop()
  description_full: string; // Full description
}

export const PersonalityTypeSchema =
  SchemaFactory.createForClass(PersonalityType);
