export type Continente = "Europa" | "Norteamérica" | "Sudamérica" | "Asia" | "África" | "Oceanía";

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
};
