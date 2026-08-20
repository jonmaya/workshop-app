// Server component

interface Step {
  number: number
  title: string
  body: string
  code?: string
  codeLanguage?: string
}

const steps: Step[] = [
  {
    number: 1,
    title: "Crear la estructura de carpetas",
    body: "En tu terminal o explorador de archivos, crea la carpeta si no existe:",
    code: "mkdir -p .bob/rules",
    codeLanguage: "bash",
  },
  {
    number: 2,
    title: "Abrir el Modo Agent de Bob",
    body: "Cambia a Modo Agent y escribe el siguiente prompt:",
    code: `Crea el archivo .bob/rules/ibmi-conventions.md con las convenciones
de desarrollo IBM i 7.5 para nuestro proyecto. Incluye:
- Reglas de nomenclatura para archivos físicos y lógicos
- Estándares para nombres de variables RPG
- Reglas para comentarios (idioma español)
- Convenciones para procedimientos ILE free-form
- Configuraciones específicas de IBM i 7.5`,
    codeLanguage: "prompt",
  },
  {
    number: 3,
    title: "Revisar y personalizar",
    body: "Bob generará el archivo. Revísalo junto con el grupo y pide ajustes:",
    code: `Agrega una sección de "Anti-patrones a evitar" con los 5 errores
más comunes al migrar de RPG III a ILE free-form.`,
    codeLanguage: "prompt",
  },
  {
    number: 4,
    title: "Verificar que Bob usa las convenciones",
    body: "Prueba que las instrucciones están activas con este prompt en Modo Ask:",
    code: "¿Qué convenciones de codificación debo seguir en este proyecto?",
    codeLanguage: "prompt",
  },
  {
    number: 5,
    title: "Compartir el archivo con el equipo",
    body: "Agrega el archivo al control de versiones:",
    code: `git add .bob/rules/ibmi-conventions.md
git commit -m "chore: agregar convenciones IBM i para IBM Bob"`,
    codeLanguage: "bash",
  },
]

const sampleConventions = `# Convenciones de Desarrollo IBM i 7.5

Este archivo es leído automáticamente por IBM Bob para asegurar que todo
el código generado siga los estándares de nuestro equipo.

## Reglas Generales

- Todo el código nuevo debe escribirse en **ILE RPG free-form** (/free ... /end-free)
- Mantener compatibilidad hacia atrás con programas existentes en fixed-form
- Idioma de comentarios: **español** en todo momento
- Una rutina de negocio = un procedimiento (dcl-proc)

## Nomenclatura de Archivos

- Archivos físicos (PF): sufijo PF — ejemplo: EMPPF, TIMEPF
- Archivos lógicos (LF): sufijo LF — ejemplo: EMPLF1, TIMLF1
- Programas de servicio: prefijo SRV_ — ejemplo: SRV_PAYROLL
- Programas de presentación: prefijo DSP_ — ejemplo: DSP_EMPMNT

## Nomenclatura de Variables

- Variables locales: prefijo l_ — ejemplo: l_horasTrabajadas
- Variables globales de trabajo: prefijo w_ — ejemplo: w_pagoBase
- Parámetros de procedimientos: prefijo p_ — ejemplo: p_tarifa
- Constantes: formato MAYÚSCULAS con C_ — ejemplo: C_IMSS_RATE
- Indicadores: preferir ind con nombres descriptivos sobre *IN

## Estilo de Código ILE RPG Free-Form

- Usar dcl-proc con dcl-pi ... end-pi explícito en todo procedimiento
- Incluir tipo de retorno en dcl-pi o *n con tipo en la declaración
- Especificar value o const en todos los parámetros
- No usar goto ni cabsr en código nuevo
- Límite de longitud de línea: 120 caracteres

## Anti-patrones a Evitar

1. No usar *IN directamente — declarar indicadores con dcl-s e ind
2. No mezclar fixed-form y free-form en la misma sección del programa
3. No usar subroutines (BEGSR/ENDSR) en código nuevo — usar dcl-proc
4. No usar variables genéricas como WK_FIELD1, WK_TEMP sin contexto
5. No omitir end-pi en procedimientos — siempre declarar explícitamente

## Configuraciones Específicas IBM i 7.5

- Control spec: ctl-opt dftactgrp(*no) actgrp(*caller) option(*srcstmt);
- Usar %scan, %trim, %subst en lugar de sus equivalentes fixed-form
- Para fecha/hora usar dcl-s con tipo date, time, timestamp
- Usar %char, %dec, %int para conversiones de tipo explícitas`

export default function CustomInstructions() {
  return (
    <section id="custom" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">Custom Instructions</h2>
          <p className="text-[--muted-foreground] max-w-2xl mx-auto">
            En este bloque crearemos en vivo el archivo de convenciones personalizadas para IBM i.
            Este archivo le dice a Bob qué estándares de codificación debe seguir cuando genera o
            modifica código RPG en tu proyecto.
          </p>
        </div>

        {/* Explainer */}
        <div className="mb-10 rounded-xl border border-violet-500/30 bg-violet-500/5 px-6 py-5">
          <p className="text-sm font-semibold text-violet-300 mb-1">
            ¿Qué son las Custom Instructions?
          </p>
          <p className="text-sm text-[--muted-foreground] leading-relaxed">
            Las instrucciones personalizadas son archivos Markdown guardados en la carpeta{" "}
            <code className="text-cyan-400 font-mono text-xs">.bob/rules/</code> de tu proyecto.
            Bob los lee automáticamente antes de cada respuesta, asegurando que el código generado
            siga los estándares de <span className="text-[--foreground] font-semibold">tu</span>{" "}
            equipo — no los estándares genéricos de internet.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-14">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              {/* Number */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[--muted] border border-[--border] flex items-center justify-center text-sm font-bold text-[--foreground] shrink-0">
                  {step.number}
                </div>
                {step.number < steps.length && (
                  <div className="w-px flex-1 bg-[--border] mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <p className="text-sm font-semibold text-[--foreground] mb-1">{step.title}</p>
                <p className="text-sm text-[--muted-foreground] mb-3">{step.body}</p>
                {step.code && (
                  <div className="rounded-lg overflow-hidden border border-[--border]">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] border-b border-[--border]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="text-xs font-mono text-[--muted-foreground]">
                        {step.codeLanguage === "bash" ? "terminal" : "prompt · agent mode"}
                      </span>
                    </div>
                    <pre className="px-4 py-3 font-mono text-sm text-cyan-300 leading-relaxed whitespace-pre-wrap break-words bg-[#0f172a]">
                      {step.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sample conventions file */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-3">
            Contenido de ejemplo — .bob/rules/ibmi-conventions.md
          </p>
          <div className="rounded-xl overflow-hidden border border-[--border]">
            {/* Terminal chrome */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#0f172a] border-b border-[--border]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-[--muted-foreground]">
                .bob/rules/ibmi-conventions.md
              </span>
            </div>
            <pre className="px-5 py-4 font-mono text-xs text-[#e2e8f0] leading-relaxed whitespace-pre-wrap break-words bg-[#0f172a] max-h-[28rem] overflow-y-auto">
              {sampleConventions}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
