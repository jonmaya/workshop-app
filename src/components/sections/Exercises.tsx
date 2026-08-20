// Server component
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExerciseStep {
  number: number
  text: string
}

interface Exercise {
  number: number
  title: string
  goal: string
  timeEstimate: string
  steps: ExerciseStep[]
  snippet: string
  snippetLabel: string
  reflection: string
}

const exercises: Exercise[] = [
  {
    number: 1,
    title: "Exploración con Ask Mode",
    goal:
      "Usar el Modo Ask de Bob para entender la estructura y lógica de PAYCALC.rpgle sin modificar ningún archivo. Al finalizar este ejercicio, podrás describir el programa con tus propias palabras y habrás formulado al menos 3 preguntas propias sobre el código.",
    timeEstimate: "30 minutos",
    steps: [
      {
        number: 1,
        text: 'Descarga PAYCALC.rpgle usando el botón de abajo y ábrelo en IBM Bob.',
      },
      {
        number: 2,
        text: "Asegúrate de estar en Modo Ask (ícono de burbuja en la barra lateral).",
      },
      {
        number: 3,
        text: "Escribe el prompt inicial:\n«Analiza este programa PAYCALC.rpgle: ¿Cuál es el flujo principal? ¿Qué registros de EMPPF utiliza? ¿Cómo distingue empleados de tiempo completo y por horas?»",
      },
      {
        number: 4,
        text: "Lee la respuesta de Bob y formula una pregunta de seguimiento propia basada en lo que no entendiste.",
      },
      {
        number: 5,
        text: "Prueba el prompt adicional:\n«¿Puedes mostrarme solamente la sección que calcula el ISR y explicar la lógica de los tramos fiscales paso a paso?»",
      },
      {
        number: 6,
        text: "Pídele a Bob que genere documentación: un encabezado de comentarios en español con propósito, archivos utilizados, autor (TALLER DEMO), fecha y descripción de parámetros principales.",
      },
      {
        number: 7,
        text: "Copia la documentación generada y compártela con el compañero de al lado.",
      },
    ],
    snippet: `     FEMPPF     IF   E           K DISK
     FTIMEPF    IF   E           K DISK
     FPAYRPRT   O    F  132        PRINTER OFLIND(*IN90)`,
    snippetLabel:
      "Especificaciones F — declara los dos archivos de entrada (EMPPF y TIMEPF) y el archivo de impresión.",
    reflection:
      "Comparte con el grupo: ¿Qué fue lo más sorprendente que Bob te explicó? ¿Hay alguna parte del código que todavía no está clara?",
  },
  {
    number: 2,
    title: "Modificación con Agent Mode",
    goal:
      "Usar el Modo Agent de Bob para agregar el cálculo de tiempo extra a PAYCALC.rpgle. Bob generará el código nuevo y lo integrará en el programa existente. Al finalizar, el programa calculará el pago de tiempo extra (horas trabajadas > 40, al 1.5x la tarifa normal).",
    timeEstimate: "30 minutos",
    steps: [
      {
        number: 1,
        text: "Abre PAYCALC.rpgle en IBM Bob.",
      },
      {
        number: 2,
        text: "Cambia a Modo Agent (ícono de rayo en la barra lateral).",
      },
      {
        number: 3,
        text: "Escribe el prompt: «Agrega el cálculo de tiempo extra a PAYCALC.rpgle. Crea un procedimiento free-form CALC_OVERTIME con parámetros horasTrabajadas (packed 5,2) y tarifaHora (packed 7,2). Si horas > 40, pagar extras al 1.5x. Usa dcl-proc/dcl-pi/dcl-s. Agregar comentarios en español. Llamar desde el ciclo principal y sumar a W_PAY_TOTAL.»",
      },
      {
        number: 4,
        text: "Revisa el código generado antes de guardarlo: ¿Tiene la firma dcl-proc CALC_OVERTIME? ¿Está la condición de 40 horas? ¿Los comentarios están en español? ¿La llamada está en el ciclo principal?",
      },
      {
        number: 5,
        text: "Si necesitas ajustes, pídele a Bob: «El procedimiento se ve bien, pero agrega una condición para que si horasTrabajadas es cero o negativo, retorne 0 sin calcular.»",
      },
      {
        number: 6,
        text: "Guarda el archivo y verifica que no haya errores de compilación o errores de sintaxis obvios.",
      },
    ],
    snippet: ` // -------------------------------------------------------
 // CALC_OVERTIME - Cálculo de tiempo extra al 1.5x
 // Parámetros: p_horas (horas trabajadas), p_tarifa (tarifa/hora)
 // -------------------------------------------------------
 dcl-proc CALC_OVERTIME;
   dcl-pi *n packed(9:2);
     p_horas  packed(5:2) value;
     p_tarifa packed(7:2) value;
   end-pi;
   dcl-s horasExtras packed(5:2);
   if p_horas <= 40 or p_horas <= 0;
     return 0;
   endif;
   horasExtras = p_horas - 40;
   return horasExtras * p_tarifa * 1.5;
 end-proc;`,
    snippetLabel: "Procedimiento objetivo — referencia para verificar el código generado por Bob.",
    reflection:
      "¿Cómo cambiaría tu proceso de trabajo diario si pudieras pedir cambios como este en lenguaje natural? ¿Qué salvaguardas implementarías antes de usar código generado en producción?",
  },
]

