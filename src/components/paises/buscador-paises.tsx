"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { paises } from "@/data/paises";
import type { Pais } from "@/types/pais";

type PropiedadesBuscadorPaises = {
  alSeleccionarPais: (pais: Pais) => void;
};

export function BuscadorPaises({ alSeleccionarPais }: PropiedadesBuscadorPaises) {
  const [consulta, setConsulta] = useState("");
  const consultaNormalizada = consulta.trim().toLocaleLowerCase("es-ES");
  const resultados = consultaNormalizada
    ? paises.filter((pais) => {
        const textoPais = `${pais.nombre} ${pais.capital}`.toLocaleLowerCase("es-ES");

        return textoPais.includes(consultaNormalizada);
      })
    : [];

  function seleccionarPais(pais: Pais) {
    alSeleccionarPais(pais);
    setConsulta("");
  }

  return (
    <div className="relative hidden w-64 md:block">
      <label className="sr-only" htmlFor="buscador-paises">
        Buscar país
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="buscador-paises"
        type="search"
        value={consulta}
        onChange={(evento) => setConsulta(evento.target.value)}
        placeholder="Buscar país"
        className="h-9 w-full rounded-xl border border-border bg-secondary/60 pr-3 pl-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
      />
      {consultaNormalizada ? (
        <div className="absolute top-11 right-0 left-0 z-20 overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-black/30">
          {resultados.length ? (
            <ul className="p-1">
              {resultados.map((pais) => (
                <li key={pais.codigo}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
                    onClick={() => seleccionarPais(pais)}
                  >
                    <span className="text-sm font-medium text-foreground">{pais.nombre}</span>
                    <span className="text-xs text-muted-foreground">{pais.capital}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">No encuentro ningún país.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
