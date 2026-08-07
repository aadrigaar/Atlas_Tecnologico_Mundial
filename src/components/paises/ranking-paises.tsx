"use client";

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
  salarioMedioUsd: "Salarios",
  empresasTecnologicas: "Empresas tecnológicas",
  empresasIa: "Empresas de inteligencia artificial",
  velocidadInternetMbps: "Velocidad de internet",
  trabajoRemoto: "Trabajo remoto",
  puntuacionTecnologica: "Puntuación tecnológica",
};

type PropiedadesRankingPaises = {
  indicador: IndicadorMapa;
  alSeleccionarPais: (pais: Pais) => void;
};

function formatearValor(indicador: IndicadorMapa, valor: number) {
  if (indicador === "salarioMedioUsd") {
    return formatoSalario.format(valor);
  }

  if (indicador === "velocidadInternetMbps") {
    return `${valor} Mbps`;
  }

  if (indicador === "trabajoRemoto" || indicador === "puntuacionTecnologica") {
    return `${valor}/100`;
  }

  return formatoNumero.format(valor);
}

export function RankingPaises({ indicador, alSeleccionarPais }: PropiedadesRankingPaises) {
  const ranking = [...paises]
    .sort((primerPais, segundoPais) => {
      return segundoPais.indicadores[indicador] - primerPais.indicadores[indicador];
    })
    .slice(0, 3);

  return (
    <section className="mt-4 rounded-2xl border border-border bg-card/70 p-4">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Ranking actual
      </p>
      <h2 className="mt-1 text-sm font-medium text-foreground">
        {etiquetasIndicadores[indicador]}
      </h2>
      <ol className="mt-3 space-y-1">
        {ranking.map((pais, indice) => (
          <li key={pais.codigo}>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-secondary"
              onClick={() => alSeleccionarPais(pais)}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
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
          </li>
        ))}
      </ol>
    </section>
  );
}
