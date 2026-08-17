"use client";

import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";
import { Filter, Info, Sparkles } from "lucide-react";
import { paises } from "@/data/paises";
import { type Continente, type Pais, calcularPoderAdquisitivo } from "@/types/pais";

const COLORES_CONTINENTES: Record<Continente, string> = {
  Europa: "#31d0aa",
  Norteamérica: "#60a5fa",
  Sudamérica: "#fbbf24",
  Asia: "#a78bfa",
  África: "#fb7185",
  Oceanía: "#38bdf8",
};

const formatoSalario = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

type PropiedadesMatrizPoderAdquisitivo = {
  alSeleccionarPais: (pais: Pais) => void;
  alAbrirInformePais?: (pais: Pais) => void;
};

export function MatrizPoderAdquisitivo({
  alSeleccionarPais,
  alAbrirInformePais,
}: PropiedadesMatrizPoderAdquisitivo) {
  const [continenteFiltro, setContinenteFiltro] = useState<Continente | "Todos">("Todos");

  const paisesFiltrados =
    continenteFiltro === "Todos" ? paises : paises.filter((p) => p.continente === continenteFiltro);

  const datosGrafico = paisesFiltrados.map((p) => ({
    pais: p,
    nombre: p.nombre,
    codigo: p.codigo,
    continente: p.continente,
    xCoste: p.indicadores.costeDeVida,
    ySalario: p.indicadores.salarioMedioUsd,
    zPuntuacion: p.indicadores.puntuacionTecnologica,
    poderAdquisitivo: calcularPoderAdquisitivo(p),
  }));

  const continentes: (Continente | "Todos")[] = [
    "Todos",
    "Europa",
    "Norteamérica",
    "Sudamérica",
    "Asia",
    "África",
    "Oceanía",
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background p-4 sm:p-6">
      {/* Cabecera de la matriz */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Matriz de Valor Developer
            </p>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Referencia Salarial vs Coste de Vida
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Encuentra el &quot;Sweet Spot&quot; de mayor poder adquisitivo para ingenieros de
            software.
          </p>
        </div>

        {/* Filtro por continente */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card/60 p-1.5">
          <Filter className="ml-2 size-3.5 text-muted-foreground" />
          {continentes.map((cont) => (
            <button
              key={cont}
              type="button"
              onClick={() => setContinenteFiltro(cont)}
              className={`rounded-xl px-2.5 py-1 text-xs font-medium transition-all ${
                continenteFiltro === cont
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cont}
            </button>
          ))}
        </div>
      </div>

      {/* Leyenda de cuadrantes */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-xs">
          <p className="font-bold text-primary">🟢 Paraíso Developer</p>
          <p className="text-[0.7rem] text-muted-foreground">Alto salario + Bajo coste de vida</p>
        </div>
        <div className="rounded-xl border border-chart-2/30 bg-chart-2/10 p-2.5 text-xs">
          <p className="font-bold text-chart-2">🔵 Mercado Maduro</p>
          <p className="text-[0.7rem] text-muted-foreground">Alto salario + Alto coste de vida</p>
        </div>
        <div className="rounded-xl border border-chart-3/30 bg-chart-3/10 p-2.5 text-xs">
          <p className="font-bold text-chart-3">🟡 Ecosistema Emergente</p>
          <p className="text-[0.7rem] text-muted-foreground">Bajo salario + Bajo coste de vida</p>
        </div>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-2.5 text-xs">
          <p className="font-bold text-destructive">🔴 Mercado Desfavorable</p>
          <p className="text-[0.7rem] text-muted-foreground">Bajo salario + Alto coste de vida</p>
        </div>
      </div>

      {/* Gráfico de Dispersión Scatter Plot */}
      <div className="mt-4 flex-1 min-h-[28rem] rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-md">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <XAxis
              type="number"
              dataKey="xCoste"
              name="Coste de Vida"
              domain={[10, 100]}
              tick={{ fill: "#93a4ba", fontSize: 11 }}
              unit="/100"
              label={{
                value: "Coste de Vida (Índice 0-100) →",
                position: "insideBottom",
                offset: -10,
                fill: "#93a4ba",
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="ySalario"
              name="Referencia Salarial"
              domain={[0, 160000]}
              tick={{ fill: "#93a4ba", fontSize: 11 }}
              tickFormatter={(v) => `$${v / 1000}k`}
              label={{
                value: "↑ Referencia Salarial (USD)",
                angle: -90,
                position: "insideLeft",
                fill: "#93a4ba",
                fontSize: 11,
              }}
            />
            <ZAxis type="number" dataKey="zPuntuacion" range={[120, 600]} name="Puntuación Tech" />

            {/* Líneas divisorias de cuadrantes */}
            <ReferenceLine
              x={55}
              stroke="#ffffff26"
              strokeDasharray="4 4"
              label={{
                value: "Coste medio",
                fill: "#93a4ba",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />
            <ReferenceLine
              y={65000}
              stroke="#ffffff26"
              strokeDasharray="4 4"
              label={{
                value: "Ref. salarial media mundial",
                fill: "#93a4ba",
                fontSize: 10,
                position: "insideTopRight",
              }}
            />

            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const data = payload[0].payload;
                const p: Pais = data.pais;

                return (
                  <div className="rounded-2xl border border-border bg-card/95 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{p.nombre}</span>
                      <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[0.65rem] font-semibold text-primary">
                        {p.continente}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1 text-xs">
                      <p className="text-muted-foreground">
                        Ref. salarial:{" "}
                        <span className="font-semibold text-foreground">
                          {formatoSalario.format(p.indicadores.salarioMedioUsd)}
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        Coste vida:{" "}
                        <span className="font-semibold text-foreground">
                          {p.indicadores.costeDeVida}/100
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        Poder Adquisitivo Score:{" "}
                        <span className="font-semibold text-primary">
                          {data.poderAdquisitivo}/100
                        </span>
                      </p>
                    </div>
                    <p className="mt-2 text-[0.65rem] text-primary">
                      Haz clic para seleccionar este país
                    </p>
                  </div>
                );
              }}
            />

            <Scatter
              data={datosGrafico}
              onClick={(entry) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const paisPoint = (entry as any)?.payload?.pais || (entry as any)?.pais;
                if (paisPoint) {
                  alSeleccionarPais(paisPoint);
                  if (alAbrirInformePais) {
                    alAbrirInformePais(paisPoint);
                  }
                }
              }}
              className="cursor-pointer"
            >
              {datosGrafico.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORES_CONTINENTES[entry.continente as Continente] || "#31d0aa"}
                  stroke="#ffffff40"
                  strokeWidth={1.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="size-4 text-primary" />
        <span>
          El tamaño de cada burbuja representa la madurez tecnológica del país. Haz clic en
          cualquier burbuja para ver su informe completo.
        </span>
      </div>
    </div>
  );
}
