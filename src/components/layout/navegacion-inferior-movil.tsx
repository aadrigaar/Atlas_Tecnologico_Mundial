"use client";

import { Map, BarChart2, Table, Sparkles, SlidersHorizontal } from "lucide-react";
import type { ModoVista } from "@/components/layout/cabecera-principal";

type PropiedadesNavegacionInferiorMovil = {
  modoVistaActivo: ModoVista;
  alCambiarModoVista: (modo: ModoVista) => void;
  alAbrirInsights: () => void;
  alAbrirFiltros: () => void;
  filtrosActivos: boolean;
};

export function NavegacionInferiorMovil({
  modoVistaActivo,
  alCambiarModoVista,
  alAbrirInsights,
  alAbrirFiltros,
  filtrosActivos,
}: PropiedadesNavegacionInferiorMovil) {
  return (
    <div className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/90 px-3 py-2 shadow-2xl shadow-black/60 backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={() => alCambiarModoVista("mapa")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          modoVistaActivo === "mapa"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Map className="size-4" />
        <span>Mapa</span>
      </button>

      <button
        type="button"
        onClick={() => alCambiarModoVista("matriz")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          modoVistaActivo === "matriz"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <BarChart2 className="size-4" />
        <span>Matriz</span>
      </button>

      <button
        type="button"
        onClick={() => alCambiarModoVista("tabla")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
          modoVistaActivo === "tabla"
            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Table className="size-4" />
        <span>Tabla</span>
      </button>

      <div className="mx-1 h-4 w-px bg-border" />

      <button
        type="button"
        onClick={alAbrirFiltros}
        className={`relative flex items-center justify-center rounded-full p-2 transition-colors ${
          filtrosActivos
            ? "bg-primary/20 text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Abrir filtros"
      >
        <SlidersHorizontal className="size-4" />
        {filtrosActivos && (
          <span className="absolute top-1 right-1 size-2 rounded-full bg-primary" />
        )}
      </button>

      <button
        type="button"
        onClick={alAbrirInsights}
        className="flex items-center justify-center rounded-full p-2 text-primary hover:bg-primary/10"
        aria-label="Abrir insights globales"
      >
        <Sparkles className="size-4" />
      </button>
    </div>
  );
}
