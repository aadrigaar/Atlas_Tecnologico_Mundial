"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  Building2,
  Cpu,
  Wifi,
  Briefcase,
  Plane,
  CheckCircle2,
  XCircle,
  Award,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

import { RadarPerfilTecnologico } from "@/components/graficos/radar-perfil-tecnologico";
import { Button } from "@/components/ui/button";
import { type Pais, calcularPoderAdquisitivo } from "@/types/pais";

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

type PestañaModal = "general" | "salarios" | "hubs" | "calidad";

type PropiedadesModalInformePais = {
  pais: Pais | null;
  alCerrar: () => void;
  estaComparado: boolean;
  limiteComparadorAlcanzado: boolean;
  alAlternarComparacion: (pais: Pais) => void;
};

export function ModalInformePais({
  pais,
  alCerrar,
  estaComparado,
  limiteComparadorAlcanzado,
  alAlternarComparacion,
}: PropiedadesModalInformePais) {
  const [pestañaActiva, setPestañaActiva] = useState<PestañaModal>("general");

  if (!pais) return null;

  const poderAdquisitivo = calcularPoderAdquisitivo(pais);

  const datosSalariosGrafico = [
    {
      nivel: "Junior (0-2 yrs)",
      salario: pais.ecosistema.salariosPorNivel.junior,
      color: "#60a5fa",
    },
    { nivel: "Mid (2-5 yrs)", salario: pais.ecosistema.salariosPorNivel.mid, color: "#31d0aa" },
    {
      nivel: "Senior (5-8 yrs)",
      salario: pais.ecosistema.salariosPorNivel.senior,
      color: "#fbbf24",
    },
    {
      nivel: "Lead / Arch (8+ yrs)",
      salario: pais.ecosistema.salariosPorNivel.lead,
      color: "#a78bfa",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={alCerrar}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
          className="relative flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* Header del Modal */}
          <div className="flex flex-col border-b border-border bg-card/80 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary text-xl font-bold">
                  {pais.codigoIso2}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                      {pais.continente}
                    </span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                      Capital: {pais.capital}
                    </span>
                  </div>
                  <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {pais.nombre}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant={estaComparado ? "secondary" : "outline"}
                  size="sm"
                  disabled={!estaComparado && limiteComparadorAlcanzado}
                  onClick={() => alAlternarComparacion(pais)}
                >
                  {estaComparado
                    ? "En comparación"
                    : limiteComparadorAlcanzado
                      ? "Comparador lleno"
                      : "+ Comparar"}
                </Button>
                <button
                  type="button"
                  onClick={alCerrar}
                  className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Cerrar modal"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Pestañas de Navegación del Modal */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-border/60 pt-4">
              {[
                { id: "general", etiqueta: "Vista General", icono: Globe },
                { id: "salarios", etiqueta: "Salarios por Experiencia", icono: Briefcase },
                { id: "hubs", etiqueta: "Hubs & Empresas", icono: Building2 },
                { id: "calidad", etiqueta: "Calidad de Vida & Remoto", icono: Plane },
              ].map(({ id, etiqueta, icono: Icono }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPestañaActiva(id as PestañaModal)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                    pestañaActiva === id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icono className="size-4" />
                  {etiqueta}
                </button>
              ))}
            </div>
          </div>

          {/* Cuerpo del Modal */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {pestañaActiva === "general" && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Tarjetas resumen */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Salario Medio</p>
                      <p className="mt-1 text-lg font-bold text-foreground">
                        {formatoSalario.format(pais.indicadores.salarioMedioUsd)}
                      </p>
                      <span className="mt-1 inline-block text-[0.65rem] text-primary">
                        anual bruto
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Puntuación Tech</p>
                      <p className="mt-1 text-lg font-bold text-primary">
                        {pais.indicadores.puntuacionTecnologica}/100
                      </p>
                      <span className="mt-1 inline-block text-[0.65rem] text-muted-foreground">
                        Madurez ecosistema
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Poder Adquisitivo</p>
                      <p className="mt-1 text-lg font-bold text-chart-2">{poderAdquisitivo}/100</p>
                      <span className="mt-1 inline-block text-[0.65rem] text-muted-foreground">
                        Salario vs Coste
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Velocidad Internet</p>
                      <p className="mt-1 text-lg font-bold text-chart-3">
                        {pais.indicadores.velocidadInternetMbps} Mbps
                      </p>
                      <span className="mt-1 inline-block text-[0.65rem] text-muted-foreground">
                        Banda ancha media
                      </span>
                    </div>
                  </div>

                  {/* Grid de 2 columnas: Radar y Métricas */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                      <h3 className="text-sm font-semibold text-foreground">
                        Perfil Tecnológico Relativo
                      </h3>
                      <RadarPerfilTecnologico pais={pais} />
                    </div>

                    <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-border bg-secondary/20 p-4">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Indicadores Clave</h3>
                        <dl className="mt-3 space-y-2.5 text-xs">
                          <div className="flex justify-between border-b border-border/50 pb-2">
                            <dt className="text-muted-foreground">Empresas Tecnológicas</dt>
                            <dd className="font-semibold text-foreground">
                              {formatoNumero.format(pais.indicadores.empresasTecnologicas)}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b border-border/50 pb-2">
                            <dt className="text-muted-foreground">Empresas de IA</dt>
                            <dd className="font-semibold text-foreground">
                              {formatoNumero.format(pais.indicadores.empresasIa)}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b border-border/50 pb-2">
                            <dt className="text-muted-foreground">Índice Trabajo Remoto</dt>
                            <dd className="font-semibold text-primary">
                              {pais.indicadores.trabajoRemoto}/100
                            </dd>
                          </div>
                          <div className="flex justify-between border-b border-border/50 pb-2">
                            <dt className="text-muted-foreground">Índice Coste de Vida</dt>
                            <dd className="font-semibold text-foreground">
                              {pais.indicadores.costeDeVida}/100
                            </dd>
                          </div>
                          <div className="flex justify-between pb-1">
                            <dt className="text-muted-foreground">Impuesto Estimado (IRPF)</dt>
                            <dd className="font-semibold text-chart-4">
                              ~{pais.ecosistema.impuestosAproximadosPorcentaje}%
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-xl border border-primary/20 bg-primary/10 p-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                          <Award className="size-4" />
                          <span>Puntos fuertes del ecosistema</span>
                        </div>
                        <p className="mt-1 text-[0.75rem] text-muted-foreground">
                          Destaca por su{" "}
                          {pais.indicadores.velocidadInternetMbps > 180
                            ? "excelente infraestructura de internet"
                            : "atractivo coste de vida"}{" "}
                          y su comunidad de {pais.ecosistema.hubsPrincipales.join(", ")}.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {pestañaActiva === "salarios" && (
                <motion.div
                  key="salarios"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                    <h3 className="text-base font-semibold text-foreground">
                      Desglose Salarial por Nivel de Experiencia (USD / año)
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Estimación bruta anual basada en salarios promedios para perfiles de
                      ingeniería de software.
                    </p>

                    <div className="mt-6 h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={datosSalariosGrafico}
                          layout="vertical"
                          margin={{ left: 40, right: 20 }}
                        >
                          <XAxis
                            type="number"
                            tick={{ fill: "#93a4ba", fontSize: 11 }}
                            tickFormatter={(val) => `$${val / 1000}k`}
                          />
                          <YAxis
                            type="category"
                            dataKey="nivel"
                            tick={{ fill: "#e7edf6", fontSize: 11 }}
                            width={120}
                          />
                          <Tooltip
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => [
                              `$${Number(value || 0).toLocaleString()} USD / año`,
                              "Salario medio",
                            ]}
                            contentStyle={{
                              backgroundColor: "#0d1a2e",
                              borderColor: "#ffffff1a",
                              borderRadius: "0.75rem",
                            }}
                          />
                          <Bar dataKey="salario" radius={[0, 8, 8, 0]} barSize={24}>
                            {datosSalariosGrafico.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Tabla de Niveles */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {datosSalariosGrafico.map((item) => {
                      const netoEstimado = Math.round(
                        item.salario * (1 - pais.ecosistema.impuestosAproximadosPorcentaje / 100),
                      );
                      return (
                        <div
                          key={item.nivel}
                          className="rounded-2xl border border-border bg-secondary/30 p-4"
                        >
                          <p className="text-xs font-semibold text-muted-foreground">
                            {item.nivel}
                          </p>
                          <p className="mt-2 text-xl font-bold" style={{ color: item.color }}>
                            ${item.salario.toLocaleString()}
                          </p>
                          <p className="mt-1 text-[0.7rem] text-muted-foreground">Bruto / año</p>
                          <div className="mt-3 border-t border-border/50 pt-2 text-[0.75rem]">
                            <span className="text-muted-foreground">Neto aprox: </span>
                            <span className="font-semibold text-foreground">
                              ${netoEstimado.toLocaleString()}/año
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {pestañaActiva === "hubs" && (
                <motion.div
                  key="hubs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Hubs */}
                    <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                      <div className="flex items-center gap-2 text-primary">
                        <Building2 className="size-5" />
                        <h3 className="text-base font-semibold text-foreground">
                          Principales Ciudades Tech (Hubs)
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Polos de innovación y concentración de talento en {pais.nombre}.
                      </p>

                      <ul className="mt-4 space-y-2">
                        {pais.ecosistema.hubsPrincipales.map((hub, idx) => (
                          <li
                            key={hub}
                            className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3 text-sm font-medium text-foreground"
                          >
                            <span className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                              {idx + 1}
                            </span>
                            <span>{hub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Empresas */}
                    <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                      <div className="flex items-center gap-2 text-chart-2">
                        <Cpu className="size-5" />
                        <h3 className="text-base font-semibold text-foreground">
                          Empresas & Unicornios Emblemáticos
                        </h3>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Empresas tecnológicas destacadas nacidas u operando en {pais.nombre}.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {pais.ecosistema.empresasDestacadas.map((emp) => (
                          <span
                            key={emp}
                            className="rounded-xl border border-border bg-background/60 px-3 py-2 text-xs font-semibold text-foreground"
                          >
                            🚀 {emp}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 rounded-xl border border-border bg-background/30 p-3 text-xs">
                        <span className="text-muted-foreground">Empresas Tech Totales: </span>
                        <span className="font-bold text-primary">
                          {pais.indicadores.empresasTecnologicas.toLocaleString()}
                        </span>
                        <br />
                        <span className="text-muted-foreground">Empresas de IA: </span>
                        <span className="font-bold text-chart-2">
                          {pais.indicadores.empresasIa.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {pestañaActiva === "calidad" && (
                <motion.div
                  key="calidad"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Visa Nómada Digital */}
                    <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-primary">
                          <Plane className="size-5" />
                          <h3 className="text-sm font-semibold text-foreground">
                            Visa para Nómadas Digitales
                          </h3>
                        </div>
                        {pais.ecosistema.visaNomadaDigital ? (
                          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            <CheckCircle2 className="size-3.5" /> Disponible
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                            <XCircle className="size-3.5" /> No específica
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        {pais.ecosistema.visaNomadaDigital
                          ? `${pais.nombre} cuenta con visados específicos para profesionales remotos y trabajadores de tecnología.`
                          : `${pais.nombre} no dispone de un visado específico para nómadas digitales, aunque se aplican los visados estándar de trabajo o residencia.`}
                      </p>
                    </div>

                    {/* Trabajo Remoto */}
                    <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-chart-3">
                          <Wifi className="size-5" />
                          <h3 className="text-sm font-semibold text-foreground">
                            Adopción de Trabajo Remoto
                          </h3>
                        </div>
                        <span className="rounded-full bg-chart-3/10 px-2.5 py-1 text-xs font-semibold text-chart-3">
                          {pais.indicadores.trabajoRemoto}/100
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                        Nivel de flexibilidad laboral y oferta de puestos en modalidad remota o
                        híbrida en las empresas locales.
                      </p>
                    </div>
                  </div>

                  {/* Resumen de Calidad de Vida */}
                  <div className="rounded-2xl border border-border bg-secondary/20 p-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      Análisis de Calidad de Vida vs Coste de Vida
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-border bg-background/40 p-3">
                        <p className="text-[0.7rem] text-muted-foreground">
                          Índice de Coste de Vida
                        </p>
                        <p className="mt-1 text-lg font-bold text-foreground">
                          {pais.indicadores.costeDeVida}/100
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-background/40 p-3">
                        <p className="text-[0.7rem] text-muted-foreground">Banda Ancha Media</p>
                        <p className="mt-1 text-lg font-bold text-foreground">
                          {pais.indicadores.velocidadInternetMbps} Mbps
                        </p>
                      </div>
                      <div className="rounded-xl border border-border bg-background/40 p-3">
                        <p className="text-[0.7rem] text-muted-foreground">
                          Retención de Salario Neto
                        </p>
                        <p className="mt-1 text-lg font-bold text-primary">
                          ~{100 - pais.ecosistema.impuestosAproximadosPorcentaje}%
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
