import type { Pais } from "@/types/pais";

export const paises: Pais[] = [
  // ─── Norteamérica ───
  {
    codigo: "USA",
    codigoIso2: "US",
    nombre: "Estados Unidos",
    capital: "Washington D. C.",
    continente: "Norteamérica",
    coordenadas: [-98.58, 39.82],
    indicadores: {
      salarioMedioUsd: 133000, // Mediana BLS May 2024: $133.080 (SOC 15-1252 "Software Developers") — Única fuente oficial con mediana estadística
      empresasTecnologicas: 300000,
      empresasIa: 13000,
      costeDeVida: 76,
      velocidadInternetMbps: 245,
      trabajoRemoto: 82,
      puntuacionTecnologica: 96,
    },
    ecosistema: {
      hubsPrincipales: ["Silicon Valley", "Nueva York", "Austin", "Seattle"],
      empresasDestacadas: ["Apple", "Google", "Microsoft", "OpenAI"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 28,
      salariosPorNivel: { junior: 88000, mid: 118000, senior: 158000, lead: 195000 }, // Desglose estimado por percentiles BLS (P25≈$101k, P75≈$168k) — orientativo
    },
  },
  {
    codigo: "CAN",
    codigoIso2: "CA",
    nombre: "Canadá",
    capital: "Ottawa",
    continente: "Norteamérica",
    coordenadas: [-75.69, 45.42],
    indicadores: {
      salarioMedioUsd: 82000, // Estimación: CAD 100-115k ÷ 1.36 ≈ $73-85k (Glassdoor CA, PayScale CA 2024) — orientativo
      empresasTecnologicas: 42000,
      empresasIa: 2800,
      costeDeVida: 68,
      velocidadInternetMbps: 220,
      trabajoRemoto: 78,
      puntuacionTecnologica: 88,
    },
    ecosistema: {
      hubsPrincipales: ["Toronto", "Vancouver", "Montreal"],
      empresasDestacadas: ["Shopify", "1Password", "Cohere"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 30,
      salariosPorNivel: { junior: 50000, mid: 74000, senior: 105000, lead: 130000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "MEX",
    codigoIso2: "MX",
    nombre: "México",
    capital: "Ciudad de México",
    continente: "Norteamérica",
    coordenadas: [-99.13, 19.43],
    indicadores: {
      salarioMedioUsd: 28000, // Estimación: rango $22k-$38k mercado local; punto medio conservador (CodersLink Mexico Tech Report 2024) — orientativo
      empresasTecnologicas: 12000,
      empresasIa: 450,
      costeDeVida: 38,
      velocidadInternetMbps: 95,
      trabajoRemoto: 55,
      puntuacionTecnologica: 58,
    },
    ecosistema: {
      hubsPrincipales: ["Ciudad de México", "Guadalajara", "Monterrey"],
      empresasDestacadas: ["Kavak", "Bitso", "Clara"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 20,
      salariosPorNivel: { junior: 14000, mid: 24000, senior: 38000, lead: 50000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },

  // ─── Sudamérica ───
  {
    codigo: "BRA",
    codigoIso2: "BR",
    nombre: "Brasil",
    capital: "Brasilia",
    continente: "Sudamérica",
    coordenadas: [-47.87, -15.79],
    indicadores: {
      salarioMedioUsd: 28000, // Estimación: rango $19k-$36k (BRL 8k-15k/mes ÷ 5 BRL/USD); punto medio conservador (Glassdoor BR, howdy.com 2024) — orientativo
      empresasTecnologicas: 22000,
      empresasIa: 1200,
      costeDeVida: 36,
      velocidadInternetMbps: 130,
      trabajoRemoto: 60,
      puntuacionTecnologica: 62,
    },
    ecosistema: {
      hubsPrincipales: ["São Paulo", "Florianópolis", "Río de Janeiro"],
      empresasDestacadas: ["Nubank", "iFood", "VTEX"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 22,
      salariosPorNivel: { junior: 14000, mid: 24000, senior: 38000, lead: 52000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "ARG",
    codigoIso2: "AR",
    nombre: "Argentina",
    capital: "Buenos Aires",
    continente: "Sudamérica",
    coordenadas: [-58.38, -34.6],
    indicadores: {
      salarioMedioUsd: 22000, // Estimación: mercado dual (ARS vs. USD contratos remotos); rango orientativo (Glassdoor AR, Workana 2024) — confianza baja
      empresasTecnologicas: 8500,
      empresasIa: 380,
      costeDeVida: 30,
      velocidadInternetMbps: 85,
      trabajoRemoto: 62,
      puntuacionTecnologica: 52,
    },
    ecosistema: {
      hubsPrincipales: ["Buenos Aires", "Córdoba", "Mendoza"],
      empresasDestacadas: ["Mercado Libre", "Globant", "Auth0"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 18,
      salariosPorNivel: { junior: 12000, mid: 20000, senior: 34000, lead: 48000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "CHL",
    codigoIso2: "CL",
    nombre: "Chile",
    capital: "Santiago",
    continente: "Sudamérica",
    coordenadas: [-70.66, -33.45],
    indicadores: {
      salarioMedioUsd: 28000, // Estimación: CLP 18-25M/año ÷ 950 ≈ $19-26k; punto algo alto por sesgo mid-senior (Glassdoor CL 2024) — confianza baja
      empresasTecnologicas: 5200,
      empresasIa: 280,
      costeDeVida: 42,
      velocidadInternetMbps: 160,
      trabajoRemoto: 58,
      puntuacionTecnologica: 56,
    },
    ecosistema: {
      hubsPrincipales: ["Santiago", "Valparaíso"],
      empresasDestacadas: ["NotCo", "Cornershop", "Betterfly"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 23,
      salariosPorNivel: { junior: 15000, mid: 26000, senior: 40000, lead: 52000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "COL",
    codigoIso2: "CO",
    nombre: "Colombia",
    capital: "Bogotá",
    continente: "Sudamérica",
    coordenadas: [-74.07, 4.71],
    indicadores: {
      salarioMedioUsd: 20000, // Estimación: rango $16k-$35k mercado local; punto conservador (toku.com, Glassdoor CO 2024) — orientativo
      empresasTecnologicas: 6800,
      empresasIa: 320,
      costeDeVida: 32,
      velocidadInternetMbps: 75,
      trabajoRemoto: 56,
      puntuacionTecnologica: 48,
    },
    ecosistema: {
      hubsPrincipales: ["Bogotá", "Medellín", "Cali"],
      empresasDestacadas: ["Rappi", "Habi", "Platzi"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 19,
      salariosPorNivel: { junior: 10000, mid: 18000, senior: 30000, lead: 40000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },

  // ─── Europa ───
  {
    codigo: "ESP",
    codigoIso2: "ES",
    nombre: "España",
    capital: "Madrid",
    continente: "Europa",
    coordenadas: [-3.7, 40.42],
    indicadores: {
      salarioMedioUsd: 42000, // Estimación: InfoJobs 2024 promedio ofertado Programación = €37.999 (≈$41k); $42k para perfil SE mid-level — promedio ofertado, no mediana
      empresasTecnologicas: 18000,
      empresasIa: 950,
      costeDeVida: 54,
      velocidadInternetMbps: 196,
      trabajoRemoto: 68,
      puntuacionTecnologica: 74,
    },
    ecosistema: {
      hubsPrincipales: ["Madrid", "Barcelona", "Valencia", "Málaga"],
      empresasDestacadas: ["Cabify", "Glovo", "Factorial", "Jobandtalent"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 24,
      salariosPorNivel: { junior: 26000, mid: 40000, senior: 55000, lead: 72000 }, // Desglose estimado: InfoJobs Junior €22-30k, Mid €30-48k, Senior €48k+ — orientativo (EUR÷USD 1.08)
    },
  },
  {
    codigo: "DEU",
    codigoIso2: "DE",
    nombre: "Alemania",
    capital: "Berlín",
    continente: "Europa",
    coordenadas: [13.41, 52.52],
    indicadores: {
      salarioMedioUsd: 71000, // Estimación: rango €65-70k ÷ 1.08 ≈ $60-65k base; con prime tech hub sí ~$71k (relocate.me, ravio.com 2024) — orientativo
      empresasTecnologicas: 30000,
      empresasIa: 1600,
      costeDeVida: 70,
      velocidadInternetMbps: 181,
      trabajoRemoto: 70,
      puntuacionTecnologica: 86,
    },
    ecosistema: {
      hubsPrincipales: ["Berlín", "Múnich", "Hamburgo", "Fráncfort"],
      empresasDestacadas: ["SAP", "N26", "Delivery Hero", "Personio"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 35,
      salariosPorNivel: { junior: 44000, mid: 65000, senior: 88000, lead: 112000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "GBR",
    codigoIso2: "GB",
    nombre: "Reino Unido",
    capital: "Londres",
    continente: "Europa",
    coordenadas: [-0.12, 51.51],
    indicadores: {
      salarioMedioUsd: 82000, // Estimación: rango £60-70k ÷ 0.79 ≈ $76-89k; $82k punto medio (IT Jobs Watch, Glassdoor UK 2024) — orientativo
      empresasTecnologicas: 35000,
      empresasIa: 2200,
      costeDeVida: 78,
      velocidadInternetMbps: 210,
      trabajoRemoto: 76,
      puntuacionTecnologica: 90,
    },
    ecosistema: {
      hubsPrincipales: ["Londres", "Manchester", "Cambridge", "Edimburgo"],
      empresasDestacadas: ["DeepMind", "Revolut", "Monzo", "Darktrace"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 32,
      salariosPorNivel: { junior: 46000, mid: 72000, senior: 100000, lead: 128000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "FRA",
    codigoIso2: "FR",
    nombre: "Francia",
    capital: "París",
    continente: "Europa",
    coordenadas: [2.35, 48.86],
    indicadores: {
      salarioMedioUsd: 56000, // Estimación: rango €50-55k ÷ 1.08 ≈ $46-51k; incluye sesgo empresas tech (ravio.com, Glassdoor FR 2024) — orientativo
      empresasTecnologicas: 25000,
      empresasIa: 1800,
      costeDeVida: 65,
      velocidadInternetMbps: 190,
      trabajoRemoto: 64,
      puntuacionTecnologica: 82,
    },
    ecosistema: {
      hubsPrincipales: ["París", "Lyon", "Toulouse"],
      empresasDestacadas: ["Mistral AI", "BlaBlaCar", "Dataiku", "Qonto"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 30,
      salariosPorNivel: { junior: 34000, mid: 50000, senior: 70000, lead: 90000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "NLD",
    codigoIso2: "NL",
    nombre: "Países Bajos",
    capital: "Ámsterdam",
    continente: "Europa",
    coordenadas: [4.9, 52.37],
    indicadores: {
      salarioMedioUsd: 77000, // Estimación: €70-75k ÷ 1.08 ≈ $65-69k; con ajuste empresas tech internacionales ~$77k (nextleveljobs.eu 2024) — orientativo
      empresasTecnologicas: 15000,
      empresasIa: 900,
      costeDeVida: 72,
      velocidadInternetMbps: 215,
      trabajoRemoto: 80,
      puntuacionTecnologica: 87,
    },
    ecosistema: {
      hubsPrincipales: ["Ámsterdam", "Eindhoven", "Róterdam"],
      empresasDestacadas: ["ASML", "Adyen", "Booking.com", "Miro"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 33,
      salariosPorNivel: { junior: 46000, mid: 68000, senior: 92000, lead: 118000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "SWE",
    codigoIso2: "SE",
    nombre: "Suecia",
    capital: "Estocolmo",
    continente: "Europa",
    coordenadas: [18.07, 59.33],
    indicadores: {
      salarioMedioUsd: 62000, // Estimación: SEK 650k ÷ 10.5 ≈ $62k (statsskuld.se, Glassdoor SE 2024) — orientativo
      empresasTecnologicas: 18000,
      empresasIa: 1100,
      costeDeVida: 74,
      velocidadInternetMbps: 230,
      trabajoRemoto: 82,
      puntuacionTecnologica: 91,
    },
    ecosistema: {
      hubsPrincipales: ["Estocolmo", "Gotemburgo", "Malmö"],
      empresasDestacadas: ["Spotify", "Klarna", "Mojang", "Epidemic Sound"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 34,
      salariosPorNivel: { junior: 40000, mid: 56000, senior: 76000, lead: 98000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "CHE",
    codigoIso2: "CH",
    nombre: "Suiza",
    capital: "Berna",
    continente: "Europa",
    coordenadas: [7.45, 46.95],
    indicadores: {
      salarioMedioUsd: 118000, // Estimación: CHF 110-120k × 1.10 ≈ $121-132k; $118k punto conservador (Glassdoor CH, jobup.ch 2024) — orientativo
      empresasTecnologicas: 12000,
      empresasIa: 800,
      costeDeVida: 90,
      velocidadInternetMbps: 225,
      trabajoRemoto: 78,
      puntuacionTecnologica: 93,
    },
    ecosistema: {
      hubsPrincipales: ["Zúrich", "Ginebra", "Berna"],
      empresasDestacadas: ["Zurich Insurance", "UBS", "SIX Group"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 22,
      salariosPorNivel: { junior: 75000, mid: 108000, senior: 140000, lead: 172000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "EST",
    codigoIso2: "EE",
    nombre: "Estonia",
    capital: "Tallin",
    continente: "Europa",
    coordenadas: [24.75, 59.44],
    indicadores: {
      salarioMedioUsd: 48000, // Estimación: €38-48k ÷ 1.08 ≈ $35-44k; $48k incluye empresas tech internacionales presentes en Estonia (Glassdoor EE, Palgad.ee 2024) — orientativo
      empresasTecnologicas: 4200,
      empresasIa: 280,
      costeDeVida: 52,
      velocidadInternetMbps: 195,
      trabajoRemoto: 74,
      puntuacionTecnologica: 78,
    },
    ecosistema: {
      hubsPrincipales: ["Tallin"],
      empresasDestacadas: ["Skype", "TransferWise", "Bolt", "Pipedrive"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 20,
      salariosPorNivel: { junior: 28000, mid: 44000, senior: 60000, lead: 76000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "IRL",
    codigoIso2: "IE",
    nombre: "Irlanda",
    capital: "Dublín",
    continente: "Europa",
    coordenadas: [-6.26, 53.35],
    indicadores: {
      salarioMedioUsd: 80000, // Estimación: rango €68-80k en Dublín ÷ 1.08 ≈ $63-74k; $80k ajustado por peso de multinacionales (Glassdoor IE 2024) — orientativo
      empresasTecnologicas: 8500,
      empresasIa: 600,
      costeDeVida: 76,
      velocidadInternetMbps: 200,
      trabajoRemoto: 72,
      puntuacionTecnologica: 88,
    },
    ecosistema: {
      hubsPrincipales: ["Dublín", "Cork"],
      empresasDestacadas: ["Stripe", "HubSpot", "Intercom"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 28,
      salariosPorNivel: { junior: 45000, mid: 70000, senior: 95000, lead: 122000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "POL",
    codigoIso2: "PL",
    nombre: "Polonia",
    capital: "Varsovia",
    continente: "Europa",
    coordenadas: [21.01, 52.23],
    indicadores: {
      salarioMedioUsd: 38000, // Estimación: PLN 140k ÷ 3.95 ≈ $35k; $38k ajustado por peso B2B/senior (NoFluffJobs, Glassdoor PL 2024) — orientativo
      empresasTecnologicas: 14000,
      empresasIa: 600,
      costeDeVida: 44,
      velocidadInternetMbps: 175,
      trabajoRemoto: 66,
      puntuacionTecnologica: 72,
    },
    ecosistema: {
      hubsPrincipales: ["Varsovia", "Cracovia", "Breslavia"],
      empresasDestacadas: ["CD Projekt", "Docplanner", "Allegro"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 19,
      salariosPorNivel: { junior: 20000, mid: 34000, senior: 50000, lead: 64000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "PRT",
    codigoIso2: "PT",
    nombre: "Portugal",
    capital: "Lisboa",
    continente: "Europa",
    coordenadas: [-9.14, 38.74],
    indicadores: {
      salarioMedioUsd: 34000, // Estimación: €28-38k ÷ 1.08 ≈ $26-35k; $34k en el rango medio-alto (Glassdoor PT, PayScale PT 2024) — orientativo
      empresasTecnologicas: 7500,
      empresasIa: 350,
      costeDeVida: 48,
      velocidadInternetMbps: 185,
      trabajoRemoto: 70,
      puntuacionTecnologica: 68,
    },
    ecosistema: {
      hubsPrincipales: ["Lisboa", "Oporto", "Braga"],
      empresasDestacadas: ["OutSystems", "Farfetch", "Feedzai"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 22,
      salariosPorNivel: { junior: 18000, mid: 28000, senior: 42000, lead: 55000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },

  // ─── Asia ───
  {
    codigo: "IND",
    codigoIso2: "IN",
    nombre: "India",
    capital: "Nueva Delhi",
    continente: "Asia",
    coordenadas: [77.21, 28.61],
    indicadores: {
      salarioMedioUsd: 17000, // Estimación: AmbitionBox mediana ₹8,2 LPA ≈ $9.800; $17k como referencia amplia incluyendo empresas de producto (AmbitionBox, Glassdoor IN 2024) — orientativo, alta varianza
      empresasTecnologicas: 25000,
      empresasIa: 1800,
      costeDeVida: 22,
      velocidadInternetMbps: 80,
      trabajoRemoto: 52,
      puntuacionTecnologica: 65,
    },
    ecosistema: {
      hubsPrincipales: ["Bangalore", "Hyderabad", "Pune"],
      empresasDestacadas: ["Infosys", "Wipro", "Zepto", "Meesho"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 20,
      salariosPorNivel: { junior: 8000, mid: 14000, senior: 24000, lead: 32000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "SGP",
    codigoIso2: "SG",
    nombre: "Singapur",
    capital: "Singapur",
    continente: "Asia",
    coordenadas: [103.82, 1.35],
    indicadores: {
      salarioMedioUsd: 75000, // Estimación: SGD 85-100k ÷ 1.35 ≈ $63-74k; $75k ajustado para perfil SE en sector tech (Glassdoor SG, MyCareersFuture 2024) — orientativo
      empresasTecnologicas: 18000,
      empresasIa: 1200,
      costeDeVida: 78,
      velocidadInternetMbps: 280,
      trabajoRemoto: 65,
      puntuacionTecnologica: 92,
    },
    ecosistema: {
      hubsPrincipales: ["Singapur"],
      empresasDestacadas: ["Sea", "Grab", "Razer", "Trax"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 18,
      salariosPorNivel: { junior: 44000, mid: 68000, senior: 94000, lead: 118000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "JPN",
    codigoIso2: "JP",
    nombre: "Japón",
    capital: "Tokio",
    continente: "Asia",
    coordenadas: [139.69, 35.69],
    indicadores: {
      salarioMedioUsd: 54000, // Estimación: mercado dual — general japonés ¥6-7M (≈$40-47k), empresas internacionales ¥8,5M (TokyoDev 2024); $54k referencia mixta — confianza media, ver nota
      empresasTecnologicas: 20000,
      empresasIa: 1400,
      costeDeVida: 62,
      velocidadInternetMbps: 195,
      trabajoRemoto: 55,
      puntuacionTecnologica: 85,
    },
    ecosistema: {
      hubsPrincipales: ["Tokio", "Osaka", "Kioto"],
      empresasDestacadas: ["Sony", "NTT", "Mercari", "Preferred Networks"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 30,
      salariosPorNivel: { junior: 32000, mid: 48000, senior: 66000, lead: 88000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "KOR",
    codigoIso2: "KR",
    nombre: "Corea del Sur",
    capital: "Seúl",
    continente: "Asia",
    coordenadas: [126.98, 37.57],
    indicadores: {
      salarioMedioUsd: 58000, // Estimación: ₩75-90M KRW ÷ 1.370 ≈ $55-66k; $58k punto central (Glassdoor KR 2024) — orientativo
      empresasTecnologicas: 22000,
      empresasIa: 1600,
      costeDeVida: 56,
      velocidadInternetMbps: 285,
      trabajoRemoto: 48,
      puntuacionTecnologica: 88,
    },
    ecosistema: {
      hubsPrincipales: ["Seúl", "Busan"],
      empresasDestacadas: ["Samsung", "Kakao", "Naver", "Krafton"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 24,
      salariosPorNivel: { junior: 34000, mid: 52000, senior: 72000, lead: 92000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "CHN",
    codigoIso2: "CN",
    nombre: "China",
    capital: "Pekín",
    continente: "Asia",
    coordenadas: [116.41, 39.9],
    indicadores: {
      salarioMedioUsd: 52000, // Estimación: ¥380-420k/año en Beijing/Shanghai/Shenzhen ÷ 7.2 ≈ $53-58k; SOLO grandes hubs tech — no representa mercado nacional (whatisthesalary.com 2024) — confianza baja
      empresasTecnologicas: 180000,
      empresasIa: 8500,
      costeDeVida: 45,
      velocidadInternetMbps: 190,
      trabajoRemoto: 30,
      puntuacionTecnologica: 85,
    },
    ecosistema: {
      hubsPrincipales: ["Pekín", "Shenzhen", "Hangzhou", "Shanghái"],
      empresasDestacadas: ["Tencent", "Alibaba", "ByteDance", "Baidu"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 25,
      salariosPorNivel: { junior: 25000, mid: 42000, senior: 65000, lead: 85000 }, // Desglose estimado por nivel de experiencia (hubs tech) — orientativo
    },
  },
  {
    codigo: "ISR",
    codigoIso2: "IL",
    nombre: "Israel",
    capital: "Jerusalén",
    continente: "Asia",
    coordenadas: [35.22, 31.77],
    indicadores: {
      salarioMedioUsd: 92000, // Estimación: rango $70-120k mercado tech israelí; $92k punto medio (Glassdoor IL, arc.dev 2024) — orientativo
      empresasTecnologicas: 8000,
      empresasIa: 1100,
      costeDeVida: 74,
      velocidadInternetMbps: 175,
      trabajoRemoto: 72,
      puntuacionTecnologica: 90,
    },
    ecosistema: {
      hubsPrincipales: ["Tel Aviv", "Herzliya", "Beersheba"],
      empresasDestacadas: ["Wix", "Mobileye", "Cato Networks"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 30,
      salariosPorNivel: { junior: 58000, mid: 84000, senior: 116000, lead: 145000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "ARE",
    codigoIso2: "AE",
    nombre: "Emiratos Árabes",
    capital: "Abu Dabi",
    continente: "Asia",
    coordenadas: [54.37, 24.45],
    indicadores: {
      salarioMedioUsd: 85000, // Estimación: rango $70-120k (AED tax-free, alta dispersión por empresa y origen del profesional); $85k punto medio (Glassdoor UAE 2024) — confianza baja
      empresasTecnologicas: 9000,
      empresasIa: 650,
      costeDeVida: 68,
      velocidadInternetMbps: 185,
      trabajoRemoto: 55,
      puntuacionTecnologica: 82,
    },
    ecosistema: {
      hubsPrincipales: ["Dubái", "Abu Dabi"],
      empresasDestacadas: ["Careem", "Property Finder", "Kitopi"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 5,
      salariosPorNivel: { junior: 48000, mid: 78000, senior: 110000, lead: 140000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },

  // ─── Oceanía ───
  {
    codigo: "AUS",
    codigoIso2: "AU",
    nombre: "Australia",
    capital: "Canberra",
    continente: "Oceanía",
    coordenadas: [149.13, -35.28],
    indicadores: {
      salarioMedioUsd: 82000, // Estimación: AUD 110k ÷ 1.55 ≈ $71k; AUD 130k ÷ 1.55 ≈ $84k; $82k punto alto del rango (Hays Australia, Glassdoor AU 2024) — orientativo
      empresasTecnologicas: 22000,
      empresasIa: 1400,
      costeDeVida: 72,
      velocidadInternetMbps: 175,
      trabajoRemoto: 75,
      puntuacionTecnologica: 86,
    },
    ecosistema: {
      hubsPrincipales: ["Sídney", "Melbourne", "Brisbane"],
      empresasDestacadas: ["Atlassian", "Canva", "Afterpay"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 32,
      salariosPorNivel: { junior: 48000, mid: 76000, senior: 104000, lead: 130000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "NZL",
    codigoIso2: "NZ",
    nombre: "Nueva Zelanda",
    capital: "Wellington",
    continente: "Oceanía",
    coordenadas: [174.78, -41.29],
    indicadores: {
      salarioMedioUsd: 62000, // Estimación: NZD 100k ÷ 1.62 ≈ $62k (Seek NZ, Glassdoor NZ 2024) — orientativo
      empresasTecnologicas: 6500,
      empresasIa: 380,
      costeDeVida: 68,
      velocidadInternetMbps: 150,
      trabajoRemoto: 70,
      puntuacionTecnologica: 78,
    },
    ecosistema: {
      hubsPrincipales: ["Auckland", "Wellington", "Christchurch"],
      empresasDestacadas: ["Xero", "Pushpay", "Vend"],
      visaNomadaDigital: true,
      impuestosAproximadosPorcentaje: 30,
      salariosPorNivel: { junior: 36000, mid: 56000, senior: 78000, lead: 96000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },

  // ─── África ───
  {
    codigo: "NGA",
    codigoIso2: "NG",
    nombre: "Nigeria",
    capital: "Abuya",
    continente: "África",
    coordenadas: [7.49, 9.06],
    indicadores: {
      salarioMedioUsd: 14000, // Estimación: rango $8-18k mercado local; $14k punto conservador (Glassdoor NG, toku.com 2024) — confianza baja, alta varianza
      empresasTecnologicas: 4500,
      empresasIa: 280,
      costeDeVida: 22,
      velocidadInternetMbps: 30,
      trabajoRemoto: 42,
      puntuacionTecnologica: 38,
    },
    ecosistema: {
      hubsPrincipales: ["Lagos", "Abuja"],
      empresasDestacadas: ["Flutterwave", "Paystack", "Andela"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 14,
      salariosPorNivel: { junior: 7000, mid: 12000, senior: 20000, lead: 28000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "KEN",
    codigoIso2: "KE",
    nombre: "Kenia",
    capital: "Nairobi",
    continente: "África",
    coordenadas: [36.82, -1.29],
    indicadores: {
      salarioMedioUsd: 18000, // Estimación: rango $12-25k; $18k punto conservador (outsourcing.ke, careerbuddy.blog 2024) — confianza baja
      empresasTecnologicas: 2800,
      empresasIa: 150,
      costeDeVida: 25,
      velocidadInternetMbps: 45,
      trabajoRemoto: 48,
      puntuacionTecnologica: 42,
    },
    ecosistema: {
      hubsPrincipales: ["Nairobi (Silicon Savannah)"],
      empresasDestacadas: ["M-Pesa", "Cellulant", "Wasoko"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 16,
      salariosPorNivel: { junior: 9000, mid: 16000, senior: 26000, lead: 34000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "ZAF",
    codigoIso2: "ZA",
    nombre: "Sudáfrica",
    capital: "Pretoria",
    continente: "África",
    coordenadas: [28.19, -25.75],
    indicadores: {
      salarioMedioUsd: 25000, // Estimación: R450k ÷ 18,3 ≈ $24,6k (Glassdoor ZA, PayScale ZA 2024) — orientativo
      empresasTecnologicas: 5800,
      empresasIa: 380,
      costeDeVida: 30,
      velocidadInternetMbps: 55,
      trabajoRemoto: 52,
      puntuacionTecnologica: 50,
    },
    ecosistema: {
      hubsPrincipales: ["Ciudad del Cabo", "Johannesburgo"],
      empresasDestacadas: ["Takealot", "Yoco", "Jumo"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 24,
      salariosPorNivel: { junior: 13000, mid: 22000, senior: 36000, lead: 48000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
  {
    codigo: "EGY",
    codigoIso2: "EG",
    nombre: "Egipto",
    capital: "El Cairo",
    continente: "África",
    coordenadas: [31.24, 30.04],
    indicadores: {
      salarioMedioUsd: 14000, // Estimación: rango $10-20k mercado local; $14k punto conservador (Glassdoor EG 2024) — confianza baja
      empresasTecnologicas: 3500,
      empresasIa: 200,
      costeDeVida: 20,
      velocidadInternetMbps: 50,
      trabajoRemoto: 35,
      puntuacionTecnologica: 40,
    },
    ecosistema: {
      hubsPrincipales: ["El Cairo", "Alejandría"],
      empresasDestacadas: ["Swvl", "Instabug", "Vezeeta"],
      visaNomadaDigital: false,
      impuestosAproximadosPorcentaje: 18,
      salariosPorNivel: { junior: 7000, mid: 12000, senior: 20000, lead: 28000 }, // Desglose estimado por nivel de experiencia — orientativo
    },
  },
];
