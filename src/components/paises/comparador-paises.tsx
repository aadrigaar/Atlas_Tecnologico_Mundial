"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
    etiqueta: "Empresas tecnológicas",
    obtenerValor: (pais: Pais) => pais.indicadores.empresasTecnologicas,
    formatear: (valor: number) => formatoNumero.format(valor),
  },
  {
    etiqueta: "Empresas de IA",
    obtenerValor: (pais: Pais) => pais.indicadores.empresasIa,
    formatear: (valor: number) => formatoNumero.format(valor),
  },
  {
    etiqueta: "Internet",
    obtenerValor: (pais: Pais) => pais.indicadores.velocidadInternetMbps,
    formatear: (valor: number) => `${valor} Mbps`,
  },
  {
    etiqueta: "Trabajo remoto",
    obtenerValor: (pais: Pais) => pais.indicadores.trabajoRemoto,
    formatear: (valor: number) => `${valor}/100`,
  },
  {
    etiqueta: "Puntuación tecnológica",
    obtenerValor: (pais: Pais) => pais.indicadores.puntuacionTecnologica,
    formatear: (valor: number) => `${valor}/100`,
  },
];

type PropiedadesComparadorPaises = {
  paises: Pais[];
  alCerrar: () => void;
};

export function ComparadorPaises({ paises, alCerrar }: PropiedadesComparadorPaises) {
  if (paises.length !== 2) {
    return null;
  }

  const [primerPais, segundoPais] = paises;

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
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
              Comparativa rápida
            </p>
            <h2 className="mt-1 text-sm font-medium text-foreground">
              {primerPais.nombre} vs {segundoPais.nombre}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              2 países
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
          <table className="w-full min-w-[34rem] text-left text-xs">
            <thead className="bg-background/40 text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 font-medium">Indicador</th>
                <th className="px-4 py-2.5 font-medium">{primerPais.nombre}</th>
                <th className="px-4 py-2.5 font-medium">{segundoPais.nombre}</th>
              </tr>
            </thead>
            <tbody>
              {metricas.map((metrica) => {
                const valorPrimerPais = metrica.obtenerValor(primerPais);
                const valorSegundoPais = metrica.obtenerValor(segundoPais);

                return (
                  <tr key={metrica.etiqueta} className="border-t border-border/70">
                    <th className="px-4 py-2.5 font-medium text-muted-foreground">
                      {metrica.etiqueta}
                    </th>
                    <td
                      className={`px-4 py-2.5 font-semibold ${
                        valorPrimerPais > valorSegundoPais ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {metrica.formatear(valorPrimerPais)}
                    </td>
                    <td
                      className={`px-4 py-2.5 font-semibold ${
                        valorSegundoPais > valorPrimerPais ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {metrica.formatear(valorSegundoPais)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
