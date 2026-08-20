"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Agenda", href: "#agenda" },
  { label: "Instalación", href: "#install" },
  { label: "Modos", href: "#modes" },
  { label: "Ejercicios", href: "#exercises" },
  { label: "Valor", href: "#value" },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    // Allow the browser's native scroll-behavior: smooth to handle it
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 bg-[#020817]/90 backdrop-blur border-b border-[#1e293b]">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: logo */}
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-[#f1f5f9] hover:text-[#06b6d4] transition-colors"
        >
          IBM Bob Workshop
        </Link>

        {/* Center: desktop nav links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={[
                    "text-sm transition-colors",
                    isActive
                      ? "text-[#06b6d4] font-medium"
                      : "text-[#94a3b8] hover:text-[#f1f5f9]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login" className="text-[#f1f5f9] border-[#1e293b]">
              Acceder
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-[#94a3b8] hover:text-[#f1f5f9] transition-colors"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={[
          "md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out",
          menuOpen ? "max-h-64" : "max-h-0",
        ].join(" ")}
      >
        <ul className="flex flex-col px-4 pb-4 gap-3 border-t border-[#1e293b] pt-3">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavClick(href)}
                  className={[
                    "w-full text-left text-sm transition-colors",
                    isActive
                      ? "text-[#06b6d4] font-medium"
                      : "text-[#94a3b8] hover:text-[#f1f5f9]",
                  ].join(" ")}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
