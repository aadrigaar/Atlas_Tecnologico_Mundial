"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import type { Pais } from "@/types/pais";

const formatoSalario = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const metricas = [
  {
    etiqueta: "Salario medio",
    obtenerValor: (pais: Pais) => pais.indicadores.salarioMedioUsd,
    formatear: (valor: number) => formatoSalario.format(valor),
  },
  {
    etiqueta: "Empresas tech",
    obtenerValor: (pais: Pais) => pais.indicadores.empresasTecnologicas,
    formatear: (valor: number) => formatoNumero.format(valor),
  },
  {
    etiqueta: "Empresas IA",
    obtenerValor: (pais: Pais) => pais.indicadores.empresasIa,
    formatear: (valor: number) => formatoNumero.format(valor),
  },
  {
    etiqueta: "Internet",
    obtenerValor: (pais: Pais) => pais.indicadores.velocidadInternetMbps,
    formatear: (valor: number) => `${valor} Mbps`,
  },
  {
    etiqueta: "Puntuación",
    obtenerValor: (pais: Pais) => pais.indicadores.puntuacionTecnologica,
    formatear: (valor: number) => `${valor}/100`,
  },
];

type PropiedadesComparadorPaises = {
  paises: Pais[];
  alCerrar: () => void;
  alAbrirComparadorAvanzado?: () => void;
};

export function ComparadorPaises({
  paises,
  alCerrar,
  alAbrirComparadorAvanzado,
}: PropiedadesComparadorPaises) {
  if (paises.length < 2) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute bottom-5 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card/90 shadow-2xl shadow-black/30 backdrop-blur-md"
        aria-label="Comparativa de países"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-primary uppercase">
              Comparativa rápida
            </p>
            <h2 className="text-xs font-semibold text-foreground">
              {paises.map((p) => p.nombre).join(" vs ")}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {alAbrirComparadorAvanzado && (
              <button
                type="button"
                onClick={alAbrirComparadorAvanzado}
                className="flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[0.7rem] font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Maximize2 className="size-3" />
                <span>Informe Comparativo</span>
              </button>
            )}
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.68rem] font-semibold text-primary">
              {paises.length} países
            </span>
            <button
              type="button"
              onClick={alCerrar}
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Cerrar comparativa"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-xs">
            <thead className="bg-background/40 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Indicador</th>
                {paises.map((p) => (
                  <th key={p.codigo} className="px-3 py-2 font-semibold text-foreground">
                    {p.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metricas.map((metrica) => (
                <tr key={metrica.etiqueta} className="border-t border-border/60">
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    {metrica.etiqueta}
                  </th>
                  {paises.map((p) => (
                    <td key={p.codigo} className="px-3 py-2 font-semibold text-foreground">
                      {metrica.formatear(metrica.obtenerValor(p))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
