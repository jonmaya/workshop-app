import { MessageCircle, LayoutList, Zap } from "lucide-react"

interface Mode {
  icon: React.ReactNode
  name: string
  subtitle: string
  description: string
  useCases: string[]
  whenToUse: string
  accentClass: string
  borderClass: string
}

const modes: Mode[] = [
  {
    icon: <MessageCircle size={32} />,
    name: "Ask",
    subtitle: "Consulta e Investigación",
    description:
      "El Modo Ask es tu experto siempre disponible. Úsalo para hacer preguntas sobre código existente, entender conceptos de IBM i, obtener explicaciones línea a línea de programas RPG, o investigar mejores prácticas. Bob responde con texto estructurado pero no modifica ningún archivo.",
    useCases: [
      "¿Qué hace este programa PAYCALC.rpgle?",
      "Explícame el significado de las especificaciones F en RPG III.",
      "¿Cuáles son las diferencias entre RPG III y ILE RPG free-form?",
      "¿Cómo funciona la instrucción CHAIN en este contexto?",
      "Explica la lógica de cálculo del IMSS en este código.",
    ],
    whenToUse:
      "Cuando quieres entender algo sin riesgo de modificar el código. Ideal para onboarding, revisiones y documentación.",
    accentClass: "text-cyan-400",
    borderClass:
      "border-[--border] hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  {
    icon: <LayoutList size={32} />,
    name: "Plan",
    subtitle: "Diseño y Arquitectura",
    description:
      "El Modo Plan convierte a Bob en un arquitecto de software. Le describes lo que quieres lograr y Bob genera un plan detallado: pasos, archivos afectados, riesgos potenciales y decisiones de diseño. No genera código automáticamente — primero te muestra el plan para tu revisión y aprobación.",
    useCases: [
      "Quiero agregar cálculo de tiempo extra a PAYCALC.rpgle. ¿Cómo lo harías?",
      "Diseña una estrategia para convertir subrutinas RPG III a ILE free-form.",
      "Planifica la separación de lógica de negocio de acceso a datos.",
      "¿Cuál sería el impacto de agregar un parámetro al procedimiento CALC_SAL?",
    ],
    whenToUse:
      "Antes de hacer cambios grandes o irreversibles. Úsalo para revisar el plan con tu equipo antes de ejecutar.",
    accentClass: "text-violet-400",
    borderClass:
      "border-[--border] hover:border-violet-500/60 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]",
  },
  {
    icon: <Zap size={32} />,
    name: "Agent",
    subtitle: "Implementación Autónoma",
    description:
      "El Modo Agent es el implementador. Bob no solo describe qué hacer — lo hace. Crea archivos, edita código, ejecuta comandos y valida los cambios de forma autónoma. Es el modo más potente y debe usarse cuando tienes un objetivo claro y confianza en el resultado esperado.",
    useCases: [
      "Agrega la subrutina CALC_OVT para calcular tiempo extra al 1.5x después de 40 horas.",
      "Convierte la subrutina CALC_ISR de RPG III a ILE RPG free-form con dcl-proc.",
      "Agrega un encabezado de comentarios estándar al inicio de PAYCALC.rpgle.",
      "Crea el archivo .bob/rules/ibmi-conventions.md con las convenciones del proyecto.",
    ],
    whenToUse:
      "Cuando ya tienes el plan aprobado y quieres ejecutarlo. También para tareas repetitivas bien definidas.",
    accentClass: "text-amber-400",
    borderClass:
      "border-[--border] hover:border-amber-500/60 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
]

export default function BobModes() {
  return (
    <section id="modes" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">Bob Modes</h2>
          <p className="text-[--muted-foreground] max-w-2xl mx-auto">
            IBM Bob opera en tres modos distintos. Piénsalo como tres perfiles de colaboración: el
            experto que responde preguntas, el arquitecto que diseña soluciones y el programador que
            implementa código.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className={`rounded-xl border bg-[--card] p-6 flex flex-col gap-4 transition-all duration-300 ${mode.borderClass}`}
            >
              {/* Icon + name */}
              <div className={`${mode.accentClass}`}>{mode.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-[--foreground]">{mode.name}</h3>
                <p className="text-xs font-medium text-[--muted-foreground]">{mode.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-[--muted-foreground] leading-relaxed flex-1">
                {mode.description}
              </p>

              {/* Use cases */}
              <div>
                <p className="text-xs font-semibold text-[--foreground] uppercase tracking-wide mb-2">
                  Casos de uso
                </p>
                <ul className="space-y-1.5">
                  {mode.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[--muted-foreground]">
                      <span className={`mt-0.5 shrink-0 ${mode.accentClass}`}>›</span>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* When to use */}
              <div className="rounded-md bg-[--muted]/40 border border-[--border] px-3 py-2">
                <p className="text-xs text-[--muted-foreground] leading-relaxed">
                  <span className="font-semibold text-[--foreground]">Cuándo usarlo: </span>
                  {mode.whenToUse}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
