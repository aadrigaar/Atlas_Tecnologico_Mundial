"use client";

import Link from "next/link";
import { Globe, Map, BarChart2, Table, Sparkles } from "lucide-react";

import { BuscadorPaises } from "@/components/paises/buscador-paises";
import type { Pais } from "@/types/pais";

export type ModoVista = "mapa" | "matriz" | "tabla";

type PropiedadesCabeceraPrincipal = {
  alSeleccionarPais: (pais: Pais) => void;
  modoVistaActivo: ModoVista;
  alCambiarModoVista: (modo: ModoVista) => void;
  alAbrirEstadisticasGlobales?: () => void;
};

export function CabeceraPrincipal({
  alSeleccionarPais,
  modoVistaActivo,
  alCambiarModoVista,
  alAbrirEstadisticasGlobales,
}: PropiedadesCabeceraPrincipal) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          <span className="flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
            <Globe className="size-4" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight text-foreground">Atlas</span>
            <span className="mt-1 text-[0.65rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Tecnológico Mundial
            </span>
          </span>
        </Link>

        {/* View mode switcher */}
        <nav className="hidden items-center gap-1 rounded-2xl border border-border bg-card/60 p-1 sm:flex">
          <button
            type="button"
            onClick={() => alCambiarModoVista("mapa")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              modoVistaActivo === "mapa"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Map className="size-3.5" />
            <span>Mapa</span>
          </button>

          <button
            type="button"
            onClick={() => alCambiarModoVista("matriz")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              modoVistaActivo === "matriz"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <BarChart2 className="size-3.5" />
            <span>Matriz de Valor</span>
          </button>

          <button
            type="button"
            onClick={() => alCambiarModoVista("tabla")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
              modoVistaActivo === "tabla"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Table className="size-3.5" />
            <span>Tabla</span>
          </button>
        </nav>

        {/* Acciones & Buscador */}
        <div className="flex items-center gap-2.5">
          {alAbrirEstadisticasGlobales && (
            <button
              type="button"
              onClick={alAbrirEstadisticasGlobales}
              className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20 shadow-sm"
            >
              <Sparkles className="size-3.5" />
              <span className="hidden md:inline">Insights Globales</span>
            </button>
          )}

          <BuscadorPaises alSeleccionarPais={alSeleccionarPais} />
        </div>
      </div>
    </header>
  );
}
