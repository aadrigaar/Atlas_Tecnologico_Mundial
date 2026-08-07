import { RadarPerfilTecnologico } from "@/components/graficos/radar-perfil-tecnologico";
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
};

export function ResumenPais({ pais }: PropiedadesResumenPais) {
  const metricas = [
    { etiqueta: "Salario medio", valor: formatoSalario.format(pais.indicadores.salarioMedioUsd) },
    {
      etiqueta: "Empresas tecnológicas",
      valor: formatoNumero.format(pais.indicadores.empresasTecnologicas),
    },
    { etiqueta: "Empresas de IA", valor: formatoNumero.format(pais.indicadores.empresasIa) },
    { etiqueta: "Internet", valor: `${pais.indicadores.velocidadInternetMbps} Mbps` },
    { etiqueta: "Trabajo remoto", valor: `${pais.indicadores.trabajoRemoto}/100` },
    { etiqueta: "Puntuación tecnológica", valor: `${pais.indicadores.puntuacionTecnologica}/100` },
  ];

  return (
    <section className="mt-4 rounded-2xl border border-primary/25 bg-primary/5 p-4">
      <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
        Perfil activo
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{pais.nombre}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {pais.capital} · {pais.continente}
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-primary/15 pt-3">
        {metricas.map((metrica) => (
          <div key={metrica.etiqueta} className="rounded-xl bg-background/40 p-2.5">
            <dt className="text-xs leading-4 text-muted-foreground">{metrica.etiqueta}</dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">{metrica.valor}</dd>
          </div>
        ))}
      </dl>
      <RadarPerfilTecnologico pais={pais} />
    </section>
  );
}
