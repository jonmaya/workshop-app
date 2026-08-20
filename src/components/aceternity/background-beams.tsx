"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps {
  className?: string
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const beams = [
    { x1: "10%", x2: "30%", y1: "0%", y2: "100%", delay: "0s", duration: "8s" },
    { x1: "30%", x2: "50%", y1: "0%", y2: "100%", delay: "1s", duration: "10s" },
    { x1: "50%", x2: "70%", y1: "0%", y2: "100%", delay: "2s", duration: "7s" },
    { x1: "70%", x2: "90%", y1: "0%", y2: "100%", delay: "0.5s", duration: "9s" },
    { x1: "20%", x2: "60%", y1: "0%", y2: "100%", delay: "1.5s", duration: "11s" },
    { x1: "60%", x2: "80%", y1: "0%", y2: "100%", delay: "3s", duration: "8.5s" },
  ]

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {beams.map((beam, i) => (
            <linearGradient
              key={i}
              id={`beam-gradient-${i}`}
              x1={beam.x1}
              x2={beam.x2}
              y1={beam.y1}
              y2={beam.y2}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {beams.map((beam, i) => (
          <line
            key={i}
            x1={beam.x1}
            y1={beam.y1}
            x2={beam.x2}
            y2={beam.y2}
            stroke={`url(#beam-gradient-${i})`}
            strokeWidth="1"
            style={{
              animation: `beam-pulse ${beam.duration} ${beam.delay} infinite ease-in-out alternate`,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes beam-pulse {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
