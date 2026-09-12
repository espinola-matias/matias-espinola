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

// El sitemap se emite en el build en vez de vivir en public/ para que <lastmod>
// sea siempre la fecha real del deploy: mantenido a mano quedaría viejo al
// primer cambio, y es el único de los tres campos que Google todavía mira.
const generarSitemap = {
    name: 'generar-sitemap',
    apply: 'build',
    generateBundle() {
        const hoy = new Date().toISOString().slice(0, 10);
        this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITIO}/</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITIO}/perfil-864.jpg</image:loc>
      <image:title>Matias Gabriel Espínola Rojas — Software Developer</image:title>
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
