"use client";

import { useState } from "react";

import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

export default function Home() {
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);
  const [indicadorActivo, setIndicadorActivo] = useState<IndicadorMapa>("puntuacionTecnologica");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal alSeleccionarPais={setPaisSeleccionado} />
      <main className="min-h-[calc(100dvh-4rem)] md:flex">
        <PanelExplorador
          paisSeleccionado={paisSeleccionado}
          indicadorActivo={indicadorActivo}
          alSeleccionarIndicador={setIndicadorActivo}
        />
        <section className="min-h-[32rem] flex-1">
          <MapaMundial
            paisSeleccionado={paisSeleccionado}
            alSeleccionarPais={setPaisSeleccionado}
            indicadorActivo={indicadorActivo}
          />
        </section>
      </main>
    </div>
  );
}
