export const PERSONALITY_TYPES_SEED = [
  {
    id: 1,
    codigo: 'T1',
    titulo: 'El Impulso',
    esencia:
      'Eres fuego que camina. Donde otros dudan, tú atraviesas. No naciste para esperar señales: tú eres la señal.',
    enLuz: [
      'Acción inmediata, valentía, presencia.',
      'Cortas la indecisión y abres camino.',
      'Energía contagiosa: conviertes miedo en movimiento.',
    ],
    enSombra: [
      'Impulsividad, choque, “todo o nada”.',
      'Te cuesta pausar; confundes velocidad con poder.',
      'Puedes herir por prisa o orgullo.',
    ],
    parejaPerfecta: [
      'T2 El Vínculo: te enseña calma, ternura y hogar sin apagarte.',
      'T6 El Arquitecto: te aterriza y convierte tu impulso en victoria sostenida.',
    ],
    trabajoIdeal: {
      roles: [
        'ventas',
        'growth',
        'closings',
        'liderazgo en campo',
        'operaciones rápidas',
        'emprendimiento',
      ],
      ambiente: 'metas claras, ritmo alto, retos, competencia sana.',
      evita: 'burocracia lenta, reuniones eternas, supervisión micro.',
    },
    social: {
      descripcion: 'Tú “enciendes” el grupo: energía, planes, movimiento.',
      limiteSano: 'no cargues con gente que ama el drama y no cambia.',
    },
    dinero: {
      talento: 'generas dinero con audacia y ejecución.',
      riesgo: 'gasto impulsivo / apuestas por emoción.',
      reglaDeOro: 'Primero invierto, después disfruto.',
      ganaDinero: 'acción rápida, ventas, emprendimiento, riesgo',
      bloqueo: 'impulsividad, gastar antes de sostener',
      mejorAliado: '🧱 T6 (estructura) o 🜃 T3 (estrategia)',
      fraseDineroLuz: 'La acción con dirección multiplica.',
    },
    mantra: 'Pausa 10 segundos: que tu fuego sea dirección, no explosión.',
    energia: {
      descripcion: 'acción, fuego inicial, movimiento',
      color: 'Rojo escarlata',
      piedra: 'Jaspe rojo / Granate',
      fraseLuz: 'Actúo con valentía.',
      fraseSombra: 'Si no actúo ahora, no valgo.',
      habitoLuz: 'ejercicio físico, decisiones rápidas pero conscientes',
      habitoSombra: 'impulsividad, confrontación, exceso de riesgo',
      talentoHumano: 'iniciar, empujar, romper inercia',
      retoEvolutivo: 'pausar sin apagarse',
      necesitaAprender: 'autocontrol ≠ debilidad',
    },
    victimizacion: {
      frase: 'Me provocaron / no me dejaron otra opción',
      comoSeVe: [
        'Justifica explosiones emocionales',
        'Culpa al entorno por su reacción',
        'Se siente atacado incluso cuando no lo fue',
      ],
      heridaRaiz: 'Sentirse controlado',
      fraseSombra: 'Si no fuera por ellos, yo estaría bien',
      salidaALuz: 'Responsabilizarse de su reacción, no del estímulo',
    },
    // Mapped fields for backward compatibility
    name: 'El Impulso',
    description_preview:
      'Eres fuego que camina. Donde otros dudan, tú atraviesas. No naciste para esperar señales: tú eres la señal.',
    description_full:
      'Eres fuego que camina. Donde otros dudan, tú atraviesas. No naciste para esperar señales: tú eres la señal.',
  },
  {
    id: 2,
    codigo: 'T2',
    titulo: 'El Vínculo',
    esencia:
      'Eres corazón con radar. Sientes lo invisible, sostienes lo humano y conviertes a extraños en tribu.',
    enLuz: [
      'Empatía, lealtad, amor práctico.',
      'Creas confianza donde había tensión.',
      'Sanas con presencia, no con discursos.',
    ],
    enSombra: [
      'Apego, necesidad de aprobación.',
      'Te desgastas por salvar a todos.',
      'Te traicionas por no perder.',
    ],
    parejaPerfecta: [
      'T1 El Impulso: te da valentía, acción y protección.',
      'T3 El Estratega: te da claridad, estructura emocional y decisiones justas.',
    ],
    trabajoIdeal: {
      roles: [
        'customer success',
        'comunidad',
        'HR',
        'bienestar',
        'educación',
        'hospitalidad',
        'ventas consultivas',
      ],
      ambiente: 'cultura cálida, propósito humano, equipo unido.',
      evita: 'ambientes fríos, competitivos sin ética, jefes sin humanidad.',
    },
    social: {
      descripcion: 'Tú “sostienes” el grupo: escuchas, unes, cuidas.',
      limiteSano: 'no confundas amor con aguantar faltas de respeto.',
    },
    dinero: {
      talento: 'generas estabilidad por relaciones y confianza.',
      riesgo: 'dar de más / gastar por emoción o culpa.',
      reglaDeOro: 'Yo también soy parte de mis ‘tuyos’.',
      ganaDinero: 'relaciones, servicio, comunidad, atención humana',
      bloqueo: 'regalar su valor, miedo a cobrar',
      mejorAliado: '👑 T4 (valor propio) o 🜃 T3 (límites)',
      fraseDineroLuz: 'Cobrar también es cuidar.',
    },
    mantra: 'Amor con límites: lo real se sostiene, lo falso se cae.',
    energia: {
      descripcion: 'emoción, unión, empatía',
      color: 'Azul turquesa / Rosa suave',
      piedra: 'Cuarzo rosa / Aguamarina',
      fraseLuz: 'Conectar también me nutre.',
      fraseSombra: 'Sin ti, no soy.',
      habitoLuz: 'escucha activa, rituales de conexión',
      habitoSombra: 'dependencia emocional, complacencia',
      talentoHumano: 'cohesionar, cuidar, humanizar',
      retoEvolutivo: 'poner límites sin culpa',
      necesitaAprender: 'amar no es fusionarse',
    },
    victimizacion: {
      frase: 'Yo di todo y nadie me devuelve nada',
      comoSeVe: [
        'Amor con factura invisible',
        'Culpa emocional sutil',
        'Se sacrifica… y luego reclama',
      ],
      heridaRaiz: 'Miedo al abandono',
      fraseSombra: 'Después de todo lo que hice por ti…',
      salidaALuz: 'Dar sin perderse, pedir sin culpar',
    },
    // Mapped fields
    name: 'El Vínculo',
    description_preview:
      'Eres corazón con radar. Sientes lo invisible, sostienes lo humano y conviertes a extraños en tribu.',
    description_full:
      'Eres corazón con radar. Sientes lo invisible, sostienes lo humano y conviertes a extraños en tribu.',
  },
  {
    id: 3,
    codigo: 'T3',
    titulo: 'El Estratega',
    esencia:
      'Eres mente que corta la niebla. Ves patrones, anticipas jugadas y conviertes caos en mapa.',
    enLuz: [
      'Inteligencia fría + ética = precisión.',
      'Negocias con elegancia.',
      'Optimización: mejoras todo lo que tocas.',
    ],
    enSombra: [
      'Distancia emocional, cinismo.',
      'Parálisis por análisis.',
      'Control con información.',
    ],
    parejaPerfecta: [
      'T2 El Vínculo: te devuelve humanidad y suaviza la mente.',
      'T5 El Visionario: te enciende futuro y creatividad con dirección.',
    ],
    trabajoIdeal: {
      roles: [
        'estrategia',
        'data',
        'finanzas',
        'consultoría',
        'product',
        'negociación',
        'research',
      ],
      ambiente: 'métricas, autonomía, reto intelectual, claridad.',
      evita: 'improvisación, drama, decisiones sin datos.',
    },
    social: {
      descripcion:
        'Tú “lees” el grupo: entiendes dinámicas, intenciones, poder.',
      limiteSano: 'no te escondas detrás de la lógica para no sentir.',
    },
    dinero: {
      talento: 'inversión, optimización, sistemas, decisiones racionales.',
      riesgo: 'esperar el “momento perfecto” y perder oportunidades.',
      reglaDeOro: 'Datos suficientes, acción mínima.',
      ganaDinero: 'análisis, sistemas, optimización, datos',
      bloqueo: 'esperar el plan perfecto',
      mejorAliado: '🜂 T1 (ejecución) o 🌬 T5 (visión)',
      fraseDineroLuz: 'Decidir a tiempo vale más que saber todo.',
    },
    mantra: 'Tu mente es espada: úsala para abrir caminos, no para aislarte.',
    energia: {
      descripcion: 'análisis, cálculo, eficiencia',
      color: 'Verde oliva / Gris grafito',
      piedra: 'Fluorita / Ojo de tigre',
      fraseLuz: 'Comprender me da ventaja.',
      fraseSombra: 'Si no lo entiendo, no avanzo.',
      habitoLuz: 'planificación, aprendizaje continuo',
      habitoSombra: 'sobrepensar, parálisis por análisis',
      talentoHumano: 'optimizar sistemas, tomar decisiones racionales',
      retoEvolutivo: 'confiar sin controlar todo',
      necesitaAprender: 'no todo se resuelve con lógica',
    },
    victimizacion: {
      frase: 'Yo sabía que esto iba a salir mal',
      comoSeVe: [
        'Se coloca como el único lúcido',
        'Usa el error ajeno para reafirmarse',
        'Se distancia emocionalmente',
      ],
      heridaRaiz: 'Miedo a verse vulnerable',
      fraseSombra: 'Era obvio',
      salidaALuz: 'Usar la mente para construir, no para aislarse',
    },
    // Mapped fields
    name: 'El Estratega',
    description_preview:
      'Eres mente que corta la niebla. Ves patrones, anticipas jugadas y conviertes caos en mapa.',
    description_full:
      'Eres mente que corta la niebla. Ves patrones, anticipas jugadas y conviertes caos en mapa.',
  },
  {
    id: 4,
    codigo: 'T4',
    titulo: 'El Soberano',
    esencia:
      'Eres autoridad natural. No viniste a pedir permiso: viniste a construir orden y liderazgo.',
    enLuz: [
      'Dirección, fuerza, standards altos.',
      'Proteges tu reino (familia/equipo/visión).',
      'Tomas decisiones que otros evitan.',
    ],
    enSombra: [
      'Control, dureza, orgullo.',
      'Castigas en lugar de guiar.',
      'Confundes respeto con miedo.',
    ],
    parejaPerfecta: [
      'T6 El Arquitecto: estabilidad, estructura y lealtad sólida.',
      'T7 El Alquimista: profundidad y transformación (te humaniza sin quitarte poder).',
    ],
    trabajoIdeal: {
      roles: [
        'dirección',
        'operaciones grandes',
        'liderazgo comercial',
        'real estate',
        'management',
        'seguridad/estructura',
      ],
      ambiente: 'jerarquía clara, objetivos fuertes, autonomía para decidir.',
      evita: 'entornos donde nadie manda, caos, falta de respeto.',
    },
    social: {
      descripcion:
        'Tú “marcas” el ritmo del grupo: seguridad, reglas, dirección.',
      limiteSano: 'liderar no es aplastar; es elevar.',
    },
    dinero: {
      talento:
        'construir activos, escalar negocios, tomar control del cashflow.',
      riesgo: 'apuestas por ego / querer ganar siempre.',
      reglaDeOro: 'Poder sin paz es prisión.',
      ganaDinero: 'liderazgo, dirección, marca personal',
      bloqueo: 'control excesivo, soledad en decisiones',
      mejorAliado: '🌊 T2 (humanidad) o 🜄 T7 (sentido)',
      fraseDineroLuz: 'El poder crece cuando se comparte.',
    },
    mantra: 'Mi autoridad sirve a la verdad, no al orgullo.',
    energia: {
      descripcion: 'poder, liderazgo, autoridad interna',
      color: 'Dorado / Púrpura real',
      piedra: 'Citrino / Pirita',
      fraseLuz: 'Dirijo desde la conciencia.',
      fraseSombra: 'Si no mando, pierdo.',
      habitoLuz: 'liderazgo justo, responsabilidad',
      habitoSombra: 'control, rigidez, orgullo',
      talentoHumano: 'tomar decisiones finales, sostener estructuras',
      retoEvolutivo: 'liderar sin dominar',
      necesitaAprender: 'autoridad no es imposición',
    },
    victimizacion: {
      frase: 'Nadie está a mi nivel / nadie me sostiene',
      comoSeVe: [
        'Se siente solo en la cima',
        'Cree que siempre carga con todo',
        'Victimiza su grandeza',
      ],
      heridaRaiz: 'Soledad del poder',
      fraseSombra: 'Si yo no lo hago, nadie lo hace',
      salidaALuz: 'Delegar sin perder autoridad',
    },
    // Mapped fields
    name: 'El Soberano',
    description_preview:
      'Eres autoridad natural. No viniste a pedir permiso: viniste a construir orden y liderazgo.',
    description_full:
      'Eres autoridad natural. No viniste a pedir permiso: viniste a construir orden y liderazgo.',
  },
  {
    id: 5,
    codigo: 'T5',
    titulo: 'El Visionario',
    esencia:
      'Eres futuro encarnado. Donde otros ven una pared, tú ves una puerta… y la dibujas.',
    enLuz: [
      'Creatividad, innovación, inspiración.',
      'Conectas ideas con cultura y deseo.',
      'Haces que lo imposible se sienta cercano.',
    ],
    enSombra: [
      'Dispersión, prometer de más.',
      'Escapar cuando toca sostener.',
      'Vivir en la idea y olvidar el suelo.',
    ],
    parejaPerfecta: [
      'T3 El Estratega: convierte tu visión en plan ganador.',
      'T7 El Alquimista: amplifica tu profundidad y sentido creativo.',
    ],
    trabajoIdeal: {
      roles: [
        'branding',
        'marketing creativo',
        'contenido',
        'innovación',
        'diseño',
        'creación de productos',
        'storytelling',
      ],
      ambiente: 'libertad, experimentación, equipos que creen.',
      evita: 'rutina rígida, micromanagement, ambientes que apagan ideas.',
    },
    social: {
      descripcion: 'Tú “inspiras” el grupo: ideas, humor, chispa, perspectiva.',
      limiteSano: 'no confundas libertad con falta de estructura.',
    },
    dinero: {
      talento: 'múltiples fuentes, marca personal, creatividad monetizable.',
      riesgo: 'dispersarte y no cerrar ciclos.',
      reglaDeOro: 'Una visión. Un sistema. Un cierre.',
      ganaDinero: 'ideas, creatividad, innovación',
      bloqueo: 'no aterrizar, dispersión',
      mejorAliado: '🧱 T6 (estructura) o 🜃 T3 (foco)',
      fraseDineroLuz: 'Una idea encarnada vale oro.',
    },
    mantra: 'La visión se vuelve destino cuando la repito con disciplina.',
    energia: {
      descripcion: 'ideas, futuro, posibilidad',
      color: 'Índigo / Amarillo claro',
      piedra: 'Amatista / Labradorita',
      fraseLuz: 'Veo lo que aún no existe.',
      fraseSombra: 'La realidad me limita.',
      habitoLuz: 'crear, imaginar, escribir, explorar',
      habitoSombra: 'desconexión del presente, evasión',
      talentoHumano: 'innovar, inspirar, abrir caminos',
      retoEvolutivo: 'aterrizar ideas',
      necesitaAprender: 'el presente también es sagrado',
    },
    victimizacion: {
      frase: 'Este mundo no me entiende',
      comoSeVe: [
        'Se siente demasiado profundo',
        'Desconecta de lo práctico',
        'Usa la incomprensión como refugio',
      ],
      heridaRaiz: 'Sentirse fuera de lugar',
      fraseSombra: 'Esto es demasiado elevado para ellos',
      salidaALuz: 'Traducir visión en acción',
    },
    // Mapped fields
    name: 'El Visionario',
    description_preview:
      'Eres futuro encarnado. Donde otros ven una pared, tú ves una puerta… y la dibujas.',
    description_full:
      'Eres futuro encarnado. Donde otros ven una pared, tú ves una puerta… y la dibujas.',
  },
  {
    id: 6,
    codigo: 'T6',
    titulo: 'El Arquitecto',
    esencia:
      'Eres estructura sagrada. Construyes realidades con paciencia, precisión y estándares que no se rompen.',
    enLuz: [
      'Orden, disciplina, ejecución impecable.',
      'Conviertes ideas en sistemas.',
      'Confianza por consistencia: “si lo digo, lo hago”.',
    ],
    enSombra: [
      'Rigidez, perfeccionismo, crítica.',
      'Te cuesta delegar.',
      'El control se vuelve ansiedad.',
    ],
    parejaPerfecta: [
      'T1 El Impulso: te da chispa y valentía para moverte más rápido.',
      'T4 El Soberano: te da dirección, protección y ambición grande.',
    ],
    trabajoIdeal: {
      roles: [
        'ingeniería',
        'operaciones',
        'project management',
        'calidad',
        'sistemas',
        'supply chain',
        'producto',
      ],
      ambiente: 'procesos claros, estabilidad, foco, mejora continua.',
      evita: 'caos constante, “todo urgente”, decisiones improvisadas.',
    },
    social: {
      descripcion:
        'Tú “organizas” el grupo: logística, soluciones, estructura.',
      limiteSano: 'tu valor no depende de hacerlo todo perfecto.',
    },
    dinero: {
      talento:
        'ahorro inteligente, patrimonio, consistencia, inversión estable.',
      riesgo: 'miedo a mover capital / perder oportunidades por cautela.',
      reglaDeOro: 'Seguridad también es crecer.',
      ganaDinero: 'procesos, operaciones, constancia',
      bloqueo: 'rigidez, miedo al cambio',
      mejorAliado: '🌬 T5 (innovación) o 🜂 T1 (movimiento)',
      fraseDineroLuz: 'La constancia crea seguridad.',
    },
    mantra: 'Hoy suelto el 10% de control para ganar paz.',
    energia: {
      descripcion: 'orden, estructura, construcción',
      color: 'Marrón / Azul acero',
      piedra: 'Hematita / Ónix',
      fraseLuz: 'Construyo lo que perdura.',
      fraseSombra: 'Si se rompe, fallo.',
      habitoLuz: 'constancia, disciplina flexible',
      habitoSombra: 'rigidez, miedo al cambio',
      talentoHumano: 'materializar, sostener procesos',
      retoEvolutivo: 'adaptarse sin colapsar',
      necesitaAprender: 'lo vivo cambia',
    },
    victimizacion: {
      frase: 'Todo depende de mí',
      comoSeVe: [
        'Carga responsabilidades ajenas',
        'Se vuelve rígido y silencioso',
        'Resiente sin expresar',
      ],
      heridaRaiz: 'Miedo al caos',
      fraseSombra: 'Si yo no lo controlo, se cae todo',
      salidaALuz: 'Confiar sin colapsar',
    },
    // Mapped fields
    name: 'El Arquitecto',
    description_preview:
      'Eres estructura sagrada. Construyes realidades con paciencia, precisión y estándares que no se rompen.',
    description_full:
      'Eres estructura sagrada. Construyes realidades con paciencia, precisión y estándares que no se rompen.',
  },
  {
    id: 7,
    codigo: 'T7',
    titulo: 'El Alquimista',
    esencia:
      'Eres misterio con propósito. Tomas dolor y lo vuelves arte. Tomas caos y lo vuelves significado.',
    enLuz: [
      'Intuición poderosa, profundidad, magnetismo.',
      'Transformas personas y ambientes.',
      'Ves lo que nadie dice… y lo curas.',
    ],
    enSombra: [
      'Silencio como castigo, desconfianza.',
      'Obsesión, intensidad que asusta.',
      'Aislarte por proteger tu mundo.',
    ],
    parejaPerfecta: [
      'T5 El Visionario: crea contigo mundos y comprende tu profundidad.',
      'T4 El Soberano: te da estructura y protección, tú le das alma.',
    ],
    trabajoIdeal: {
      roles: [
        'psicología/coaching',
        'investigación profunda',
        'arte conceptual',
        'cultura',
        'transformación',
        'estrategia humana',
        'terapia/bienestar',
      ],
      ambiente: 'propósito real, libertad emocional, espacio para profundidad.',
      evita: 'superficialidad, mentiras, ambientes sin sentido.',
    },
    social: {
      descripcion: 'Tú “profundizas” el grupo: pocos, pero verdaderos.',
      limiteSano: 'no te encierres: la luz también necesita testigos.',
    },
    dinero: {
      talento: 'intuición para oportunidades + creación con significado.',
      riesgo: 'decisiones sin marco (pura intuición) o secretos financieros.',
      reglaDeOro: 'Intuición con reglas: magia con estructura.',
      ganaDinero: 'transformación, mentoría, consciencia',
      bloqueo: 'desconexión material',
      mejorAliado: '👑 T4 (dirección) o 🧱 T6 (aterrizaje)',
      fraseDineroLuz: 'La sabiduría también se cobra.',
    },
    mantra: 'Mi poder es verdad. Mi verdad es calma.',
    energia: {
      descripcion: 'transformación, consciencia, integración',
      color: 'Blanco perlado / Violeta profundo',
      piedra: 'Cuarzo transparente / Moldavita',
      fraseLuz: 'Todo puede transformarse.',
      fraseSombra: 'Nada tiene sentido.',
      habitoLuz: 'introspección, meditación, síntesis',
      habitoSombra: 'desconexión, nihilismo, aislamiento',
      talentoHumano: 'integrar luz y sombra, sanar',
      retoEvolutivo: 'volver al mundo',
      necesitaAprender: 'encarnar la sabiduría',
    },
    victimizacion: {
      frase: 'Yo siento más que los demás',
      comoSeVe: [
        'Dramatiza el dolor',
        'Se identifica con la herida',
        'Confunde intensidad con verdad',
      ],
      heridaRaiz: 'Miedo a perder su identidad emocional',
      fraseSombra: 'Nadie siente como yo',
      salidaALuz: 'Transformar dolor en conciencia, no en personaje',
    },
    // Mapped fields
    name: 'El Alquimista',
    description_preview:
      'Eres misterio con propósito. Tomas dolor y lo vuelves arte. Tomas caos y lo vuelves significado.',
    description_full:
      'Eres misterio con propósito. Tomas dolor y lo vuelves arte. Tomas caos y lo vuelves significado.',
  },
];
