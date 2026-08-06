# Atlas Tecnológico Mundial

Atlas Tecnológico Mundial es una plataforma web interactiva para explorar el ecosistema tecnológico de distintos países mediante un mapa, estadísticas, gráficos y comparativas.

El proyecto busca ofrecer una experiencia de producto SaaS moderna, cuidada y fácil de entender. Los datos serán estáticos al inicio para centrarnos en la experiencia de usuario y en la calidad del frontend.

## Tecnologías

- Next.js y React
- TypeScript con modo estricto
- Tailwind CSS
- ESLint y Prettier

El resto de librerías de interfaz y visualización se incorporará cuando se utilicen en una funcionalidad concreta.

## Estructura inicial

```text
src/
  app/          # Rutas y estilos globales de Next.js
  components/   # Componentes visuales reutilizables
  data/         # Datos estáticos del producto
  features/     # Funcionalidades agrupadas por dominio
  lib/          # Utilidades pequeñas y compartidas
  types/        # Tipos TypeScript compartidos
```

Las carpetas crecerán de forma progresiva: solo añadiremos archivos cuando una funcionalidad los necesite.

## Desarrollo local

```bash
npm install
npm run dev
```

También están disponibles los comandos `npm run lint`, `npm run lint:fix`, `npm run format` y `npm run format:check`.
