export type Continente = "Asia" | "Europa" | "Norteamérica";

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
  nombre: string;
  capital: string;
  continente: Continente;
  coordenadas: [longitud: number, latitud: number];
  indicadores: IndicadoresTecnologicos;
};
