"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { RadarPerfilTecnologico } from "@/components/graficos/radar-perfil-tecnologico";
import { Button } from "@/components/ui/button";
import type { Pais } from "@/types/pais";

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

type PropiedadesResumenPais = {
  pais: Pais;
  estaComparado: boolean;
  limiteComparadorAlcanzado: boolean;
  alAlternarComparacion: (pais: Pais) => void;
  alAbrirInforme?: (pais: Pais) => void;
};

export function ResumenPais({
  pais,
  estaComparado,
  limiteComparadorAlcanzado,
  alAlternarComparacion,
  alAbrirInforme,
}: PropiedadesResumenPais) {
  const metricas = [
    { etiqueta: "Referencia salarial", valor: formatoSalario.format(pais.indicadores.salarioMedioUsd) },
    {
      etiqueta: "Empresas tech",
      valor: formatoNumero.format(pais.indicadores.empresasTecnologicas),
    },
    { etiqueta: "Empresas IA", valor: formatoNumero.format(pais.indicadores.empresasIa) },
    { etiqueta: "Internet", valor: `${pais.indicadores.velocidadInternetMbps} Mbps` },
    { etiqueta: "Trabajo remoto", valor: `${pais.indicadores.trabajoRemoto}/100` },
    { etiqueta: "Puntuación", valor: `${pais.indicadores.puntuacionTecnologica}/100` },
    { etiqueta: "Coste de vida", valor: `${pais.indicadores.costeDeVida}/100` },
  ];

  return (
    <section className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Perfil activo
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{pais.nombre}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {pais.capital} · {pais.continente}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        {alAbrirInforme && (
          <Button
            type="button"
            variant="default"
            size="sm"
            className="w-full shadow-md shadow-primary/10"
            onClick={() => alAbrirInforme(pais)}
          >
            <FileText className="mr-1.5 size-4" />
            Ver informe completo
          </Button>
        )}

        <Button
          type="button"
          variant={estaComparado ? "secondary" : "outline"}
          size="sm"
          className="w-full"
          disabled={!estaComparado && limiteComparadorAlcanzado}
          onClick={() => alAlternarComparacion(pais)}
          aria-label={
            estaComparado
              ? `Quitar ${pais.nombre} de la comparación`
              : limiteComparadorAlcanzado
                ? "Máximo de 3 países alcanzado"
                : `Añadir ${pais.nombre} a la comparación`
          }
        >
          {estaComparado
            ? "Quitar de la comparación"
            : limiteComparadorAlcanzado
              ? "Máximo de 3 países"
              : "+ Añadir a la comparación"}
        </Button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-primary/15 pt-3">
        {metricas.map((metrica, indice) => (
          <motion.div
            key={metrica.etiqueta}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: indice * 0.04, duration: 0.2 }}
            className="rounded-xl bg-background/40 p-2.5"
          >
            <dt className="text-xs leading-4 text-muted-foreground">{metrica.etiqueta}</dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">{metrica.valor}</dd>
          </motion.div>
        ))}
      </dl>
      <RadarPerfilTecnologico pais={pais} />
    </section>
  );
}
