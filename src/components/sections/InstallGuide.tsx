"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// ── Copy-able command block ───────────────────────────────────────────────────

function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-[#0f172a] border border-[--border] px-4 py-3 my-2">
      <code className="flex-1 font-mono text-sm text-cyan-400 break-all">{command}</code>
      <button
        onClick={handleCopy}
        aria-label="Copiar comando"
        className={cn(
          "shrink-0 p-1 rounded transition-colors",
          copied
            ? "text-green-400 hover:text-green-300"
            : "text-[--muted-foreground] hover:text-cyan-400"
        )}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  )
}

// ── Step list helpers ─────────────────────────────────────────────────────────

interface Step {
  title: string
  items: (string | { type: "cmd"; value: string })[]
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 text-xs font-bold">
            {i + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <p className="font-semibold text-[--foreground] mb-1">{step.title}</p>
            <ul className="space-y-1">
              {step.items.map((item, j) =>
                typeof item === "string" ? (
                  <li key={j} className="text-sm text-[--muted-foreground]">
                    {item}
                  </li>
                ) : (
                  <li key={j}>
                    <CommandBlock command={item.value} />
                  </li>
                )
              )}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  )
}

// ── Per-OS step data ──────────────────────────────────────────────────────────

const macSteps: Step[] = [
  {
    title: "Crear o verificar tu IBMid",
    items: [
      "Abre un navegador y ve a https://myibm.ibm.com",
      "Haz clic en Crear un IBMid si no tienes cuenta, o en Iniciar sesión si ya la tienes.",
      "Completa el registro con tu correo corporativo y verifica tu dirección de correo electrónico.",
      "Guarda tus credenciales de IBMid — las necesitarás para activar Bob.",
    ],
  },
  {
    title: "Descargar IBM Bob",
    items: [
      "Ve a https://ibm.com/bob (o al enlace provisto por el facilitador).",
      "Descarga el paquete .dmg para macOS (Apple Silicon o Intel según tu equipo).",
      "Abre el archivo .dmg y arrastra la aplicación IBM Bob a tu carpeta /Applications.",
    ],
  },
  {
    title: "Primera ejecución y activación",
    items: [
      "Abre IBM Bob desde tu carpeta de Aplicaciones.",
      "En la pantalla de bienvenida, haz clic en Sign in with IBMid.",
      "Ingresa tus credenciales de IBMid y autoriza el acceso.",
      "Bob descargará los modelos necesarios (requiere ~2 GB de espacio libre).",
    ],
  },
  {
    title: "Verificar la instalación",
    items: [
      "Abre el panel de comandos con Cmd + Shift + P.",
      { type: "cmd", value: "Bob: Version" },
      "Confirma que la versión mostrada es 2.x o superior.",
    ],
  },
]

const winSteps: Step[] = [
  {
    title: "Crear o verificar tu IBMid",
    items: [
      "Abre un navegador y ve a https://myibm.ibm.com",
      "Sigue el mismo proceso de registro descrito en la sección macOS.",
    ],
  },
  {
    title: "Descargar IBM Bob",
    items: [
      "Ve al enlace de descarga provisto por el facilitador.",
      "Descarga el instalador .exe para Windows (64-bit).",
      "Ejecuta el instalador como administrador: haz clic derecho → Ejecutar como administrador.",
      "Acepta los términos de licencia y sigue el asistente de instalación.",
    ],
  },
  {
    title: "Primera ejecución y activación",
    items: [
      "Abre IBM Bob desde el menú de inicio o el acceso directo en el escritorio.",
      "En la pantalla de bienvenida, haz clic en Sign in with IBMid.",
      "Ingresa tus credenciales y autoriza el acceso.",
      "Espera la descarga de los modelos de IA (requiere ~2 GB de espacio libre).",
    ],
  },
  {
    title: "Verificar la instalación",
    items: [
      "Abre el panel de comandos con Ctrl + Shift + P.",
      { type: "cmd", value: "Bob: Version" },
      "Confirma que la versión es 2.x o superior.",
    ],
  },
]

