"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Map as MapaMapLibre, Marker, NavigationControl } from "maplibre-gl";

import { paises } from "@/data/paises";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

const ESTILO_BASE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const formatoSalario = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});
const etiquetasIndicadores: Record<IndicadorMapa, string> = {
  salarioMedioUsd: "Salario medio",
  empresasTecnologicas: "Empresas tecnológicas",
  empresasIa: "Empresas de inteligencia artificial",
  velocidadInternetMbps: "Velocidad de internet",
  trabajoRemoto: "Trabajo remoto",
  puntuacionTecnologica: "Puntuación tecnológica",
};

function obtenerNivelMarcador(pais: Pais, indicador: IndicadorMapa) {
  const valores = paises.map((paisActual) => paisActual.indicadores[indicador]);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);
  const proporcion =
    maximo === minimo ? 1 : (pais.indicadores[indicador] - minimo) / (maximo - minimo);

  if (proporcion >= 0.67) {
    return "alto";
  }

  if (proporcion >= 0.34) {
    return "medio";
  }

  return "bajo";
}

type PropiedadesMapaMundial = {
  paisSeleccionado: Pais | null;
  alSeleccionarPais: (pais: Pais | null) => void;
  indicadorActivo: IndicadorMapa;
};

function crearMarcador(pais: Pais, alSeleccionar: (pais: Pais) => void) {
  const marcador = document.createElement("button");
  marcador.type = "button";
  marcador.className = "marcador-pais";
  marcador.setAttribute("aria-label", `Seleccionar ${pais.nombre}`);
  marcador.textContent = pais.codigo;
  marcador.addEventListener("click", () => alSeleccionar(pais));

  return marcador;
}

export function MapaMundial({
  paisSeleccionado,
  alSeleccionarPais,
  indicadorActivo,
}: PropiedadesMapaMundial) {
  const contenedorMapa = useRef<HTMLDivElement>(null);
  const marcadores = useRef<Record<string, HTMLButtonElement>>({});

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

    const seleccionarPais = (pais: Pais) => {
      alSeleccionarPais(pais);
      mapa.flyTo({ center: pais.coordenadas, zoom: 3.5, essential: true });
    };

    paises.forEach((pais) => {
      const marcador = crearMarcador(pais, seleccionarPais);
      marcadores.current[pais.codigo] = marcador;

      new Marker({ element: marcador }).setLngLat(pais.coordenadas).addTo(mapa);
    });

    return () => {
      marcadores.current = {};
      mapa.remove();
    };
  }, [alSeleccionarPais]);

  useEffect(() => {
    paises.forEach((pais) => {
      const marcador = marcadores.current[pais.codigo];

      if (marcador) {
        marcador.dataset.nivel = obtenerNivelMarcador(pais, indicadorActivo);
      }
    });
  }, [indicadorActivo]);

  return (
    <div
      className="relative h-full min-h-[32rem] overflow-hidden"
      aria-label="Mapa tecnológico mundial"
    >
      <div ref={contenedorMapa} className="absolute inset-0" />
      <div className="pointer-events-none absolute top-5 left-5 z-10 rounded-xl border border-border bg-background/80 px-3 py-2 backdrop-blur-md">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Indicador activo
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {etiquetasIndicadores[indicadorActivo]}
        </p>
        <div className="mt-2 flex items-center gap-2 text-[0.65rem] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary" /> Alto
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-chart-3" /> Medio
          </span>
          <span className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-muted-foreground" /> Bajo
          </span>
        </div>
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
              onClick={() => alSeleccionarPais(null)}
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
