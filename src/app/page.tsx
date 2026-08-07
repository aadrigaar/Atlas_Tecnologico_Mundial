"use client";

import { useState } from "react";

import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";
import { ComparadorPaises } from "@/components/paises/comparador-paises";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

export default function Home() {
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
  const [indicadorActivo, setIndicadorActivo] = useState<IndicadorMapa>("puntuacionTecnologica");
  const [paisesComparados, setPaisesComparados] = useState<Pais[]>([]);

  function alternarPaisComparado(pais: Pais) {
    setPaisesComparados((paisesActuales) => {
      const paisYaComparado = paisesActuales.some(
        (paisActual) => paisActual.codigo === pais.codigo,
      );

      if (paisYaComparado) {
        return paisesActuales.filter((paisActual) => paisActual.codigo !== pais.codigo);
      }

      return paisesActuales.length < 2 ? [...paisesActuales, pais] : paisesActuales;
    });
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal alSeleccionarPais={setPaisSeleccionado} />
      <main className="min-h-[calc(100dvh-4rem)] md:flex">
        <PanelExplorador
          paisSeleccionado={paisSeleccionado}
          indicadorActivo={indicadorActivo}
          alSeleccionarIndicador={setIndicadorActivo}
          paisesComparados={paisesComparados}
          alAlternarPaisComparado={alternarPaisComparado}
          alSeleccionarPais={setPaisSeleccionado}
        />
        <section className="relative min-h-[32rem] flex-1">
          <MapaMundial
            paisSeleccionado={paisSeleccionado}
            alSeleccionarPais={setPaisSeleccionado}
            indicadorActivo={indicadorActivo}
          />
          <ComparadorPaises paises={paisesComparados} />
        </section>
      </main>
    </div>
  );
}
