"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

import { paises } from "@/data/paises";
import type { Pais } from "@/types/pais";

type PropiedadesBuscadorPaises = {
  alSeleccionarPais: (pais: Pais) => void;
};

export function BuscadorPaises({ alSeleccionarPais }: PropiedadesBuscadorPaises) {
  const [consulta, setConsulta] = useState("");
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const consultaNormalizada = consulta.trim().toLocaleLowerCase("es-ES");
  const resultados = consultaNormalizada
    ? paises
        .filter((pais) => {
          const textoPais = `${pais.nombre} ${pais.capital} ${pais.continente}`.toLocaleLowerCase(
            "es-ES",
          );
          return textoPais.includes(consultaNormalizada);
        })
        .slice(0, 8)
    : [];

  function seleccionarPais(pais: Pais) {
    alSeleccionarPais(pais);
    setConsulta("");
    setAbierto(false);
  }

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (contenedorRef.current && !contenedorRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    function handleTecla(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAbierto(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleTecla);
    return () => document.removeEventListener("keydown", handleTecla);
  }, []);

  return (
    <div ref={contenedorRef} className="relative hidden w-64 md:block">
      <label className="sr-only" htmlFor="buscador-paises">
        Buscar país
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id="buscador-paises"
        type="search"
        value={consulta}
        onChange={(evento) => {
          setConsulta(evento.target.value);
          setAbierto(true);
        }}
        onFocus={() => consulta && setAbierto(true)}
        placeholder="Buscar país…"
        className="h-9 w-full rounded-xl border border-border bg-secondary/60 pr-8 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
      />
      {consulta && (
        <button
          type="button"
          onClick={() => {
            setConsulta("");
            setAbierto(false);
            inputRef.current?.focus();
          }}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Limpiar búsqueda"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
      {abierto && consultaNormalizada && (
        <div className="absolute top-11 right-0 left-0 z-20 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/30">
          {resultados.length ? (
            <ul className="max-h-64 overflow-y-auto p-1">
              {resultados.map((pais) => (
                <li key={pais.codigo}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
                    onClick={() => seleccionarPais(pais)}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">
                        {pais.nombre}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {pais.capital} · {pais.continente}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">No se encontró ningún país.</p>
          )}
        </div>
      )}
    </div>
  );
}
