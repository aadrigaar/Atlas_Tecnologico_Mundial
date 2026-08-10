export type Continente = "Europa" | "Norteamérica" | "Sudamérica" | "Asia" | "África" | "Oceanía";

export type DesgloseSalarios = {
  junior: number;
  mid: number;
  senior: number;
  lead: number;
};

export type EcosistemaPais = {
  hubsPrincipales: string[];
  empresasDestacadas: string[];
  visaNomadaDigital: boolean;
  impuestosAproximadosPorcentaje: number;
  salariosPorNivel: DesgloseSalarios;
};

export type IndicadoresTecnologicos = {
  salarioMedioUsd: number;
  empresasTecnologicas: number;
  empresasIa: number;
  costeDeVida: number;
  velocidadInternetMbps: number;
  trabajoRemoto: number;
  puntuacionTecnologica: number;
};

export type Pais = {
  codigo: string;
  codigoIso2: string;
  nombre: string;
  capital: string;
  continente: Continente;
  coordenadas: [longitud: number, latitud: number];
  indicadores: IndicadoresTecnologicos;
  ecosistema: EcosistemaPais;
};

export function calcularPoderAdquisitivo(pais: Pais): number {
  // Índice relativo de poder adquisitivo (Salario ajustado al coste de vida)
  if (pais.indicadores.costeDeVida === 0) return 0;
  const ratio = (pais.indicadores.salarioMedioUsd / (pais.indicadores.costeDeVida * 100)) * 10;
  return Math.min(100, Math.round(ratio));
}
