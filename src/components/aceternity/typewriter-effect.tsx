"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Word {
  text: string
  className?: string
}

interface TypewriterEffectProps {
  words: Word[]
  className?: string
  cursorClassName?: string
}

type CharEntry = {
  char: string
  wordIndex: number
  className?: string
}

function flattenWords(words: Word[]): CharEntry[] {
  return words.flatMap((word, wi) =>
    word.text.split("").map((char) => ({
      char,
      wordIndex: wi,
      className: word.className,
    }))
  )
}

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: TypewriterEffectProps) {
  const [allChars] = useState<CharEntry[]>(() => flattenWords(words))
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= allChars.length) return
    const timeout = setTimeout(() => {
      setCount((c) => c + 1)
    }, 60)
    return () => clearTimeout(timeout)
  }, [count, allChars.length])

  // Group revealed chars back into per-word strings
  const wordMap = new Map<number, string>()
  for (let i = 0; i < count; i++) {
    const entry = allChars[i]
    wordMap.set(entry.wordIndex, (wordMap.get(entry.wordIndex) ?? "") + entry.char)
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2", className)}>
      {words.map((word, i) => (
        <span key={i} className={word.className}>
          {wordMap.get(i) ?? ""}
          {i === words.length - 1 && count < allChars.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={cn(
                "inline-block ml-0.5 w-[2px] h-[1em] bg-current align-middle",
                cursorClassName
              )}
            />
          )}
        </span>
      ))}
    </div>
  )
}
