"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Building2, CircleDollarSign, Cpu, Laptop, Wifi } from "lucide-react";

import { ResumenPais } from "@/components/paises/resumen-pais";
import { RankingPaises } from "@/components/paises/ranking-paises";
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
    icono: Laptop,
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
  paisesComparados: Pais[];
  alAlternarPaisComparado: (pais: Pais) => void;
  alSeleccionarPais: (pais: Pais) => void;
  alAbrirInformePais?: (pais: Pais) => void;
};

export function PanelExplorador({
  paisSeleccionado,
  indicadorActivo,
  alSeleccionarIndicador,
  paisesComparados,
  alAlternarPaisComparado,
  alSeleccionarPais,
  alAbrirInformePais,
}: PropiedadesPanelExplorador) {
  return (
    <aside className="flex w-full flex-col gap-4 overflow-y-auto border-b border-border bg-card/30 p-4 md:min-h-[calc(100dvh-4rem)] md:w-80 md:border-r md:border-b-0 md:p-5">
      {/* Selector de indicadores */}
      <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-2xl shadow-black/10">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Explorador</p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight">Indicadores globales</h2>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Datos que definen cada ecosistema tecnológico.
        </p>

        {paisesComparados.length > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1.5">
            <div className="size-1.5 rounded-full bg-primary" />
            <p className="text-xs font-medium text-primary">
              Comparador: {paisesComparados.length}/3 países
            </p>
          </div>
        )}

        <ul className="mt-5 grid gap-1.5 sm:grid-cols-2 md:grid-cols-1">
          {indicadores.map((indicador) => {
            const Icono = indicador.icono;
            const activo = indicadorActivo === indicador.indicador;

            return (
              <li key={indicador.indicador}>
                <button
                  type="button"
                  className={`relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all duration-200 ${
                    activo
                      ? "bg-secondary text-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                  onClick={() => alSeleccionarIndicador(indicador.indicador)}
                  aria-pressed={activo}
                >
                  {activo && (
                    <motion.div
                      layoutId="indicador-activo"
                      className="absolute inset-0 rounded-xl border border-primary/20 bg-primary/5"
                      transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-background/60 text-primary">
                    <Icono className="size-4" aria-hidden="true" />
                  </span>
                  <span className="relative min-w-0">
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

      {/* Ranking */}
      <RankingPaises indicador={indicadorActivo} alSeleccionarPais={alSeleccionarPais} />

      {/* Resumen del país o estado vacío */}
      <AnimatePresence mode="wait">
        {paisSeleccionado ? (
          <motion.div
            key={paisSeleccionado.codigo}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ResumenPais
              pais={paisSeleccionado}
              estaComparado={paisesComparados.some(
                (pais) => pais.codigo === paisSeleccionado.codigo,
              )}
              limiteComparadorAlcanzado={paisesComparados.length === 3}
              alAlternarComparacion={alAlternarPaisComparado}
              alAbrirInforme={alAbrirInformePais}
            />
          </motion.div>
        ) : (
          <motion.div
            key="estado-vacio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-border bg-secondary/40 p-4"
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Próximo paso
            </p>
            <p className="mt-2 text-sm leading-5 text-foreground">
              Selecciona un país en el mapa para consultar su perfil tecnológico.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
