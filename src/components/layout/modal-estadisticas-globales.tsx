"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, PieChart as PieIcon, Award, Building2, Wifi } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import { paises } from "@/data/paises";
import type { Continente, Pais } from "@/types/pais";

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

const formatoNumero = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});

type PropiedadesModalEstadisticasGlobales = {
  abierto: boolean;
  alCerrar: () => void;
  alSeleccionarPais: (pais: Pais) => void;
};

export function ModalEstadisticasGlobales({
  abierto,
  alCerrar,
  alSeleccionarPais,
}: PropiedadesModalEstadisticasGlobales) {
  if (!abierto) return null;

  // Métricas agregadas
  const salarioMedioGlobal = Math.round(
    paises.reduce((acc, p) => acc + p.indicadores.salarioMedioUsd, 0) / paises.length,
  );

  const totalEmpresasTech = paises.reduce((acc, p) => acc + p.indicadores.empresasTecnologicas, 0);
  const totalEmpresasIa = paises.reduce((acc, p) => acc + p.indicadores.empresasIa, 0);

  const paisesConVisaNomada = paises.filter((p) => p.ecosistema.visaNomadaDigital).length;
  const porcentajeVisaNomada = Math.round((paisesConVisaNomada / paises.length) * 100);

  // Distribución por Continente para Donut Chart
  const continentesUnicos: Continente[] = [
    "Europa",
    "Norteamérica",
    "Sudamérica",
    "Asia",
    "África",
    "Oceanía",
  ];

  const datosDistribucionContinente = continentesUnicos.map((c) => {
    const sumEmpresas = paises
      .filter((p) => p.continente === c)
      .reduce((acc, p) => acc + p.indicadores.empresasTecnologicas, 0);
    return {
      name: c,
      value: sumEmpresas,
      color: COLORES_CONTINENTES[c],
    };
  });

  // Top 8 Velocidad de Internet
  const datosTopInternet = [...paises]
    .sort((a, b) => b.indicadores.velocidadInternetMbps - a.indicadores.velocidadInternetMbps)
    .slice(0, 8)
    .map((p) => ({
      nombre: p.nombre,
      velocidad: p.indicadores.velocidadInternetMbps,
      pais: p,
    }));

  // Top 5 Salario
  const topSalario = [...paises]
    .sort((a, b) => b.indicadores.salarioMedioUsd - a.indicadores.salarioMedioUsd)
    .slice(0, 5);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={alCerrar}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-card/80 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <PieIcon className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Analítica Global
                </p>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Insights del Ecosistema Tecnológico Mundial
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={alCerrar}
              className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Cerrar estadísticas globales"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">Salario Medio Global</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatoSalario.format(salarioMedioGlobal)}
                </p>
                <span className="mt-1 inline-block text-[0.68rem] text-primary">
                  Promedio 32 países
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">Empresas Tech Totales</p>
                <p className="mt-1 text-lg font-bold text-chart-2">
                  {formatoNumero.format(totalEmpresasTech)}
                </p>
                <span className="mt-1 inline-block text-[0.68rem] text-muted-foreground">
                  Censo global
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">Empresas de IA</p>
                <p className="mt-1 text-lg font-bold text-chart-4">
                  {formatoNumero.format(totalEmpresasIa)}
                </p>
                <span className="mt-1 inline-block text-[0.68rem] text-muted-foreground">
                  Firma IA identificadas
                </span>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs text-muted-foreground">Visa Nómada Digital</p>
                <p className="mt-1 text-lg font-bold text-primary">{porcentajeVisaNomada}%</p>
                <span className="mt-1 inline-block text-[0.68rem] text-muted-foreground">
                  {paisesConVisaNomada} de 32 países
                </span>
              </div>
            </div>

            {/* Grid 2 Columnas: Donut Chart + Top Salarios */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Donut Chart */}
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Building2 className="size-4" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Distribución de Empresas Tech por Continente
                  </h3>
                </div>

                <div className="mt-4 h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={datosDistribucionContinente}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {datosDistribucionContinente.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(val: any) => [
                          formatoNumero.format(Number(val || 0)),
                          "Empresas Tech",
                        ]}
                        contentStyle={{
                          backgroundColor: "#0d1a2e",
                          borderColor: "#ffffff1a",
                          borderRadius: "0.75rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs">
                  {datosDistribucionContinente.map((c) => (
                    <span key={c.name} className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Top 5 Salarios Leaderboard */}
              <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                <div className="flex items-center gap-2 text-chart-2">
                  <Award className="size-4" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Líderes Globales en Salario Bruto
                  </h3>
                </div>

                <ol className="mt-4 space-y-2">
                  {topSalario.map((p, idx) => (
                    <li key={p.codigo}>
                      <button
                        type="button"
                        onClick={() => {
                          alSeleccionarPais(p);
                          alCerrar();
                        }}
                        className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-card/60 p-2.5 text-left text-xs transition-colors hover:bg-secondary"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{p.nombre}</p>
                            <p className="text-[0.65rem] text-muted-foreground">{p.continente}</p>
                          </div>
                        </div>
                        <span className="font-bold text-primary">
                          {formatoSalario.format(p.indicadores.salarioMedioUsd)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Gráfico de Barras: Líderes en Velocidad de Internet */}
            <div className="rounded-2xl border border-border bg-secondary/20 p-5">
              <div className="flex items-center gap-2 text-chart-3">
                <Wifi className="size-4" />
                <h3 className="text-sm font-semibold text-foreground">
                  Top 8 Países con Mayor Velocidad de Internet (Mbps)
                </h3>
              </div>

              <div className="mt-5 h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={datosTopInternet}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <XAxis dataKey="nombre" tick={{ fill: "#93a4ba", fontSize: 11 }} />
                    <YAxis
                      tick={{ fill: "#93a4ba", fontSize: 11 }}
                      tickFormatter={(v) => `${v}m`}
                    />
                    <Tooltip
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      formatter={(val: any) => [`${val} Mbps`, "Banda Ancha Media"]}
                      contentStyle={{
                        backgroundColor: "#0d1a2e",
                        borderColor: "#ffffff1a",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="velocidad" fill="#31d0aa" radius={[6, 6, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
