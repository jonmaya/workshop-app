"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BackgroundBeams } from "@/components/aceternity/background-beams"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === "workshop" && password === "ibmi2025") {
      sessionStorage.setItem("ws-auth", "true")
      router.push("/")
    } else {
      setError("Credenciales incorrectas. Inténtalo de nuevo.")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020817]">
      <BackgroundBeams />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Card */}
        <div className="rounded-2xl border border-[--border] bg-[--card]/90 backdrop-blur-sm px-8 py-10 shadow-2xl">
          {/* Logo / Title */}
          <div className="mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 mb-4 text-cyan-400 text-xl font-bold">
              ✦
            </div>
            <h1 className="text-xl font-bold text-[--foreground]">Acceso al Taller</h1>
            <p className="text-sm text-[--muted-foreground] mt-1">
              IBM i RPG Workshop — Modernización con IBM Bob
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-sm text-[--foreground]">
                Usuario
              </Label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError("")
                }}
                placeholder="usuario"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm text-[--foreground]">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Ingresar al Taller
            </Button>
          </form>

          {/* Hint 
          <p className="mt-6 text-center text-xs text-[--muted-foreground]">
            Demo: <span className="font-mono text-[--foreground]">workshop</span> /{" "}
            <span className="font-mono text-[--foreground]">ibmi2025</span>
          </p> */}

          <p className="mt-2 text-center text-xs text-[--muted-foreground]">
            ¿Necesitas acceso? Contacta al facilitador del taller.
          </p>
        </div>
      </div>
    </div>
  )
}
