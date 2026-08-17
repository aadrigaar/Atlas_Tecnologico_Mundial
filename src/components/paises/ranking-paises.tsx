"use client";

import { motion } from "framer-motion";
import { paises } from "@/data/paises";
import type { IndicadorMapa } from "@/types/indicador";
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

const etiquetasIndicadores: Record<IndicadorMapa, string> = {
  salarioMedioUsd: "Referencia salarial",
  empresasTecnologicas: "Empresas tecnológicas",
  empresasIa: "Empresas de IA",
  velocidadInternetMbps: "Velocidad de internet",
  trabajoRemoto: "Trabajo remoto",
  puntuacionTecnologica: "Puntuación tecnológica",
};

type PropiedadesRankingPaises = {
  indicador: IndicadorMapa;
  alSeleccionarPais: (pais: Pais) => void;
};

function formatearValor(indicador: IndicadorMapa, valor: number) {
  if (indicador === "salarioMedioUsd") return formatoSalario.format(valor);
  if (indicador === "velocidadInternetMbps") return `${valor} Mbps`;
  if (indicador === "trabajoRemoto" || indicador === "puntuacionTecnologica") return `${valor}/100`;
  return formatoNumero.format(valor);
}

export function RankingPaises({ indicador, alSeleccionarPais }: PropiedadesRankingPaises) {
  const ranking = [...paises]
    .sort((a, b) => b.indicadores[indicador] - a.indicadores[indicador])
    .slice(0, 5);

  return (
    <section className="rounded-2xl border border-border bg-card/70 p-4">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Ranking actual
      </p>
      <h2 className="mt-1 text-sm font-medium text-foreground">
        {etiquetasIndicadores[indicador]}
      </h2>
      <ol className="mt-3 space-y-1">
        {ranking.map((pais, indice) => (
          <motion.li
            key={pais.codigo}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: indice * 0.05, duration: 0.2 }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-secondary"
              onClick={() => alSeleccionarPais(pais)}
            >
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  indice === 0
                    ? "bg-primary/15 text-primary"
                    : indice === 1
                      ? "bg-chart-3/15 text-chart-3"
                      : indice === 2
                        ? "bg-chart-4/15 text-chart-4"
                        : "bg-secondary text-muted-foreground"
                }`}
              >
                {indice + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {pais.nombre}
                </span>
                <span className="block text-xs text-muted-foreground">{pais.continente}</span>
              </span>
              <span className="text-xs font-semibold text-primary">
                {formatearValor(indicador, pais.indicadores[indicador])}
              </span>
            </button>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