const linuxSteps: Step[] = [
  {
    title: "Crear o verificar tu IBMid",
    items: [
      "Abre un navegador y ve a https://myibm.ibm.com.",
      "Sigue el proceso de registro estándar.",
    ],
  },
  {
    title: "Descargar IBM Bob",
    items: [
      "Ve al enlace de descarga provisto por el facilitador.",
      "Descarga el paquete .deb (Debian/Ubuntu) o .rpm (RHEL/Fedora).",
    ],
  },
  {
    title: "Instalar el paquete — Ubuntu/Debian",
    items: [
      { type: "cmd", value: "sudo dpkg -i ibm-bob_2.x.x_amd64.deb" },
      { type: "cmd", value: "sudo apt-get install -f" },
    ],
  },
  {
    title: "Instalar el paquete — RHEL/Fedora",
    items: [{ type: "cmd", value: "sudo rpm -ivh ibm-bob-2.x.x.x86_64.rpm" }],
  },
  {
    title: "Primera ejecución y activación",
    items: [
      "Ejecuta ibm-bob desde la terminal o busca la aplicación en el lanzador del sistema.",
      "Inicia sesión con tu IBMid.",
      "Espera la descarga de los modelos de IA.",
    ],
  },
  {
    title: "Verificar la instalación",
    items: [
      "Abre el panel de comandos con Ctrl + Shift + P.",
      { type: "cmd", value: "Bob: Version" },
      "Verifica que la versión sea 2.x o superior.",
    ],
  },
]

// ── Troubleshooting data ──────────────────────────────────────────────────────

const troubleshooting = [
  {
    id: "item-1",
    question: "No puedo iniciar sesión con mi IBMid",
    answer:
      "Verifica que tu correo corporativo esté registrado en myibm.ibm.com. Asegúrate de haber verificado tu dirección de correo electrónico. Intenta restablecer tu contraseña en https://myibm.ibm.com. Si tu empresa usa SSO, contacta a tu administrador de TI.",
  },
  {
    id: "item-2",
    question: "Bob no descarga los modelos",
    answer:
      "Verifica tu conexión a internet. Los modelos requieren una descarga inicial de ~2 GB. Desactiva temporalmente el VPN corporativo si es posible. Verifica que tengas al menos 5 GB de espacio libre en disco.",
  },
  {
    id: "item-3",
    question: "El instalador de Windows es bloqueado por antivirus",
    answer:
      "Agrega el instalador de IBM Bob a las excepciones de tu antivirus corporativo. Contacta a tu equipo de TI para que autorice el software si es necesario.",
  },
  {
    id: "item-4",
    question: "Bob no reconoce mis archivos .rpgle",
    answer:
      "Asegúrate de que la extensión del archivo sea .rpgle o .rpg. Abre la carpeta del proyecto completa con Archivo → Abrir carpeta, no solo el archivo individual.",
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function InstallGuide() {
  return (
    <section id="install" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[--foreground] mb-2">Installation Guide</h2>
          <p className="text-[--muted-foreground]">
            Sigue las instrucciones de tu sistema operativo para instalar IBM Bob antes o durante el
            taller. Si encuentras algún problema, consulta la sección de resolución de problemas al
            final.
          </p>
        </div>

        {/* OS Tabs */}
        <Tabs defaultValue="macos" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="macos">macOS</TabsTrigger>
            <TabsTrigger value="windows">Windows</TabsTrigger>
            <TabsTrigger value="linux">Linux</TabsTrigger>
          </TabsList>

          <TabsContent value="macos">
            <div className="rounded-xl border border-[--border] bg-[--card] p-6">
              <p className="text-xs text-[--muted-foreground] mb-6">
                Requisitos: macOS 12 (Monterey) o superior · Conexión a internet activa · Cuenta de IBMid
              </p>
              <StepList steps={macSteps} />
            </div>
          </TabsContent>

          <TabsContent value="windows">
            <div className="rounded-xl border border-[--border] bg-[--card] p-6">
              <p className="text-xs text-[--muted-foreground] mb-6">
                Requisitos: Windows 10 (64-bit) o superior · Conexión a internet activa · Cuenta de IBMid
              </p>
              <StepList steps={winSteps} />
            </div>
          </TabsContent>

          <TabsContent value="linux">
            <div className="rounded-xl border border-[--border] bg-[--card] p-6">
              <p className="text-xs text-[--muted-foreground] mb-6">
                Requisitos: Ubuntu 20.04+ / RHEL 8+ / distribución equivalente (64-bit) · Conexión a
                internet activa · Cuenta de IBMid
              </p>
              <StepList steps={linuxSteps} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Troubleshooting */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-[--foreground] mb-4">Troubleshooting</h3>
          <Accordion type="multiple" className="w-full">
            {troubleshooting.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-[--foreground] hover:text-cyan-400 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[--muted-foreground] leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
