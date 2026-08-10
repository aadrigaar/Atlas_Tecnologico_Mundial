"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scale, Award, Copy, Check, Briefcase, Layers, Sparkles } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import { type Pais, calcularPoderAdquisitivo } from "@/types/pais";

const COLORES_PAISES = ["#31d0aa", "#60a5fa", "#fbbf24"];

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

type PropiedadesModalComparadorAvanzado = {
  paises: Pais[];
  alCerrar: () => void;
  alAlternarComparacion: (pais: Pais) => void;
  alMostrarNotificacion?: (mensaje: string) => void;
};

export function ModalComparadorAvanzado({
  paises,
  alCerrar,
  alAlternarComparacion,
  alMostrarNotificacion,
}: PropiedadesModalComparadorAvanzado) {
  const [copiado, setCopiado] = useState(false);
  const [pestañaActiva, setPestañaActiva] = useState<"resumen" | "radar" | "salarios">("resumen");

  if (paises.length === 0) return null;

  // País con mejor puntuación tecnológica
  const paisGanadorScore = [...paises].sort(
    (a, b) => b.indicadores.puntuacionTecnologica - a.indicadores.puntuacionTecnologica,
  )[0];

  // Datos para Radar Chart superpuesto
  const datosRadarSuperpuesto = [
    {
      indicador: "Puntuación Tech",
      ...paises.reduce(
        (acc, p) => ({ ...acc, [p.nombre]: p.indicadores.puntuacionTecnologica }),
        {},
      ),
    },
    {
      indicador: "Trabajo Remoto",
      ...paises.reduce((acc, p) => ({ ...acc, [p.nombre]: p.indicadores.trabajoRemoto }), {}),
    },
    {
      indicador: "Velocidad Internet",
      ...paises.reduce(
        (acc, p) => ({
          ...acc,
          [p.nombre]: Math.min(100, Math.round(p.indicadores.velocidadInternetMbps / 3)),
        }),
        {},
      ),
    },
    {
      indicador: "Poder Adquisitivo",
      ...paises.reduce((acc, p) => ({ ...acc, [p.nombre]: calcularPoderAdquisitivo(p) }), {}),
    },
    {
      indicador: "Salario Relativo",
      ...paises.reduce(
        (acc, p) => ({
          ...acc,
          [p.nombre]: Math.min(100, Math.round((p.indicadores.salarioMedioUsd / 150000) * 100)),
        }),
        {},
      ),
    },
    {
      indicador: "Ecosistema IA",
      ...paises.reduce(
        (acc, p) => ({
          ...acc,
          [p.nombre]: Math.min(100, Math.round((p.indicadores.empresasIa / 13000) * 100)),
        }),
        {},
      ),
    },
  ];

  // Datos para gráfico comparativo de salarios por experiencia
  const datosSalariosExperiencia = [
    {
      nivel: "Junior",
      ...paises.reduce(
        (acc, p) => ({ ...acc, [p.nombre]: p.ecosistema.salariosPorNivel.junior }),
        {},
      ),
    },
    {
      nivel: "Mid",
      ...paises.reduce((acc, p) => ({ ...acc, [p.nombre]: p.ecosistema.salariosPorNivel.mid }), {}),
    },
    {
      nivel: "Senior",
      ...paises.reduce(
        (acc, p) => ({ ...acc, [p.nombre]: p.ecosistema.salariosPorNivel.senior }),
        {},
      ),
    },
    {
      nivel: "Lead / Arch",
      ...paises.reduce(
        (acc, p) => ({ ...acc, [p.nombre]: p.ecosistema.salariosPorNivel.lead }),
        {},
      ),
    },
  ];

  const copiarResumen = () => {
    const texto =
      `=== COMPARATIVA ATLAS TECNOLÓGICO MUNDIAL ===\n\n` +
      paises
        .map(
          (p) =>
            `📌 ${p.nombre} (${p.continente})\n` +
            `• Salario Medio: ${formatoSalario.format(p.indicadores.salarioMedioUsd)}\n` +
            `• Puntuación Tech: ${p.indicadores.puntuacionTecnologica}/100\n` +
            `• Poder Adquisitivo: ${calcularPoderAdquisitivo(p)}/100\n` +
            `• Internet: ${p.indicadores.velocidadInternetMbps} Mbps\n` +
            `• Hubs: ${p.ecosistema.hubsPrincipales.join(", ")}\n`,
        )
        .join("\n");

    navigator.clipboard.writeText(texto);
    setCopiado(true);
    if (alMostrarNotificacion) {
      alMostrarNotificacion("Comparativa copiada al portapapeles");
    }
    setTimeout(() => setCopiado(false), 2500);
  };

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
          className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex flex-col border-b border-border bg-card/80 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                  <Scale className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                      Comparativo Avanzado
                    </span>
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[0.68rem] font-bold text-primary">
                      {paises.length} Países Seleccionados
                    </span>
                  </div>
                  <h2 className="mt-0.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {paises.map((p) => p.nombre).join(" vs ")}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={copiarResumen}>
                  {copiado ? (
                    <>
                      <Check className="mr-1.5 size-4 text-primary" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 size-4" /> Copiar Resumen
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  onClick={alCerrar}
                  className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Cerrar comparador"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Pestañas internas */}
            <div className="mt-5 flex gap-2 border-t border-border/60 pt-4">
              {[
                { id: "resumen", etiqueta: "Tabla Comparativa", icono: Layers },
                { id: "radar", etiqueta: "Radar de Perfiles", icono: Sparkles },
                { id: "salarios", etiqueta: "Salarios por Nivel", icono: Briefcase },
              ].map(({ id, etiqueta, icono: Icono }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPestañaActiva(id as "resumen" | "radar" | "salarios")}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                    pestañaActiva === id
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icono className="size-4" />
                  {etiqueta}
                </button>
              ))}
            </div>
          </div>

          {/* Banner de Ganador */}
          <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-6 py-2.5 text-xs">
            <div className="flex items-center gap-2">
              <Award className="size-4 text-primary" />
              <span className="text-muted-foreground">Mayor Puntuación Tecnológica: </span>
              <span className="font-bold text-foreground">
                {paisGanadorScore.nombre} ({paisGanadorScore.indicadores.puntuacionTecnologica}/100)
              </span>
            </div>
            <span className="text-[0.7rem] text-muted-foreground hidden sm:inline">
              Puedes comparar hasta 3 países simultáneamente
            </span>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {pestañaActiva === "resumen" && (
                <motion.div
                  key="resumen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="overflow-x-auto rounded-2xl border border-border bg-card/40">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border bg-background/50 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Indicador / Métrica</th>
                          {paises.map((p, idx) => (
                            <th
                              key={p.codigo}
                              className="px-4 py-3 font-bold"
                              style={{ color: COLORES_PAISES[idx] }}
                            >
                              <div className="flex items-center justify-between">
                                <span>{p.nombre}</span>
                                <button
                                  type="button"
                                  onClick={() => alAlternarComparacion(p)}
                                  className="text-[0.65rem] font-normal text-muted-foreground hover:text-destructive"
                                >
                                  Quitar
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Salario Medio Bruto (USD)
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-bold text-foreground">
                              {formatoSalario.format(p.indicadores.salarioMedioUsd)}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Score Tecnológico
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-bold text-primary">
                              {p.indicadores.puntuacionTecnologica}/100
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Poder Adquisitivo Real
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-semibold text-chart-2">
                              {calcularPoderAdquisitivo(p)}/100
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Empresas Tecnológicas
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-foreground">
                              {formatoNumero.format(p.indicadores.empresasTecnologicas)}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Empresas de IA
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-foreground">
                              {formatoNumero.format(p.indicadores.empresasIa)}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Velocidad Internet
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-foreground">
                              {p.indicadores.velocidadInternetMbps} Mbps
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Índice Trabajo Remoto
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-foreground">
                              {p.indicadores.trabajoRemoto}/100
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Coste de Vida
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-foreground">
                              {p.indicadores.costeDeVida}/100
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Visa Nómada Digital
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-semibold">
                              {p.ecosistema.visaNomadaDigital ? (
                                <span className="text-primary">✓ Sí</span>
                              ) : (
                                <span className="text-muted-foreground">No</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Impuesto Estimado
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 font-medium text-chart-4">
                              ~{p.ecosistema.impuestosAproximadosPorcentaje}%
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-muted-foreground">
                            Hubs Principales
                          </td>
                          {paises.map((p) => (
                            <td key={p.codigo} className="px-4 py-3 text-muted-foreground">
                              {p.ecosistema.hubsPrincipales.join(", ")}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {pestañaActiva === "radar" && (
                <motion.div
                  key="radar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-border bg-secondary/20 p-5"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    Superposición Radar de Perfiles Relativos
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Comparación visual directa de las 6 dimensiones clave de cada ecosistema.
                  </p>

                  <div className="mt-4 h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={datosRadarSuperpuesto} outerRadius="75%">
                        <PolarGrid stroke="#ffffff1a" />
                        <PolarAngleAxis
                          dataKey="indicador"
                          tick={{ fill: "#93a4ba", fontSize: 11 }}
                        />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        {paises.map((p, idx) => (
                          <Radar
                            key={p.codigo}
                            name={p.nombre}
                            dataKey={p.nombre}
                            stroke={COLORES_PAISES[idx]}
                            fill={COLORES_PAISES[idx]}
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        ))}
                        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                      </RadarChart>
                    </ResponsiveContainer>
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
                  className="rounded-2xl border border-border bg-secondary/20 p-5"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    Comparativa de Salarios por Nivel de Experiencia (USD)
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Salarios medios anuales estimados para cada nivel de antigüedad.
                  </p>

                  <div className="mt-6 h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={datosSalariosExperiencia}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="nivel" tick={{ fill: "#e7edf6", fontSize: 12 }} />
                        <YAxis
                          tick={{ fill: "#93a4ba", fontSize: 11 }}
                          tickFormatter={(v) => `$${v / 1000}k`}
                        />
                        <Tooltip
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          formatter={(val: any) => [
                            `$${Number(val || 0).toLocaleString()} USD`,
                            "Salario medio",
                          ]}
                          contentStyle={{
                            backgroundColor: "#0d1a2e",
                            borderColor: "#ffffff1a",
                            borderRadius: "0.75rem",
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                        {paises.map((p, idx) => (
                          <Bar
                            key={p.codigo}
                            dataKey={p.nombre}
                            fill={COLORES_PAISES[idx]}
                            radius={[6, 6, 0, 0]}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
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
