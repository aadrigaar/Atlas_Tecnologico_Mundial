"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import type { Pais } from "@/types/pais";

type PropiedadesRadarPerfilTecnologico = {
  pais: Pais;
};

export function RadarPerfilTecnologico({ pais }: PropiedadesRadarPerfilTecnologico) {
  const datosPerfil = [
    { indicador: "Tecnología", valor: pais.indicadores.puntuacionTecnologica },
    { indicador: "Remoto", valor: pais.indicadores.trabajoRemoto },
    {
      indicador: "Internet",
      valor: Math.min(100, Math.round(pais.indicadores.velocidadInternetMbps / 3)),
    },
    { indicador: "Coste", valor: 100 - pais.indicadores.costeDeVida },
  ];

  return (
    <section
      className="mt-4 border-t border-primary/15 pt-4"
      aria-label="Perfil tecnológico relativo"
    >
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Perfil relativo
      </p>
      <div className="mt-2 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={datosPerfil} outerRadius="70%">
            <PolarGrid stroke="#ffffff1a" />
            <PolarAngleAxis
              dataKey="indicador"
              tick={{ fill: "#93a4ba", fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="valor"
              stroke="#31d0aa"
              fill="#31d0aa"
              fillOpacity={0.22}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs leading-4 text-muted-foreground">
        Normalizo la conectividad y el coste de vida en una escala de 0 a 100 para compararlos.
      </p>
    </section>
  );
}
