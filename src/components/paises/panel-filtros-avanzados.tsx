"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Continente } from "@/types/pais";

export type FiltrosEstado = {
  continente: Continente | "Todos";
  salarioMinimoUsd: number;
  velocidadInternetMinMbps: number;
  soloVisaNomada: boolean;
  puntuacionMinima: number;
};

export const FILTROS_INICIALES: FiltrosEstado = {
  continente: "Todos",
  salarioMinimoUsd: 0,
  velocidadInternetMinMbps: 0,
  soloVisaNomada: false,
  puntuacionMinima: 0,
};

type PropiedadesPanelFiltrosAvanzados = {
  abierto: boolean;
  alCerrar: () => void;
  filtros: FiltrosEstado;
  alCambiarFiltros: (nuevosFiltros: FiltrosEstado) => void;
  alRestablecerFiltros: () => void;
  totalResultados: number;
  totalPaises: number;
};

export function PanelFiltrosAvanzados({
  abierto,
  alCerrar,
  filtros,
  alCambiarFiltros,
  alRestablecerFiltros,
  totalResultados,
  totalPaises,
}: PropiedadesPanelFiltrosAvanzados) {
  // Esc para cerrar modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        alCerrar();
      }
    }
    if (abierto) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  const continentes: (Continente | "Todos")[] = [
    "Todos",
    "Europa",
    "Norteamérica",
    "Sudamérica",
    "Asia",
    "África",
    "Oceanía",
  ];

  const hayFiltrosActivos =
    filtros.continente !== "Todos" ||
    filtros.salarioMinimoUsd > 0 ||
    filtros.velocidadInternetMinMbps > 0 ||
    filtros.soloVisaNomada ||
    filtros.puntuacionMinima > 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={alCerrar}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Panel de filtros avanzados"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card/80 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <SlidersHorizontal className="size-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Filtros Avanzados
                </h2>
                <p className="text-xs text-muted-foreground">
                  Filtra los ecosistemas según tus criterios
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={alCerrar}
              className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Cerrar filtros"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Continente */}
            <div>
              <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Continente
              </label>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {continentes.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => alCambiarFiltros({ ...filtros, continente: c })}
                    className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                      filtros.continente === c
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Salario Mínimo */}
            <div>
              <div className="flex justify-between text-xs">
                <label className="font-semibold tracking-wider text-muted-foreground uppercase">
                  Referencia Salarial Mínima (USD)
                </label>
                <span className="font-bold text-primary">
                  ${filtros.salarioMinimoUsd.toLocaleString()} / año
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={filtros.salarioMinimoUsd}
                onChange={(e) =>
                  alCambiarFiltros({ ...filtros, salarioMinimoUsd: Number(e.target.value) })
                }
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
              />
              <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
                <span>$0</span>
                <span>$75,000</span>
                <span>$150,000+</span>
              </div>
            </div>

            {/* Velocidad Mínima Internet */}
            <div>
              <div className="flex justify-between text-xs">
                <label className="font-semibold tracking-wider text-muted-foreground uppercase">
                  Velocidad Mínima de Internet
                </label>
                <span className="font-bold text-chart-2">
                  {filtros.velocidadInternetMinMbps} Mbps
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="280"
                step="20"
                value={filtros.velocidadInternetMinMbps}
                onChange={(e) =>
                  alCambiarFiltros({ ...filtros, velocidadInternetMinMbps: Number(e.target.value) })
                }
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-chart-2"
              />
              <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
                <span>0 Mbps</span>
                <span>140 Mbps</span>
                <span>280 Mbps</span>
              </div>
            </div>

            {/* Puntuación Mínima */}
            <div>
              <div className="flex justify-between text-xs">
                <label className="font-semibold tracking-wider text-muted-foreground uppercase">
                  Puntuación Tecnológica Mínima
                </label>
                <span className="font-bold text-chart-3">{filtros.puntuacionMinima}/100</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={filtros.puntuacionMinima}
                onChange={(e) =>
                  alCambiarFiltros({ ...filtros, puntuacionMinima: Number(e.target.value) })
                }
                className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary accent-chart-3"
              />
              <div className="mt-1 flex justify-between text-[0.65rem] text-muted-foreground">
                <span>Cualquiera</span>
                <span>50/100</span>
                <span>90/100</span>
              </div>
            </div>

            {/* Switch Visa Nómada Digital */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/30 p-3.5">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Solo con Visa para Nómadas Digitales
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Muestra únicamente países con visados específicos para trabajo remoto
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  alCambiarFiltros({ ...filtros, soloVisaNomada: !filtros.soloVisaNomada })
                }
                className={`flex size-6 items-center justify-center rounded-lg border transition-all ${
                  filtros.soloVisaNomada
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-transparent"
                }`}
              >
                <Check className="size-4" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-card/80 p-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={!hayFiltrosActivos}
              onClick={alRestablecerFiltros}
              className="text-xs text-muted-foreground"
            >
              <RotateCcw className="mr-1.5 size-3.5" />
              Limpiar filtros
            </Button>

            <Button type="button" variant="default" size="sm" onClick={alCerrar}>
              Ver {totalResultados} de {totalPaises} países
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
