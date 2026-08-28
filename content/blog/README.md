# Blog — cómo escribir un post

Cada `.mdx` de esta carpeta es un post. No hay que registrarlo en ningún lado:
[`lib/blog.ts`](../../lib/blog.ts) lee el directorio y
[`app/blog/[slug]/page.tsx`](../../app/blog/[slug]/page.tsx) genera la ruta en el build.

## Frontmatter

```yaml
---
title: "Título del post"          # obligatorio: sin él, el archivo se ignora
date: "2026-08-26"                # YYYY-MM-DD, ordena el índice
category: "Technical"             # etiqueta libre que sale en el listado
tags: ["Bayesian", "R"]
description: "Una o dos frases; aparece en el índice y en el <meta>."
readTime: "12 min"                # opcional; si falta se estima del texto
draft: true                       # opcional; lo saca del build
---
```

Un archivo cuyo nombre empieza por `_` tampoco entra al build.

## Qué se puede usar

| Cosa | Cómo |
|---|---|
| Markdown | Todo GFM: tablas, footnotes `[^1]`, tachado, listas de tareas |
| Matemáticas | `$inline$` y `$$display$$` — KaTeX corre en el build, no manda JS |
| Código | ```` ```r title="fit.R" showLineNumbers {12-18} ```` |
| Componentes | Cualquiera registrado en [`components/mdx/mdx-body.tsx`](../../components/mdx/mdx-body.tsx), sin `import` |

## Componentes disponibles

Genéricos, sirven en cualquier post:

```mdx
<Callout variant="insight" title="Opcional">
Markdown normal aquí dentro.
</Callout>
```

`variant` es `note` | `warning` | `insight` | `aside`.

```mdx
<Figure
  src="/blog/mi-figura.gif"
  alt="Texto alternativo"
  caption="Pie de figura."
/>
```

Sirve igual para PNG, SVG animado o GIF. Los archivos van en `public/blog/`.

```mdx
<Wide>
  <MiComponente />
</Wide>
```

`Wide` saca un bloque del ancho de lectura (68ch) para mapas y gráficas.

## Componentes interactivos

Los del post de ejemplo viven en [`components/mdx/demos/`](../../components/mdx/demos/):
`Pm25Map` (campo continuo en canvas + isolíneas), `MaternExplorer` (sliders +
framer-motion) y `PosteriorChart` (SVG a mano, con vista de tabla).

### El sistema de figuras

La regla: **la tinta codifica los datos, el naranja codifica la interacción.**
Las series se distinguen por forma (línea sólida, mancha, círculo abierto), no
por color, igual que en una figura impresa. El acento queda reservado para lo que
el lector está señalando: crosshair, marcador activo, control seleccionado. Así
el acento significa algo y las figuras sobreviven a una impresión en blanco y
negro.

- [`viz.ts`](../../components/mdx/demos/viz.ts) — las dos rampas secuenciales
  (casi acromáticas, una por tema, cada una escalonada contra su propia
  superficie) y las especificaciones de marca.
- [`figure-frame.tsx`](../../components/mdx/demos/figure-frame.tsx) — el marco:
  sin tarjeta ni relleno, reglas finas arriba y abajo, pie numerado, y controles
  discretos (`Segmented`, `Slider`, `ControlLabel`).

Tipografía: **dentro de una figura todo va en la sans del sitio**, en caja normal
y sin tracking, con `tabular-nums` solo donde los dígitos deben alinearse (marcas
de eje, columnas de tabla, lecturas que cambian al pasar el cursor). El mono en
mayúsculas con tracking es la voz del sitio para marcadores de sección —
cabeceras, etiquetas de callout — y a tamaño pequeño dentro de una gráfica se lee
mecánico. Los `<text>` de SVG sin `className` heredan la sans solos.

El número de figura se pasa desde el `.mdx` (`<Pm25Map n={1} />`), no desde el
componente, para que el mismo componente sirva en otro post.

Dos trampas de Tailwind que ya me mordieron aquí:

- Un valor arbitrario **con comas** se descarta en silencio:
  `grid-cols-[minmax(0,1fr)_1fr]` no genera nada. Usa `grid-cols-[0.44fr_1fr]`.
- El **modificador de opacidad no funciona** sobre colores definidos como
  `var()`: `bg-brand/15` no produce ninguna regla. Usa `color-mix` en un `style`.

Para uno nuevo:

1. Créalo en `components/mdx/demos/` con `"use client"` arriba.
2. Regístralo en el objeto `components` de `components/mdx/mdx-body.tsx`.
3. Úsalo por nombre en el `.mdx`.

Sólo los posts que lo usan cargan su JavaScript.

### Colores y tema

Usa los tokens del sitio (`var(--brand)`, `var(--fg2)`, `var(--line)`, …) dentro
de SVG y de props de librerías: cambian solos entre claro y oscuro. Si un
componente necesita leer el tema en JS, usa `useTheme()` de
`contexts/theme-context` y espera a `mounted` antes de pintar colores, para que
no parpadee.

## Cuidado con MDX

`{` y `}` son sintaxis JSX fuera de las matemáticas y de los bloques de código.
Si un párrafo necesita llaves literales, escápalas (`\{`) o mete el fragmento en
`` `código` ``. Lo mismo con `<` seguido de letra.

## Ver el resultado

```bash
npm run dev     # http://localhost:3000/blog
npm run build   # export estático, valida KaTeX y Shiki
```
