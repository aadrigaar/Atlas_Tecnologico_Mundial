"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Map as MapaMapLibre, Marker, NavigationControl } from "maplibre-gl";

import { paises } from "@/data/paises";
import type { Pais } from "@/types/pais";

const ESTILO_BASE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const formatoSalario = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

function crearMarcador(pais: Pais, alSeleccionar: (pais: Pais) => void) {
  const marcador = document.createElement("button");
  marcador.type = "button";
  marcador.className = "marcador-pais";
  marcador.setAttribute("aria-label", `Seleccionar ${pais.nombre}`);
  marcador.textContent = pais.codigo;
  marcador.addEventListener("click", () => alSeleccionar(pais));

  return marcador;
}

export function MapaMundial() {
  const contenedorMapa = useRef<HTMLDivElement>(null);
  const [paisSeleccionado, setPaisSeleccionado] = useState<Pais | null>(null);

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
      const seleccionarPais = (paisSeleccionado: Pais) => {
        setPaisSeleccionado(paisSeleccionado);
        mapa.flyTo({ center: paisSeleccionado.coordenadas, zoom: 3.5, essential: true });
      };

      new Marker({ element: crearMarcador(pais, seleccionarPais) })
        .setLngLat(pais.coordenadas)
        .addTo(mapa);
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
      {paisSeleccionado ? (
        <article className="absolute top-5 right-5 z-10 w-72 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-md">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                País seleccionado
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                {paisSeleccionado.nombre}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {paisSeleccionado.capital} · {paisSeleccionado.continente}
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setPaisSeleccionado(null)}
              aria-label={`Cerrar ficha de ${paisSeleccionado.nombre}`}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
            <div>
              <dt className="text-xs text-muted-foreground">Salario medio</dt>
              <dd className="mt-1 text-sm font-semibold">
                {formatoSalario.format(paisSeleccionado.indicadores.salarioMedioUsd)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Puntuación tecnológica</dt>
              <dd className="mt-1 text-sm font-semibold text-primary">
                {paisSeleccionado.indicadores.puntuacionTecnologica}/100
              </dd>
            </div>
          </dl>
        </article>
      ) : null}
    </div>
  );
}
