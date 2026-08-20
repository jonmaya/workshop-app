"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerClassName?: string
  className?: string
  children: React.ReactNode
  duration?: number
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-transparent p-[1px] bg-[--background] overflow-hidden",
        containerClassName
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-full z-0"
        animate={{
          background: hovered
            ? "linear-gradient(90deg, #06b6d4, #7c3aed, #06b6d4)"
            : "linear-gradient(90deg, transparent, transparent)",
          backgroundSize: "200% 100%",
          backgroundPosition: hovered ? ["0% 50%", "200% 50%"] : "0% 50%",
        }}
        transition={{ duration, ease: "linear", repeat: hovered ? Infinity : 0 }}
      />
      <span
        className={cn(
          "relative z-10 flex items-center justify-center gap-2 rounded-full bg-[--background] px-4 py-2 text-sm font-medium text-[--foreground]",
          className
        )}
      >
        {children}
      </span>
    </Tag>
  )
}
