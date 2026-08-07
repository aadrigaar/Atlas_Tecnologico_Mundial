"use client";

import { useEffect, useRef } from "react";
import { Map as MapaMapLibre, Marker, NavigationControl } from "maplibre-gl";

import { paises } from "@/data/paises";

const ESTILO_BASE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

function crearMarcador(codigoPais: string) {
  const marcador = document.createElement("div");
  marcador.className = "marcador-pais";
  marcador.setAttribute("aria-hidden", "true");
  marcador.textContent = codigoPais;

  return marcador;
}

export function MapaMundial() {
  const contenedorMapa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contenedorMapa.current) {
      return;
    }

    const mapa = new MapaMapLibre({
      container: contenedorMapa.current,
      style: ESTILO_BASE,
      center: [10, 24],
      zoom: 1.25,
      minZoom: 1,
      maxZoom: 6,
      dragRotate: false,
      pitchWithRotate: false,
    });

    mapa.addControl(new NavigationControl({ showCompass: false }), "bottom-right");

    paises.forEach((pais) => {
      new Marker({ element: crearMarcador(pais.codigo) }).setLngLat(pais.coordenadas).addTo(mapa);
    });

    return () => mapa.remove();
  }, []);

  return (
    <div
      className="relative h-full min-h-[32rem] overflow-hidden"
      aria-label="Mapa tecnológico mundial"
    >
      <div ref={contenedorMapa} className="absolute inset-0" />
      <div className="pointer-events-none absolute top-5 left-5 z-10 rounded-xl border border-border bg-background/80 px-3 py-2 backdrop-blur-md">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Vista global
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Navego por el ecosistema tecnológico mundial.
        </p>
      </div>
    </div>
  );
}
