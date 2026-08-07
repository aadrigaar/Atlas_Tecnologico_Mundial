"use client";

import { useState } from "react";

import { CabeceraPrincipal } from "@/components/layout/cabecera-principal";
import { PanelExplorador } from "@/components/layout/panel-explorador";
import { MapaMundial } from "@/components/mapa/mapa-mundial";
import type { Pais } from "@/types/pais";

export default function Home() {
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <CabeceraPrincipal />
      <main className="min-h-[calc(100dvh-4rem)] md:flex">
        <PanelExplorador paisSeleccionado={paisSeleccionado} />
        <section className="min-h-[32rem] flex-1">
          <MapaMundial
            paisSeleccionado={paisSeleccionado}
            alSeleccionarPais={setPaisSeleccionado}
          />
        </section>
      </main>
    </div>
  );
}
