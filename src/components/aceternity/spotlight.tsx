"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return
      const rect = divRef.current.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setOpacity(1)
    }

    const handleMouseLeave = () => {
      setOpacity(0)
    }

    const el = divRef.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={divRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill === "white" ? "rgba(255,255,255,0.06)" : `${fill}15`}, transparent 40%)`,
        }}
      />
    </div>
  )
}
