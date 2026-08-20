"use client"

import Hero from "@/components/sections/Hero"
import Agenda from "@/components/sections/Agenda"
import InstallGuide from "@/components/sections/InstallGuide"
import BobModes from "@/components/sections/BobModes"
import DemoScripts from "@/components/sections/DemoScripts"
import Exercises from "@/components/sections/Exercises"
import CustomInstructions from "@/components/sections/CustomInstructions"
import BusinessValue from "@/components/sections/BusinessValue"
import { useAuthGuard } from "@/hooks/useAuthGuard"

export default function Home() {
  useAuthGuard()

  return (
    <main>
      <Hero />
      <Agenda />
      <InstallGuide />
      <BobModes />
      <DemoScripts />
      <Exercises />
      <CustomInstructions />
      <BusinessValue />
    </main>
  )
}