// Minimal token-based syntax highlighting for RPG
function highlightRpg(code: string): string {
  const keywords = [
    "dcl-proc",
    "dcl-pi",
    "dcl-s",
    "dcl-c",
    "dcl-f",
    "end-pi",
    "end-proc",
    "if",
    "endif",
    "else",
    "return",
    "select",
    "when",
    "other",
    "endsl",
    "BEGSR",
    "ENDSR",
    "EVAL",
    "IFEQ",
    "IFLE",
    "IFGE",
    "ELSE",
    "ENDIF",
    "DO",
    "ENDDO",
    "READ",
    "CHAIN",
    "ITER",
    "LEAVE",
    "SETON",
    "EXSR",
    "EXCEPT",
    "packed",
    "char",
    "ind",
    "value",
    "const",
  ]
  // Escape HTML first
  let escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  // Comments: lines starting with * or // 
  escaped = escaped.replace(
    /(\/\/[^\n]*)/g,
    '<span style="color:#6a9955">$1</span>',
  )
  escaped = escaped.replace(
    /(\*[A-Z=][^\n]*)/g,
    '<span style="color:#6a9955">$1</span>',
  )
  // Keywords
  keywords.forEach((kw) => {
    const re = new RegExp(`\\b(${kw})\\b`, "g")
    escaped = escaped.replace(re, '<span style="color:#22d3ee">$1</span>')
  })
  return escaped
}

export default function Exercises() {
  return (
    <section id="exercises" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">RPG Exercises</h2>
          <p className="text-[--muted-foreground] max-w-2xl mx-auto">
            Los siguientes ejercicios están diseñados para que los asistentes practiquen con sus
            propias instalaciones de Bob. El archivo PAYCALC.rpgle se puede descargar usando el
            botón al final de la sección.
          </p>
        </div>

        {/* Exercise cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {exercises.map((ex) => (
            <div
              key={ex.number}
              className="rounded-xl border border-[--border] bg-[--card] flex flex-col overflow-hidden"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-[--border]">
                <div className="flex items-start gap-4 mb-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/40 text-sm font-bold text-cyan-400">
                    {ex.number}
                  </span>
                  <div>
                    <p className="text-xs text-[--muted-foreground] mb-0.5">
                      Ejercicio {ex.number} — {ex.timeEstimate}
                    </p>
                    <h3 className="text-lg font-semibold text-[--foreground]">{ex.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-[--muted-foreground] leading-relaxed">{ex.goal}</p>
              </div>

              {/* Steps */}
              <div className="px-6 py-4 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-3">
                  Pasos
                </p>
                <ol className="space-y-2">
                  {ex.steps.map((step) => (
                    <li key={step.number} className="flex gap-3 text-sm text-[--muted-foreground]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[--muted] text-xs font-bold text-[--foreground] mt-0.5">
                        {step.number}
                      </span>
                      <span className="whitespace-pre-line leading-relaxed">{step.text}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Snippet */}
              <div className="px-6 pb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-2">
                  Snippet de referencia
                </p>
                <div className="rounded-lg overflow-hidden border border-[--border]">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] border-b border-[--border]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-xs font-mono text-[--muted-foreground]">PAYCALC.rpgle</span>
                  </div>
                  <pre
                    className="px-4 py-3 font-mono text-xs leading-relaxed overflow-x-auto bg-[#0f172a] text-[#e2e8f0]"
                    dangerouslySetInnerHTML={{ __html: highlightRpg(ex.snippet) }}
                  />
                </div>
                <p className="text-xs text-[--muted-foreground] mt-2 italic">{ex.snippetLabel}</p>
              </div>

              {/* Reflection */}
              <div className="px-6 pb-6">
                <p className="text-xs text-[--muted-foreground] border-l-2 border-cyan-500/40 pl-3 italic">
                  <span className="font-semibold not-italic text-[--foreground]">💬 Reflexión: </span>
                  {ex.reflection}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Download button */}
        <div className="flex justify-center">
          <Button asChild>
            <a href="/PAYCALC.rpgle" download className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Descargar PAYCALC.rpgle
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
