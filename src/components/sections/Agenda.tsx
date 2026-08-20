import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Category = "Setup" | "Facilitator Demo" | "Break" | "Hands-On" | "Close"

interface AgendaBlock {
  id: number
  time: string
  name: string
  category: Category
  output: string
}

const blocks: AgendaBlock[] = [
  {
    id: 1,
    time: "00:00 – 00:10",
    name: "Bienvenida y Contexto",
    category: "Setup",
    output: "Lista de verificación del facilitador; presentación del objetivo del taller",
  },
  {
    id: 2,
    time: "00:10 – 00:40",
    name: "Instalación: IBMid + IBM Bob",
    category: "Setup",
    output: "Todos los asistentes con IBM Bob instalado y funcionando",
  },
  {
    id: 3,
    time: "00:40 – 01:00",
    name: "Orientación de Bob y Tour de Modos",
    category: "Setup",
    output: "Modelo mental de los tres modos: Ask, Plan, Agent",
  },
  {
    id: 4,
    time: "01:00 – 01:30",
    name: "Demo del Facilitador: Bob Explica Código RPG",
    category: "Facilitator Demo",
    output: "Bob explica PAYCALC.rpgle línea a línea en español",
  },
  {
    id: 5,
    time: "01:30 – 02:00",
    name: "Demo del Facilitador: Bob Planifica + Genera Lógica RPG",
    category: "Facilitator Demo",
    output: "Plan generado + nueva subrutina de tiempo extra creada por Bob",
  },
  {
    id: 6,
    time: "02:00 – 02:10",
    name: "Descanso",
    category: "Break",
    output: "—",
  },
  {
    id: 7,
    time: "02:10 – 02:40",
    name: "Ejercicio: Explorar Código RPG en Modo Ask",
    category: "Hands-On",
    output: "Asistentes explorando PAYCALC.rpgle con prompts propios",
  },
  {
    id: 8,
    time: "02:40 – 03:10",
    name: "Ejercicio: Modificar Código RPG en Modo Agent",
    category: "Hands-On",
    output: "Nueva lógica de tiempo extra integrada al programa",
  },
  {
    id: 9,
    time: "03:10 – 03:40",
    name: "Instrucciones Personalizadas IBM i 7.5",
    category: "Hands-On",
    output: "Archivo .bob/rules/ibmi-conventions.md creado en vivo",
  },
  {
    id: 10,
    time: "03:40 – 04:00",
    name: "Cierre: Resumen + Valor de Negocio + Q&A",
    category: "Close",
    output: "Próximos pasos identificados; preguntas respondidas",
  },
]

const categoryStyles: Record<Category, { badge: string; glow: string }> = {
  Setup: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    glow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]",
  },
  "Facilitator Demo": {
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    glow: "group-hover:border-violet-500/50 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.15)]",
  },
  Break: {
    badge: "bg-[--muted]/60 text-[--muted-foreground] border-[--border]",
    glow: "",
  },
  "Hands-On": {
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    glow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.15)]",
  },
  Close: {
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    glow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.15)]",
  },
}

export default function Agenda() {
  return (
    <section id="agenda" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Agenda
          </h2>
          <p className="text-[--muted-foreground] text-lg max-w-2xl mx-auto">
            El taller está dividido en <strong className="text-white">9 bloques</strong> que
            cubren instalación, demos guiadas y ejercicios prácticos. Cada bloque
            incluye un objetivo claro y un resultado esperado.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical glowing line */}
          <div
            className="absolute left-[7.5rem] top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(6,182,212,0.5) 10%, rgba(6,182,212,0.5) 90%, transparent)",
              boxShadow: "0 0 8px rgba(6,182,212,0.3)",
            }}
          />

          <div className="flex flex-col gap-4">
            {blocks.map((block) => {
              const isBreak = block.category === "Break"
              const styles = categoryStyles[block.category]

              return (
                <div
                  key={block.id}
                  className={cn(
                    "group flex flex-col sm:flex-row gap-4 sm:gap-6",
                    isBreak && "opacity-50"
                  )}
                >
                  {/* Time column */}
                  <div className="sm:w-28 shrink-0 flex sm:flex-col sm:items-end pt-3">
                    <span className="font-mono text-xs text-[--primary] leading-snug whitespace-nowrap">
                      {block.time}
                    </span>
                  </div>

                  {/* Dot on the line */}
                  <div className="hidden sm:flex items-start justify-center w-4 shrink-0 pt-3">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2 mt-0.5 transition-colors duration-300",
                        isBreak
                          ? "border-[--border] bg-[--muted]"
                          : "border-[--primary] bg-[#020817] group-hover:bg-[--primary]"
                      )}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "flex-1 rounded-lg border border-[--border] bg-[--card] px-5 py-4",
                      "transition-all duration-300",
                      !isBreak && styles.glow
                    )}
                  >
                    <div className="flex flex-wrap items-start gap-2 mb-1">
                      <Badge
                        className={cn(
                          "text-xs border font-semibold px-2 py-0.5",
                          styles.badge
                        )}
                      >
                        {block.category}
                      </Badge>
                    </div>
                    <p
                      className={cn(
                        "font-semibold text-sm sm:text-base",
                        isBreak ? "text-[--muted-foreground]" : "text-white"
                      )}
                    >
                      {block.name}
                    </p>
                    {block.output !== "—" && (
                      <p className="text-xs text-[--muted-foreground] mt-1 leading-relaxed">
                        {block.output}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
