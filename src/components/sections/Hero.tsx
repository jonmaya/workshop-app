"use client"

import { Spotlight } from "@/components/aceternity/spotlight"
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const titleWords = [
  { text: "IBM i RPG", className: "text-white" },
  { text: "Workshop", className: "text-white" },
  { text: "—", className: "text-[--muted-foreground]" },
  { text: "Modernización", className: "text-[--primary]" },
  { text: "con", className: "text-white" },
  { text: "IBM", className: "text-[--primary]" },
  { text: "Bob", className: "text-[--primary]" },
]

export default function Hero() {
  function handleVerAgenda() {
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Spotlight background */}
      <Spotlight
        className="inset-0 z-0"
        fill="rgba(6,182,212,0.5)"
      />

      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 gap-6">
        {/* Date/location badge */}
        <Badge
          variant="outline"
          className="text-[--primary] border-[--primary] bg-[--primary]/10 px-4 py-1 text-sm font-mono tracking-wide"
        >
          Taller Práctico · 4 horas · IBM i 7.5
        </Badge>

        {/* Main heading — TypewriterEffect */}
        <TypewriterEffect
          words={titleWords}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight justify-center"
        />

        {/* Subtitle */}
        <p className="text-lg text-[--muted-foreground] max-w-2xl leading-relaxed">
          Transforma tu experiencia con RPG: desde código legado hasta ILE
          moderno, con la asistencia de un agente de IA que entiende IBM i.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <Button size="lg" onClick={handleVerAgenda}>
            Ver Agenda
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/PAYCALC.rpgle" download>
              Descargar Material
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-[#020817] to-transparent" />
    </section>
  )
}
