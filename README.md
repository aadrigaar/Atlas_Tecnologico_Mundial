# 🌍 Atlas Tecnológico Mundial

> **Plataforma SaaS interactiva para la exploración de ecosistemas tecnológicos, salarios de ingeniería de software, coste de vida y hubs de innovación globales.**

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-Interactive-blueviolet?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-f08?style=flat-square)

---

## 📌 Descripción del Proyecto

He construido **Atlas Tecnológico Mundial** como mi proyecto principal de portfolio tras graduarme en **Ingeniería Informática**. Mi objetivo ha sido desarrollar un producto web **SaaS real de nivel profesional**, inspirado en la elegancia visual de referencias como _FiscalMap_, _Stripe_, _Linear_ y _Vercel_.

La plataforma permite a desarrolladores, reclutadores e investigadores analizar el panorama tecnológico de **32 países** en **6 continentes**, evaluando variables fundamentales como salario medio en software engineering, poder adquisitivo real (relación salario vs coste de vida), velocidad de internet, adopción de trabajo remoto y hubs de innovación.

---

## 🚀 Funcionalidades Principales

### 🗺️ 1. Mapa Coroplético Interactivo (Natural Earth GeoJSON)

- Representación visual del mundo mediante mapa oscuro interactivo (**MapLibre GL** y **CARTO Dark Matter**).
- Capa de datos **GeoJSON** que colorea dinámicamente los polígonos de cada país según el indicador seleccionado.
- Hover reactivo con iluminación de fronteras y selección con un solo clic.
- Marcadores puntuales personalizados con escala de nivel (_Alto_, _Medio_, _Bajo_).

### 📋 2. Ficha Extendida & Informe del Ecosistema de País (`ModalInformePais`)

- Modal detallado animado con **Framer Motion** dividido en 4 pestañas:
  - 📊 **Vista General**: Puntuación de madurez tecnológica, poder adquisitivo, radar chart y puntos fuertes.
  - 💼 **Salarios por Experiencia**: Desglose por rango (_Junior_, _Mid_, _Senior_, _Lead/Architect_) en gráfica de barras y estimación de salario neto post-impuestos (IRPF).
  - 🏢 **Hubs & Unicornios Emblemáticos**: Principales ciudades tecnológicas y empresas nacidas u operando en el país.
  - ✈️ **Calidad de Vida & Remoto**: Banda ancha, porcentaje de adopción de trabajo remoto y disponibilidad de visado para nómadas digitales.

### 📈 3. Matriz de Poder Adquisitivo ("Developer Value Matrix")

- Gráfico de dispersión (_Scatter Plot_ con **Recharts**) que cruza **Salario Medio USD** (Eje Y) vs **Coste de Vida** (Eje X).
- Clasificación visual en 4 cuadrantes:
  - 🟢 **Paraíso Developer**: Alto salario y bajo coste de vida (_Sweet Spot_).
  - 🔵 **Mercado Maduro**: Alto salario y alto coste de vida.
  - 🟡 **Ecosistema Emergente**: Bajo salario y bajo coste de vida.
  - 🔴 **Mercado Desfavorable**: Bajo salario y alto coste de vida.

### ⚖️ 4. Comparador Avanzado Multipaís (Hasta 3 Países)

- Selección y comparación simultánea de hasta **3 países**.
- **Radar Chart Superpuesto**: Comparativa radial simultánea de las 6 dimensiones del perfil tecnológico.
- **Gráfica de Salarios Comparada**: Desglose salarial por seniority lado a lado.
- **Tabla de 12 Métricas**: Análisis directo de todas las variables con identificación del país ganador.
- **Exportación de Informe**: Opción para copiar una ficha de resumen formateada al portapapeles.

### 📊 5. Insights y Analítica Global

- Panel de métricas agregadas globales:
  - Salario medio global en software engineering ($71,250 USD).
  - Gráfico _Donut_ de distribución de empresas tecnológicas por continente.
  - Leaderboard de países líderes en salario y velocidad de internet.

### 📋 6. Tabla de Ecosistemas & Filtros Avanzados

