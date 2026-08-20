// Server component — no interactivity needed
import { Terminal } from "@/components/ui/terminal";

interface Prompt {
  number: number
  title: string
  text: string
  pause: string
}

const askPrompts: Prompt[] = [
  {
    number: 1,
    title: "Visión General del Programa",
    text: `¿Puedes darme un resumen de este programa PAYCALC.rpgle?
Explícame:
1. ¿Cuál es el propósito general del programa?
2. ¿Qué archivos de base de datos utiliza?
3. ¿Cuáles son las principales secciones o subrutinas?
Responde en español, de forma clara y estructurada.`,
    pause: "¿Alguien tiene preguntas sobre la estructura que Bob describió?",
  },
  {
    number: 2,
    title: "Explicación de las Especificaciones F y D",
    text: `Ahora enfócate en las especificaciones F (File) y D (Definition) al inicio del programa.
Explica:
- ¿Qué archivos se declaran y cómo se usan (entrada/salida/actualización)?
- ¿Qué variables y estructuras de datos se definen en las especificaciones D?
- ¿Hay alguna convención de nomenclatura interesante en este código?`,
    pause: "¿Ven alguna diferencia entre cómo ustedes nombran variables y cómo está hecho aquí?",
  },
  {
    number: 3,
    title: "Explicación de la Lógica de Nómina",
    text: `Explícame la lógica de cálculo de nómina en detalle:
1. ¿Cómo se calcula el salario base?
2. ¿Cómo se calcula el tiempo extra (overtime)?
3. ¿Cómo se calculan las deducciones de IMSS e ISR?
4. ¿Hay casos especiales o condiciones de borde que maneja el código?
Incluye referencias a líneas o subrutinas específicas.`,
    pause:
      "¿Cuántos de ustedes tienen programas similares en producción que no tienen esta documentación?",
  },
]

interface FlowStep {
  step: number
  mode: string
  modeColor: string
  label: string
  prompt: string
  facilitatorNote: string
}

const planAgentFlow: FlowStep[] = [
  {
    step: 1,
    mode: "Plan",
    modeColor: "text-violet-400 border-violet-500/50 bg-violet-500/10",
    label: "Diseño — Modo Plan",
    prompt: `Quiero agregar una mejora a PAYCALC.rpgle.
Actualmente el programa calcula el salario base pero no tiene un
procedimiento separado para el tiempo extra.

Por favor diseña un plan para:
1. Crear un nuevo procedimiento ILE free-form llamado CALC_OVERTIME
2. El procedimiento debe aceptar las horas trabajadas y la tarifa por hora
3. Debe retornar el pago de tiempo extra (horas > 40 al 1.5x)
4. Debe integrarse con la lógica existente de PAYCALC

Muéstrame el plan de cambios antes de hacer cualquier modificación.`,
    facilitatorNote:
      'Revisar el plan con los asistentes. Preguntar: "¿Están de acuerdo con este diseño? ¿Cambiarían algo?"',
  },
  {
    step: 2,
    mode: "Agent",
    modeColor: "text-amber-400 border-amber-500/50 bg-amber-500/10",
    label: "Implementación — Modo Agent",
    prompt: `Ejecuta el plan que acabas de diseñar. Implementa el procedimiento
CALC_OVERTIME en PAYCALC.rpgle usando ILE RPG free-form (dcl-proc).
Asegúrate de:
- Mantener compatibilidad con el código fixed-form existente
- Agregar comentarios en español explicando cada paso
- Llamar al nuevo procedimiento desde el ciclo principal`,
    facilitatorNote: "Cambiar al Modo Agent antes de escribir este prompt. Mostrar cómo Bob edita el archivo directamente.",
  },
]

export default function DemoScripts() {
  return (
    <section id="demos" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">Demo Scripts</h2>
          <p className="text-[--muted-foreground] max-w-2xl mx-auto">
            Los siguientes scripts son exactamente lo que el facilitador escribe en Bob durante los
            bloques de demo. Están diseñados para ser legibles en pantalla proyectada y provocar
            respuestas ilustrativas de Bob.
          </p>
        </div>

        {/* ── Block 4: Ask mode prompts ── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              Bloque 4
            </span>
            <h3 className="text-lg font-semibold text-[--foreground]">
              Bob Explica PAYCALC.rpgle — Modo Ask
            </h3>
          </div>

          <p className="text-sm text-[--muted-foreground] mb-6 italic">
            Contexto del facilitador: Abre PAYCALC.rpgle en el IDE. Asegúrate de que el archivo
            esté en la vista activa antes de escribir cada prompt.
          </p>

          <div className="space-y-6">
            {askPrompts.map((p) => (
              <div key={p.number} className="rounded-xl border border-cyan-500/30 bg-[--card] overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-cyan-500/20 bg-[#0f172a]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs font-mono text-[--muted-foreground]">
                    Prompt {p.number} — {p.title}
                  </span>
                </div>
                {/* Prompt text */}
                <pre className="px-4 py-4 font-mono text-sm text-cyan-300 leading-relaxed whitespace-pre-wrap break-words">
                  {p.text}
                </pre>
                {/* Pause note */}
                <div className="px-4 py-3 border-t border-[--border] bg-[--muted]/30">
                  <p className="text-xs text-[--muted-foreground]">
                    <span className="font-semibold text-[--foreground]">⏸ Pausa: </span>
                    {p.pause}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Block 5: Plan → Agent flow ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full border border-violet-500/50 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
              Bloque 5
            </span>
            <h3 className="text-lg font-semibold text-[--foreground]">
              Bob Planifica + Genera Lógica RPG — Modo Plan → Modo Agent
            </h3>
          </div>

          <p className="text-sm text-[--muted-foreground] mb-6 italic">
            Este bloque tiene dos partes. Primero Modo Plan para diseñar, luego Modo Agent para
            implementar.
          </p>

          <div className="space-y-4">
            {planAgentFlow.map((step) => (
              <div key={step.step} className="flex gap-4">
                {/* Step number */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[--muted] border border-[--border] flex items-center justify-center text-sm font-bold text-[--foreground] shrink-0">
                    {step.step}
                  </div>
                  {step.step < planAgentFlow.length && (
                    <div className="w-px flex-1 bg-[--border] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${step.modeColor}`}
                    >
                      {step.mode}
                    </span>
                    <span className="text-sm font-semibold text-[--foreground]">{step.label}</span>
                  </div>

                  {/* Prompt block */}
                  <div className="rounded-xl border border-[--border] bg-[--card] overflow-hidden mb-3">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-[--border] bg-[#0f172a]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-xs font-mono text-[--muted-foreground]">
                        prompt · {step.mode.toLowerCase()} mode
                      </span>
                    </div>
                    <pre className="px-4 py-4 font-mono text-sm text-cyan-300 leading-relaxed whitespace-pre-wrap break-words">
                      {step.prompt}
                    </pre>
                  </div>

                  {/* Facilitator note */}
                  <p className="text-xs text-[--muted-foreground] italic">
                    <span className="font-semibold not-italic text-[--foreground]">
                      🎙 Facilitador:{" "}
                    </span>
                    {step.facilitatorNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
