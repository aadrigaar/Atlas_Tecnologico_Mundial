"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import {
  Map as MapaMapLibre,
  Marker,
  NavigationControl,
  type StyleSpecification,
  type MapLayerMouseEvent,
} from "maplibre-gl";

import { paises } from "@/data/paises";
import type { IndicadorMapa } from "@/types/indicador";
import type { Pais } from "@/types/pais";

const ESTILO_BASE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const GEOJSON_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

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

const etiquetasIndicadores: Record<IndicadorMapa, string> = {
  salarioMedioUsd: "Salario medio",
  empresasTecnologicas: "Empresas tecnológicas",
  empresasIa: "Empresas de IA",
  velocidadInternetMbps: "Velocidad de internet",
  trabajoRemoto: "Trabajo remoto",
  puntuacionTecnologica: "Puntuación tecnológica",
};

// ─── Escala de colores tipo coroplético ───

const COLORES_ESCALA = [
  "#1a1f35", // sin datos / base
  "#1b3a4b", // muy bajo
  "#1a5c6b", // bajo
  "#1b8a7a", // medio-bajo
  "#31d0aa", // medio-alto
  "#5eecc5", // alto
  "#a5f7e1", // muy alto
] as const;

function obtenerColorPais(pais: Pais, indicador: IndicadorMapa): string {
  const valores = paises.map((p) => p.indicadores[indicador]);
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const ratio = max === min ? 1 : (pais.indicadores[indicador] - min) / (max - min);

  if (ratio >= 0.85) return COLORES_ESCALA[6];
  if (ratio >= 0.7) return COLORES_ESCALA[5];
  if (ratio >= 0.5) return COLORES_ESCALA[4];
  if (ratio >= 0.35) return COLORES_ESCALA[3];
  if (ratio >= 0.2) return COLORES_ESCALA[2];
  return COLORES_ESCALA[1];
}

function obtenerNivelMarcador(pais: Pais, indicador: IndicadorMapa) {
  const valores = paises.map((p) => p.indicadores[indicador]);
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const ratio = max === min ? 1 : (pais.indicadores[indicador] - min) / (max - min);

  if (ratio >= 0.67) return "alto";
  if (ratio >= 0.34) return "medio";
  return "bajo";
}

function formatearValorIndicador(indicador: IndicadorMapa, valor: number): string {
  if (indicador === "salarioMedioUsd") return formatoSalario.format(valor);
  if (indicador === "velocidadInternetMbps") return `${valor} Mbps`;
  if (indicador === "trabajoRemoto" || indicador === "puntuacionTecnologica") return `${valor}/100`;
  return formatoNumero.format(valor);
}

// ─── Mapa de ISO_A2 a nuestros datos ───

function crearMapaIso2(): Map<string, Pais> {
  const mapa = new Map<string, Pais>();
  paises.forEach((pais) => mapa.set(pais.codigoIso2, pais));
  return mapa;
}

// ─── Componente ───

type PropiedadesMapaMundial = {
  paisSeleccionado: Pais | null;
  alSeleccionarPais: (pais: Pais | null) => void;
  indicadorActivo: IndicadorMapa;
  alAbrirInformePais?: (pais: Pais) => void;
  paisesFiltrados?: Pais[];
};

function crearMarcador(pais: Pais, alSeleccionar: (pais: Pais) => void) {
  const marcador = document.createElement("button");
  marcador.type = "button";
  marcador.className = "marcador-pais";
  marcador.setAttribute("aria-label", `Seleccionar ${pais.nombre}`);
  marcador.textContent = pais.codigo;
  marcador.addEventListener("click", (e) => {
    e.stopPropagation();
    alSeleccionar(pais);
  });
  return marcador;
}

