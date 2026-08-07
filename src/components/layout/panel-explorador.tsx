"use client";

import { BarChart3, Building2, CircleDollarSign, Cpu, GraduationCap, Wifi } from "lucide-react";

import { ResumenPais } from "@/components/paises/resumen-pais";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

const indicadores = [
  {
    icono: CircleDollarSign,
    indicador: "salarioMedioUsd",
    etiqueta: "Salarios",
    descripcion: "Ingeniería de software",
  },
  {
    icono: Building2,
    indicador: "empresasTecnologicas",
    etiqueta: "Empresas",
    descripcion: "Tecnología y startups",
  },
  {
    icono: Cpu,
    indicador: "empresasIa",
    etiqueta: "Inteligencia artificial",
    descripcion: "Ecosistema de IA",
  },
  {
    icono: Wifi,
    indicador: "velocidadInternetMbps",
    etiqueta: "Conectividad",
    descripcion: "Velocidad de internet",
  },
  {
    icono: GraduationCap,
    indicador: "trabajoRemoto",
    etiqueta: "Trabajo remoto",
    descripcion: "Flexibilidad laboral",
  },
  {
    icono: BarChart3,
    indicador: "puntuacionTecnologica",
    etiqueta: "Puntuación",
    descripcion: "Madurez tecnológica",
  },
] as const;

type PropiedadesPanelExplorador = {
  paisSeleccionado: Pais | null;
  indicadorActivo: IndicadorMapa;
  alSeleccionarIndicador: (indicador: IndicadorMapa) => void;
};

export function PanelExplorador({
  paisSeleccionado,
  indicadorActivo,
  alSeleccionarIndicador,
}: PropiedadesPanelExplorador) {
  return (
    <aside className="w-full border-b border-border bg-card/30 p-4 md:min-h-[calc(100dvh-4rem)] md:w-80 md:border-r md:border-b-0 md:p-5">
      <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-2xl shadow-black/10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Explorador</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight">Indicadores globales</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Analizo los datos que definen cada ecosistema tecnológico.
        </p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2 md:grid-cols-1">
          {indicadores.map((indicador) => {
            const Icono = indicador.icono;

            return (
              <li key={indicador.indicador}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors ${
                    indicadorActivo === indicador.indicador
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60"
                  }`}
                  onClick={() => alSeleccionarIndicador(indicador.indicador)}
                  aria-pressed={indicadorActivo === indicador.indicador}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background/60 text-primary">
                    <Icono className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {indicador.etiqueta}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {indicador.descripcion}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {paisSeleccionado ? (
        <ResumenPais pais={paisSeleccionado} />
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/40 p-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Próximo paso
          </p>
          <p className="mt-2 text-sm leading-5 text-foreground">
            Selecciono un país en el mapa para consultar su perfil tecnológico.
          </p>
        </div>
      )}
    </aside>
  );
}
