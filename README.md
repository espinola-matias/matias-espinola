# Matías Espínola — Portafolio

Portafolio personal de **Matias Gabriel Espínola Rojas**, Software Developer en Asunción, Paraguay.

**[→ Ver en vivo](https://matias-espinola.pages.dev)**

[![CI](https://github.com/espinola-matias/portafolio-web/actions/workflows/ci.yml/badge.svg)](https://github.com/espinola-matias/portafolio-web/actions/workflows/ci.yml)
![Vite](https://img.shields.io/badge/Vite-7-B73BFE?logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)

---

## Sobre el proyecto

Sitio estático de una sola página, sin framework de UI: **HTML, CSS y JavaScript
vanilla**, compilado con Vite y estilado con Tailwind CSS 4. Bilingüe
(español / inglés), con tema claro y oscuro, y desplegado en Cloudflare Pages.

La decisión de no usar un framework fue deliberada: para un sitio de contenido
mayormente estático, React o similar habría agregado peso y complejidad sin
resolver ningún problema real. **La primera carga pesa ~214 KB en total**,
JavaScript incluido.

### Secciones

`Inicio` · `Proyectos` · `Novedades` · `Tech Stack` · `Certificados` · `Contacto`

- **Proyectos** — repositorios propios, cada uno con su stack
- **Novedades** — sitios en producción hechos para clientes reales
- **Certificados** — formación de AWS, Udemy y Penguin Academy

---

## Stack

| Área | Herramienta |
|---|---|
| Build | Vite 7 |
| Estilos | Tailwind CSS 4 (config en `@theme`, sin `tailwind.config.js`) |
| Lógica | JavaScript vanilla (ES modules, sin dependencias en runtime) |
| Iconos | devicon + SVG inline |
| Hosting | Cloudflare Pages |
| CI | GitHub Actions |

Node 22. Las únicas dependencias son de desarrollo: `vite`, `tailwindcss` y
`@tailwindcss/vite`.

---

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo → http://localhost:5173
npm run build      # build de producción → dist/
npm run preview    # servir el build ya generado
npm test           # verificaciones
npm run verificar  # build + verificaciones (lo mismo que corre CI)
```

---

## Estructura

```
index.html            # todo el markup (una sola página)
src/
  main.js             # i18n, tema, menú, scroll, formulario, certificados, modal
  starfield.js        # fondo de estrellas interactivo en canvas
  style.css           # Tailwind + animaciones propias
public/               # assets servidos tal cual (imágenes, PDFs, robots, _headers)
assets-src/           # originales pesados, fuera del deploy a propósito
scripts/validar.mjs   # verificaciones que corre CI
vite.config.js        # plugins propios: limpieza de comentarios y sitemap
```

`assets-src/` guarda los archivos fuente (el logo original de 1254×1254, la foto
sin recortar). Están fuera de `public/` porque todo lo que vive ahí se copia tal
cual al deploy — mantenerlos afuera evita subir ~930 KB que nadie descarga.

---

## Detalles de implementación

**Bilingüe sin recargar** — 73 claves de traducción en `main.js`. Además del
texto, se traducen `title`, `aria-label`, el `<title>` de la pestaña y la
`meta description`.

**Tema claro/oscuro sin destello** — un script en línea en el `<head>` aplica el
tema guardado antes del primer pintado. Si el usuario nunca eligió, sigue al
sistema operativo; en cuanto elige, esa preferencia manda.

**Fondo de estrellas** — canvas a pantalla completa que reacciona al cursor y
esquiva los textos. En móvil no responde al tacto (dejaba el brillo clavado) y
al scrollear no se regenera, porque la barra del navegador dispara `resize` y
hacía saltar todo el cielo.

**Accesibilidad** — contrastes verificados contra WCAG AA con cálculo real, no a
ojo. Navegación completa por teclado, foco visible, diálogo con `role="dialog"`
que cierra con Escape y devuelve el foco, y estados del formulario anunciados
con `aria-live`.

**Rendimiento** — imágenes recortadas y redimensionadas al tamaño real de uso,
con `srcset`; assets con hash cacheados a un año vía `_headers`; devicon cargado
sin bloquear el render.

**SEO** — Open Graph y Twitter Card, JSON-LD `Person`, canonical, `robots.txt` y
un `sitemap.xml` generado en el build.

---

## CI

Cada push y cada pull request a `main` corren `npm ci` → `npm run build` →
`npm test` en GitHub Actions.

`scripts/validar.mjs` es Node puro, sin dependencias. **Cada verificación nació
de un bug real de este repositorio**, así que funcionan como guardas contra
regresión:

1. Referencias internas rotas (`href` / `src` / `srcset` apuntando a archivos que no existen)
2. Claves `data-i18n` presentes en ambos idiomas, y paridad entre ellos
3. Etiquetas HTML balanceadas
4. `target="_blank"` sin `rel="noopener"`
5. Enlaces anidados
6. Accesibilidad: `alt`, nombres accesibles, campos con `<label>`
7. Ids que el JS busca y no existen en el HTML
8. Regresiones concretas ya corregidas una vez
9. Largos de `meta description` y `<title>`, etiquetas Open Graph
10. Artefactos del build, y que no se cuelen los originales pesados

Un hook opcional bloquea el push si algo falla:

```bash
git config core.hooksPath .githooks
```

---

## Licencia

El código es de libre consulta. El contenido personal —textos, foto,
certificados, CV y logo— no es reutilizable.
