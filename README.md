# Atlas Tecnológico Mundial

He creado Atlas Tecnológico Mundial, una plataforma web interactiva para explorar el ecosistema tecnológico de distintos países mediante un mapa, estadísticas, gráficos y comparativas.

Quiero ofrecer una experiencia de producto SaaS moderna, cuidada y fácil de entender. Al inicio trabajaré con datos estáticos para centrarme en la experiencia de usuario y en la calidad del frontend.

## Tecnologías

- Next.js y React
- TypeScript con modo estricto
- Tailwind CSS
- shadcn/ui y Lucide Icons
- ESLint y Prettier

Incorporaré el resto de librerías de interfaz y visualización cuando las necesite en una funcionalidad concreta.

## Estructura que sigo

```text
src/
  app/          # Rutas y estilos globales de Next.js
  components/   # Componentes visuales reutilizables
  data/         # Datos estáticos del producto
  features/     # Funcionalidades agrupadas por dominio
  lib/          # Utilidades pequeñas y compartidas
  types/        # Tipos TypeScript compartidos
```

Haré crecer las carpetas de forma progresiva: solo añadiré archivos cuando una funcionalidad los necesite.

## Desarrollo local

```bash
npm install
npm run dev
```

También tengo disponibles los comandos `npm run lint`, `npm run lint:fix`, `npm run format` y `npm run format:check`.
