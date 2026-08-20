"use client"

import { BackgroundBeams } from "@/components/aceternity/background-beams"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Lanzar un Piloto Técnico",
    subtitle: "Piloto Técnico en 30 Días",
    description:
      "Selecciona un programa RPG de baja criticidad operacional y aplica el flujo completo del taller: documentación automática con Ask mode, diseño de mejoras con Plan mode e implementación asistida con Agent mode. Mide el tiempo invertido versus el mismo proceso sin IA. Usa los resultados como caso de negocio interno para una adopción más amplia.",
    kpi: "Reducción en horas de análisis y documentación por programa",
    kpiColor: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10",
    number: "01",
  },
  {
    title: "Construir la Biblioteca de Convenciones IBM i",
    subtitle: "Biblioteca de Convenciones del Equipo",
    description:
      "Expande el archivo .bob/rules/ibmi-conventions.md creado en el taller para cubrir todos los sistemas y proyectos del área. Involucra a los desarrolladores senior para capturar el conocimiento tácito que hoy vive solo en su memoria. Esta biblioteca se convierte en el estándar vivo del equipo y garantiza consistencia en el código generado por Bob.",
    kpi: "Número de convenciones documentadas y proyectos que la adoptan",
    kpiColor: "text-violet-400 border-violet-500/40 bg-violet-500/10",
    number: "02",
  },
  {
    title: "Iniciar la Modernización Incremental",
    subtitle: "Programa de Modernización Incremental",
    description:
      "Diseña un programa para convertir gradualmente subrutinas y programas críticos de RPG III a ILE RPG free-form, usando IBM Bob como acelerador. Define un criterio de priorización (por criticidad, por frecuencia de cambio, por deuda técnica) y establece un ritmo sostenible. La modernización incremental es menos riesgosa que una reescritura total y entrega valor visible desde el primer sprint.",
    kpi: "Porcentaje del código base migrado a ILE free-form trimestre a trimestre",
    kpiColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
    number: "03",
  },
]

export default function BusinessValue() {
  return (
    <section id="value" className="relative overflow-hidden py-24 px-6">
      <BackgroundBeams />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">Business Value</h2>
          <p className="text-[--muted-foreground] max-w-2xl mx-auto text-sm leading-relaxed">
            IBM i es la columna vertebral de las operaciones críticas de negocio en miles de
            empresas de manufactura, distribución, banca y retail en México y Latinoamérica. Sin
            embargo, el conocimiento del código RPG heredado está concentrado en pocos expertos
            cuya experiencia no ha sido capturada ni documentada. IBM Bob cambia esta ecuación:
            permite que los desarrolladores existentes trabajen de{" "}
            <span className="text-[--foreground] font-semibold">3 a 5 veces más rápido</span>,
            acelera el onboarding de talento nuevo, y hace posible la modernización incremental —
            sin necesidad de una reescritura total que tome años y ponga en riesgo la operación.
            El resultado es una organización que puede evolucionar su plataforma IBM i al ritmo
            que el negocio demanda, con menor riesgo y mayor confianza.
          </p>
        </div>

        {/* Next step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.number}
              className="border-[--border] bg-[--card]/80 backdrop-blur-sm flex flex-col"
            >
              <CardHeader className="pb-3">
                <p className="text-xs font-mono text-[--muted-foreground] mb-1">{card.number}</p>
                <CardTitle className="text-base font-semibold text-[--foreground] leading-snug">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <p className="text-sm text-[--muted-foreground] leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-auto">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-tight ${card.kpiColor}`}
                  >
                    📊 {card.kpi}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