- **Tabla de Datos Interactiva**: Buscador en vivo, ordenación multi-columna y acciones rápidas.
- **Drawer de Filtros Avanzados**: Sliders para rango de salario, velocidad de internet, puntuación mínima e interruptor de visa para nómadas digitales con contador de resultados en tiempo real.
- **Barra de Navegación Móvil Flotante**: Experiencia responsive optimizada para smartphones y tablets.

---

## 🛠️ Stack Tecnológico & Arquitectura

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Biblioteca de Interfaz**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Modo Estricto)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Mapas**: [MapLibre GL](https://maplibre.org/)
- **Gráficos & Visualización**: [Recharts](https://recharts.org/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Iconos**: [Lucide Icons](https://lucide.dev/)
- **Calidad de Código**: ESLint & Prettier

### 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── globals.css           # Tokens de color Oklch, utilidades y estilos del mapa
│   ├── layout.tsx            # Metadata SEO, OpenGraph y fuentes Geist
│   ├── loading.tsx           # Pantalla de carga skeleton
│   ├── not-found.tsx         # Página 404 personalizada
│   └── page.tsx              # Orquestador principal de estado y vistas
├── components/
│   ├── graficos/             # Matriz de dispersión y radar chart de perfiles
│   ├── layout/               # Cabecera, panel explorador, modales de insights y navegación móvil
│   ├── mapa/                 # Componente de mapa coroplético MapLibre GL
│   ├── paises/               # Modal de informe, comparador avanzad, tabla y filtros
│   └── ui/                   # Componentes base shadcn/ui y notificaciones toast
├── data/
│   └── paises.ts             # Dataset enriquecido de 32 países y 6 continentes
└── types/
    ├── indicador.ts          # Tipos de indicadores de mapa
    └── pais.ts               # Interfaces TypeScript de País y Ecosistema
```

---

## 💻 Desarrollo Local

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/atlas-tecnologico-mundial.git
   cd atlas-tecnologico-mundial
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## ⚙️ Comandos de Calidad

- **Verificación de Tipos y Construcción de Producción:**
  ```bash
  npm run build
  ```
- **Auditoría de Linter (ESLint):**
  ```bash
  npm run lint
  ```
- **Verificación de Formato (Prettier):**
  ```bash
  npm run format:check
  ```
- **Formatear Código:**
  ```bash
  npm run format
  ```

---

## 📌 Limitaciones Actuales & Decisiones Técnicas

- **Datos de Demostración**: El producto utiliza un conjunto de datos estáticos cuidadosamente tipados y estructurados (`src/data/paises.ts`) para garantizar respuestas instantáneas en el frontend sin latencia de red.
- **Renderizado del Mapa**: La capa coroplética obtiene los polígonos GeoJSON de la CDN de Natural Earth al iniciar el componente del mapa, manteniendo un fallback por marcadores en caso de desconexión.

---

## 🔮 Futuras Mejoras

- [ ] **API Backend**: Integrar una API en Node.js/Go para consultar datos en vivo desde bases de datos externas (como Numbeo o Github Jobs API).
- [ ] **Histórico Temporal**: Incorporar gráficos de líneas para mostrar la evolución salarial a lo largo de los últimos 5 años.
- [ ] **Marcadores Personalizados**: Permitir al usuario guardar sus países favoritos o crear rutas de migración laboral.

---

## 🌐 Despliegue en Producción

El proyecto está preparado para desplegarse de forma óptima en **Vercel**:

1. Conecta el repositorio de GitHub con Vercel.
2. La configuración por defecto detectará automáticamente Next.js.
3. El comando de build ejecutará `next build` generando páginas estáticas de alto rendimiento.

---

## 👤 Autor

**Adrián García Arranz**

- Graduado en Ingeniería Informática
- Perfil: Software Engineer / Junior Software Engineer / Backend Developer
- LinkedIn: [Adrián García Arranz](#)
- GitHub: [github.com](#)

---

_Desarrollado con dedicación para ofrecer un producto tecnológico funcional, accesible y visualmente impecable._
