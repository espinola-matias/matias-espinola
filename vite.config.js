import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// Los comentarios de JS y CSS ya los borra el minificador, pero los de HTML
// sobreviven y quedan a la vista de cualquiera que inspeccione la página.
// Se van sólo en el build: el código fuente sigue documentado.
const quitarComentariosHtml = {
    name: 'quitar-comentarios-html',
    apply: 'build',
    transformIndexHtml: {
        order: 'post',
        handler: (html) =>
            html
                .replace(/<!--[\s\S]*?-->/g, '')
                .replace(/\n\s*\n+/g, '\n'),
    },
};

// Dominio público del sitio. Si algún día se cambia por uno propio, hay que
// tocarlo acá y en las etiquetas canonical/og de index.html.
const SITIO = 'https://matias-espinola.pages.dev';

// Fecha del último cambio de CONTENIDO real (texto, enlaces, datos
// estructurados) — no la de cada build. Google es explícito con esto: si nota
// que <lastmod> cambia en cada visita sin que el contenido cambie, deja de
// confiarle esa fecha al sitemap entero. Se actualiza a mano acá cada vez que
// se toca contenido de la página (no por retoques de CSS o de build).
const ULTIMA_MODIFICACION_CONTENIDO = '2026-09-12';

// El sitemap se emite en el build en vez de vivir suelto en public/ para que
// no se pueda olvidar ahí desactualizado: esta es la única fuente del dato.
//
// Sin changefreq/priority ni image:title: Google los ignora para ranking y
// crawl, y Google ya no usa image:title para resultados de imágenes — dejarlos
// no rompe nada, pero tampoco aporta, así que el sitemap queda más simple.
const generarSitemap = {
    name: 'generar-sitemap',
    apply: 'build',
    generateBundle() {
        this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITIO}/</loc>
    <lastmod>${ULTIMA_MODIFICACION_CONTENIDO}</lastmod>
    <image:image>
      <image:loc>${SITIO}/perfil-864.jpg</image:loc>
    </image:image>
  </url>
</urlset>
`,
        });
    },
};

export default defineConfig({
    plugins: [tailwindcss(), quitarComentariosHtml, generarSitemap],
});
