import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { siteIdentity } from "@/lib/site-identity";

export function SimulationShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2efe7] text-[#17221c]">
      <header className="border-b border-[#d2cbbf] bg-[#fffdf8]">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center border border-[#bd854f] text-[11px] font-bold tracking-[0.12em] text-[#9a6034]">
              ER
            </span>
            <span className="font-display text-lg font-semibold">
              {siteIdentity.commercialName}
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#536159]"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span className="hidden sm:inline">Retour à l’accueil</span>
            <span className="sm:hidden">Accueil</span>
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[#101713] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} {siteIdentity.commercialName}
          </p>
          <nav className="flex flex-wrap gap-5" aria-label="Informations du site">
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link to="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
