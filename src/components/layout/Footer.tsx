// Server component

export default function Footer() {
  return (
    <footer className="border-t border-[--border] bg-[#020817] py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left — workshop identity */}
          <div>
            <p className="text-sm font-semibold text-[--foreground] mb-1">
              IBM i RPG Workshop
            </p>
            <p className="text-xs text-[--muted-foreground] leading-relaxed">
              Modernización con IBM Bob
            </p>
            <p className="text-xs text-[--muted-foreground] mt-1">
              Duración: 4 horas &nbsp;·&nbsp; Fecha:{" "}
              <span className="italic">&#123;&#123; FECHA DEL TALLER &#125;&#125;</span>
            </p>
            <p className="text-xs text-[--muted-foreground] mt-1">
              Lugar:{" "}
              <span className="italic">&#123;&#123; CIUDAD, PAÍS &#125;&#125;</span>
            </p>
            <p className="mt-3 text-xs text-[--muted-foreground]">
              <span className="text-[--foreground] font-semibold">IBM </span>— Building a smarter
              planet
            </p>
          </div>

          {/* Right — facilitator & contact */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-1">
                Facilitador
              </p>
              <p className="text-sm text-[--foreground]">
                &#123;&#123; NOMBRE DEL FACILITADOR &#125;&#125;
              </p>
              <p className="text-xs text-[--muted-foreground]">
                &#123;&#123; CARGO / ÁREA &#125;&#125;
              </p>
              <p className="text-xs text-[--muted-foreground]">
                &#123;&#123; CORREO CORPORATIVO &#125;&#125;
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[--muted-foreground] mb-1">
                Contacto IBM
              </p>
              <p className="text-sm text-[--foreground]">
                &#123;&#123; NOMBRE DEL REPRESENTANTE IBM &#125;&#125;
              </p>
              <p className="text-xs text-[--muted-foreground]">
                &#123;&#123; CORREO IBM &#125;&#125;
              </p>
              <p className="text-xs text-[--muted-foreground]">
                &#123;&#123; NÚMERO DE CONTACTO &#125;&#125;
              </p>
            </div>
          </div>
        </div>

        {/* Legal line */}
        <div className="border-t border-[--border] pt-4 text-center">
          <p className="text-xs text-[--muted-foreground]">
            &copy; &#123;&#123; AÑO &#125;&#125; IBM Corporation. IBM, IBM i, IBM Bob y el
            logotipo de IBM son marcas comerciales o marcas registradas de International Business
            Machines Corporation. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
