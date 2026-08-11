"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  Search,
  Filter,
  Check,
  Plus,
  FileText,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { paises } from "@/data/paises";
import { type Continente, type Pais, calcularPoderAdquisitivo } from "@/types/pais";
import { Button } from "@/components/ui/button";

const formatoSalario = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

type ClaveOrdenacion =
  | "nombre"
  | "continente"
  | "salarioMedioUsd"
  | "puntuacionTecnologica"
  | "empresasTecnologicas"
  | "velocidadInternetMbps"
  | "costeDeVida"
  | "poderAdquisitivo";

type PropiedadesTablaPaises = {
  alSeleccionarPais: (pais: Pais) => void;
  alAbrirInformePais: (pais: Pais) => void;
  paisesComparados: Pais[];
  alAlternarComparacion: (pais: Pais) => void;
};

export function TablaPaises({
  alSeleccionarPais,
  alAbrirInformePais,
  paisesComparados,
  alAlternarComparacion,
}: PropiedadesTablaPaises) {
  const [consulta, setConsulta] = useState("");
  const [continenteFiltro, setContinenteFiltro] = useState<Continente | "Todos">("Todos");
  const [claveOrden, setClaveOrden] = useState<ClaveOrdenacion>("puntuacionTecnologica");
  const [ordenAscendente, setOrdenAscendente] = useState(false);

  // Filtrado
  const consultaNorm = consulta.trim().toLowerCase();
  const datosFiltrados = paises.filter((p) => {
    const coincideContinente = continenteFiltro === "Todos" || p.continente === continenteFiltro;
    const coincideBusqueda =
      !consultaNorm ||
      p.nombre.toLowerCase().includes(consultaNorm) ||
      p.capital.toLowerCase().includes(consultaNorm) ||
      p.ecosistema.hubsPrincipales.some((h) => h.toLowerCase().includes(consultaNorm));
    return coincideContinente && coincideBusqueda;
  });

  // Ordenación
  const datosOrdenados = [...datosFiltrados].sort((a, b) => {
    let valA: string | number = 0;
    let valB: string | number = 0;

    if (claveOrden === "nombre") {
      valA = a.nombre;
      valB = b.nombre;
    } else if (claveOrden === "continente") {
      valA = a.continente;
      valB = b.continente;
    } else if (claveOrden === "poderAdquisitivo") {
      valA = calcularPoderAdquisitivo(a);
      valB = calcularPoderAdquisitivo(b);
    } else {
      valA = a.indicadores[claveOrden];
      valB = b.indicadores[claveOrden];
    }

    if (typeof valA === "string" && typeof valB === "string") {
      return ordenAscendente ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return ordenAscendente
      ? (valA as number) - (valB as number)
      : (valB as number) - (valA as number);
  });

  const cambiarOrden = (clave: ClaveOrdenacion) => {
    if (claveOrden === clave) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setClaveOrden(clave);
      setOrdenAscendente(false);
    }
  };

  const continentes: (Continente | "Todos")[] = [
    "Todos",
    "Europa",
    "Norteamérica",
    "Sudamérica",
    "Asia",
    "África",
    "Oceanía",
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background p-4 sm:p-6">
      {/* Barra de Controles: Buscador + Filtro Continente */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Explorador de Ecosistemas Tecnológicos
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Comparativa directa y métricas completas de los 32 países analizados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              id="tabla-buscador"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Buscar país, hub o ciudad..."
              aria-label="Buscar país en la tabla"
              className="h-9 w-full rounded-xl border border-border bg-secondary/60 pr-3 pl-9 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          {/* Selector Continentes */}
          <div className="flex flex-wrap items-center gap-1 rounded-2xl border border-border bg-card/60 p-1">
            <Filter className="ml-1.5 size-3.5 text-muted-foreground" />
            {continentes.map((cont) => (
              <button
                key={cont}
                type="button"
                onClick={() => setContinenteFiltro(cont)}
                className={`rounded-xl px-2.5 py-1 text-xs font-medium transition-all ${
                  continenteFiltro === cont
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cont}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-border bg-card/40 shadow-xl backdrop-blur-md">
        <div className="h-full overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[50rem] text-left text-xs">
            <thead className="sticky top-0 z-10 border-b border-border bg-card/95 text-muted-foreground backdrop-blur-md">
              <tr>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("nombre")}
                    aria-label="Ordenar por país"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    País <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("continente")}
                    aria-label="Ordenar por continente"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Continente <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("salarioMedioUsd")}
                    aria-label="Ordenar por salario medio"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Salario Medio <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("puntuacionTecnologica")}
                    aria-label="Ordenar por puntuación tecnológica"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Score Tech <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("poderAdquisitivo")}
                    aria-label="Ordenar por poder adquisitivo"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Poder Adquisitivo <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <button
                    type="button"
                    onClick={() => cambiarOrden("velocidadInternetMbps")}
                    aria-label="Ordenar por velocidad de internet"
                    className="flex items-center gap-1 hover:text-foreground"
                  >
                    Internet <ArrowUpDown className="size-3" />
                  </button>
                </th>
                <th className="px-4 py-3 font-semibold">Visa Nómada</th>
                <th className="px-4 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {datosOrdenados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      No se encontraron países con los criterios actuales.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setConsulta("");
                        setContinenteFiltro("Todos");
                      }}
                      className="mt-2 text-xs font-semibold text-primary hover:underline"
                    >
                      Limpiar filtros
                    </button>
                  </td>
                </tr>
              ) : (
                datosOrdenados.map((pais) => {
                  const estaComp = paisesComparados.some((p) => p.codigo === pais.codigo);
                  const podAdq = calcularPoderAdquisitivo(pais);

                  return (
                    <tr key={pais.codigo} className="transition-colors hover:bg-secondary/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex size-7 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 font-bold text-primary">
                            {pais.codigoIso2}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{pais.nombre}</p>
                            <p className="text-[0.65rem] text-muted-foreground">{pais.capital}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-lg bg-secondary/80 px-2 py-1 text-[0.68rem] font-medium text-muted-foreground">
                          {pais.continente}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-foreground">
                        {formatoSalario.format(pais.indicadores.salarioMedioUsd)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${pais.indicadores.puntuacionTecnologica}%` }}
                            />
                          </div>
                          <span className="font-bold text-primary">
                            {pais.indicadores.puntuacionTecnologica}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold ${podAdq >= 60 ? "text-primary" : podAdq >= 40 ? "text-chart-3" : "text-muted-foreground"}`}
                        >
                          {podAdq}/100
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {pais.indicadores.velocidadInternetMbps} Mbps
                      </td>
                      <td className="px-4 py-3">
                        {pais.ecosistema.visaNomadaDigital ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-semibold text-primary">
                            <CheckCircle2 className="size-3" /> Sí
                          </span>
                        ) : (
                          <span className="text-[0.65rem] text-muted-foreground">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            type="button"
                            variant="ghost"
                            size="xs"
                            onClick={() => alSeleccionarPais(pais)}
                            aria-label={`Ver ${pais.nombre} en el mapa`}
                            title="Ver en mapa"
                          >
                            <MapPin className="size-3.5 text-primary" />
                          </Button>
                          <Button
                            type="button"
                            variant={estaComp ? "secondary" : "outline"}
                            size="xs"
                            onClick={() => alAlternarComparacion(pais)}
                            aria-label={
                              estaComp
                                ? `Quitar ${pais.nombre} de la comparación`
                                : `Comparar ${pais.nombre}`
                            }
                            title={estaComp ? "Quitar de comparación" : "Comparar"}
                          >
                            {estaComp ? (
                              <Check className="size-3.5 text-primary" />
                            ) : (
                              <Plus className="size-3.5" />
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="default"
                            size="xs"
                            onClick={() => alAbrirInformePais(pais)}
                            aria-label={`Ver informe de ${pais.nombre}`}
                          >
                            <FileText className="size-3.5 mr-1" /> Informe
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