export function MapaMundial({
  paisSeleccionado,
  alSeleccionarPais,
  indicadorActivo,
  alAbrirInformePais,
  paisesFiltrados = paises,
}: PropiedadesMapaMundial) {
  const contenedorMapa = useRef<HTMLDivElement>(null);
  const mapaActual = useRef<MapaMapLibre | null>(null);
  const marcadores = useRef<Record<string, HTMLButtonElement>>({});
  const indicadorRef = useRef(indicadorActivo);
  useEffect(() => {
    indicadorRef.current = indicadorActivo;
  }, [indicadorActivo]);

  // Actualizar visibilidad de marcadores según filtro
  useEffect(() => {
    const codigosVisibles = new Set(paisesFiltrados.map((p) => p.codigo));
    paises.forEach((p) => {
      const marcador = marcadores.current[p.codigo];
      if (marcador) {
        if (codigosVisibles.has(p.codigo)) {
          marcador.style.display = "flex";
        } else {
          marcador.style.display = "none";
        }
      }
    });
  }, [paisesFiltrados]);

  const mapaIso2 = useRef(crearMapaIso2());

  // Callback estable para selección
  const seleccionarCallback = useRef(alSeleccionarPais);
  useEffect(() => {
    seleccionarCallback.current = alSeleccionarPais;
  }, [alSeleccionarPais]);

  const actualizarColoresGeoJSON = useCallback((mapa: MapaMapLibre, indicador: IndicadorMapa) => {
    if (!mapa.getSource("paises-geojson")) return;

    // Construir expresión match para colorear cada país
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matchExpr: any[] = ["match", ["get", "ISO_A2"]];
    paises.forEach((pais) => {
      matchExpr.push(pais.codigoIso2);
      matchExpr.push(obtenerColorPais(pais, indicador));
    });
    matchExpr.push(COLORES_ESCALA[0]); // color por defecto

    mapa.setPaintProperty("paises-fill", "fill-color", matchExpr as unknown as string);
  }, []);

  // Inicializar el mapa
  useEffect(() => {
    if (!contenedorMapa.current || mapaActual.current) return;

    const mapa = new MapaMapLibre({
      container: contenedorMapa.current,
      style: ESTILO_BASE as string | StyleSpecification,
      center: [10, 24],
      zoom: 1.25,
      minZoom: 1,
      maxZoom: 6,
      dragRotate: false,
      pitchWithRotate: false,
    });
    mapaActual.current = mapa;

    mapa.addControl(new NavigationControl({ showCompass: false }), "bottom-right");

    const seleccionarPais = (pais: Pais) => {
      seleccionarCallback.current(pais);
    };

    // Añadir marcadores
    paises.forEach((pais) => {
      const marcador = crearMarcador(pais, seleccionarPais);
      marcadores.current[pais.codigo] = marcador;
      new Marker({ element: marcador }).setLngLat(pais.coordenadas).addTo(mapa);
    });

    // Cargar GeoJSON y crear capa coroplética
    mapa.on("load", async () => {
      try {
        const response = await fetch(GEOJSON_URL);
        const geojson = await response.json();

        mapa.addSource("paises-geojson", {
          type: "geojson",
          data: geojson,
        });

        // Capa de relleno debajo de las etiquetas
        mapa.addLayer(
          {
            id: "paises-fill",
            type: "fill",
            source: "paises-geojson",
            paint: {
              "fill-color": COLORES_ESCALA[0],
              "fill-opacity": 0.6,
            },
          },
          // Insertar debajo de la primera capa de etiquetas
          mapa.getStyle().layers?.find((l) => l.type === "symbol")?.id,
        );

        // Borde sutil
        mapa.addLayer(
          {
            id: "paises-border",
            type: "line",
            source: "paises-geojson",
            paint: {
              "line-color": "#ffffff12",
              "line-width": 0.5,
            },
          },
          mapa.getStyle().layers?.find((l) => l.type === "symbol")?.id,
        );

        // Capa de hover
        mapa.addLayer(
          {
            id: "paises-hover",
            type: "fill",
            source: "paises-geojson",
            paint: {
              "fill-color": "#31d0aa",
              "fill-opacity": 0,
            },
            filter: ["==", "ISO_A2", ""],
          },
          mapa.getStyle().layers?.find((l) => l.type === "symbol")?.id,
        );

        // Aplicar colores iniciales
        actualizarColoresGeoJSON(mapa, indicadorRef.current);

        // Hover sobre polígonos
        mapa.on("mousemove", "paises-fill", (e: MapLayerMouseEvent) => {
          const iso = e.features?.[0]?.properties?.ISO_A2;
          if (iso && mapaIso2.current.has(iso)) {
            mapa.getCanvas().style.cursor = "pointer";
            mapa.setFilter("paises-hover", ["==", "ISO_A2", iso]);
            mapa.setPaintProperty("paises-hover", "fill-opacity", 0.15);
          }
        });

        mapa.on("mouseleave", "paises-fill", () => {
          mapa.getCanvas().style.cursor = "";
          mapa.setPaintProperty("paises-hover", "fill-opacity", 0);
        });

        // Click en polígonos
        mapa.on("click", "paises-fill", (e: MapLayerMouseEvent) => {
          const iso = e.features?.[0]?.properties?.ISO_A2;
          if (iso) {
            const pais = mapaIso2.current.get(iso);
            if (pais) {
              seleccionarCallback.current(pais);
            }
          }
        });
      } catch {
        // Si falla el GeoJSON, el mapa sigue funcionando con marcadores
        console.warn("No se pudo cargar el GeoJSON de países");
      }
    });

    return () => {
      marcadores.current = {};
      mapaActual.current = null;
      mapa.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Centrar mapa al seleccionar país
  useEffect(() => {
    if (paisSeleccionado && mapaActual.current) {
      mapaActual.current.flyTo({
        center: paisSeleccionado.coordenadas,
        zoom: 3.5,
        essential: true,
      });
    }
  }, [paisSeleccionado]);

  // Actualizar colores de marcadores y GeoJSON al cambiar indicador
  useEffect(() => {
    paises.forEach((pais) => {
      const marcador = marcadores.current[pais.codigo];
      if (marcador) {
        marcador.dataset.nivel = obtenerNivelMarcador(pais, indicadorActivo);
      }
    });

    if (mapaActual.current) {
      actualizarColoresGeoJSON(mapaActual.current, indicadorActivo);
    }
  }, [indicadorActivo, actualizarColoresGeoJSON]);

  return (
    <div
      className="relative h-full min-h-[32rem] overflow-hidden"
      aria-label="Mapa tecnológico mundial"
    >
      <div ref={contenedorMapa} className="absolute inset-0" />

      {/* Leyenda del indicador activo */}
      <div className="pointer-events-none absolute top-5 left-5 z-10 rounded-xl border border-border bg-background/80 px-3 py-2.5 backdrop-blur-md">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          Indicador activo
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {etiquetasIndicadores[indicadorActivo]}
        </p>
        <div className="mt-2.5 flex items-center gap-1">
          {COLORES_ESCALA.slice(1).map((color, i) => (
            <div
              key={i}
              className="h-2 flex-1 first:rounded-l-full last:rounded-r-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[0.6rem] text-muted-foreground">
          <span>Bajo</span>
          <span>Alto</span>
        </div>
      </div>

      {/* Contador de países */}
      <div className="pointer-events-none absolute bottom-5 left-5 z-10 rounded-lg border border-border bg-background/80 px-3 py-1.5 backdrop-blur-md">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-primary">{paisesFiltrados.length}</span> /{" "}
          {paises.length} países
        </p>
      </div>

      {/* Ficha del país seleccionado */}
      <AnimatePresence mode="wait">
        {paisSeleccionado && (
          <motion.article
            key={paisSeleccionado.codigo}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-5 right-5 z-10 w-72 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-md"
          >
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
                <dt className="text-xs text-muted-foreground">Puntuación</dt>
                <dd className="mt-1 text-sm font-semibold text-primary">
                  {paisSeleccionado.indicadores.puntuacionTecnologica}/100
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  {etiquetasIndicadores[indicadorActivo]}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-chart-2">
                  {formatearValorIndicador(
                    indicadorActivo,
                    paisSeleccionado.indicadores[indicadorActivo],
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Internet</dt>
                <dd className="mt-1 text-sm font-semibold">
                  {paisSeleccionado.indicadores.velocidadInternetMbps} Mbps
                </dd>
              </div>
            </dl>

            {alAbrirInformePais && (
              <button
                type="button"
                onClick={() => alAbrirInformePais(paisSeleccionado)}
                className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <FileText className="size-3.5" />
                Ver informe completo
              </button>
            )}
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
