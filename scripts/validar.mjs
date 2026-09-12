/* ═══════════════════════════════════════════
   validar.mjs — Verificaciones del portafolio

   Corre con `npm test`. Sin dependencias: sólo Node.

   Cada verificación de acá nació de un bug real que ya pasó una vez en este
   proyecto. La idea no es tener "tests por tener": es que ninguno de esos
   errores pueda volver a subirse sin que alguien se entere.
   ═══════════════════════════════════════════ */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const html = readFileSync('index.html', 'utf8');
const js = readFileSync('src/main.js', 'utf8');

const errores = [];
const avisos = [];

function fallar(regla, detalle) {
    errores.push(`${regla}\n      ${detalle}`);
}

// ═══════════════════════════════════════════
// 1. Referencias internas: todo /algo tiene que existir en disco
// ═══════════════════════════════════════════
{
    const urls = new Set();
    for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) urls.add(m[1]);
    // srcset: "archivo 432w, archivo 864w" — el descriptor va tras el último espacio
    for (const m of html.matchAll(/srcset="([^"]+)"/g)) {
        for (const parte of m[1].split(',')) {
            const url = parte.trim().replace(/\s+\S+$/, '');
            if (url.startsWith('/')) urls.add(url);
        }
    }

    for (const url of [...urls].sort()) {
        // /src/* vive en la raíz del proyecto; el resto en public/
        const ruta = url.startsWith('/src/') ? url.slice(1) : join('public', url);
        if (!existsSync(ruta)) fallar('Referencia rota', `${url} → no existe ${ruta}`);
    }
}

// ═══════════════════════════════════════════
// 2. i18n: toda clave usada en el HTML existe, y en los DOS idiomas
// ═══════════════════════════════════════════
{
    // Extrae las claves de cada bloque de idioma del objeto `translations`
    function clavesDe(idioma) {
        const inicio = js.indexOf(`        ${idioma}: {`);
        if (inicio === -1) return null;
        const fin = js.indexOf('\n        },', inicio);
        const bloque = js.slice(inicio, fin);
        return new Set([...bloque.matchAll(/^\s+'([^']+)':/gm)].map((m) => m[1]));
    }

    const es = clavesDe('es');
    const en = clavesDe('en');

    if (!es || !en) {
        fallar('i18n', 'no se pudieron leer los bloques es/en de `translations` en main.js');
    } else {
        // 2a. Claves del HTML que no están traducidas
        const usadas = new Set(
            [...html.matchAll(/data-i18n(?:-title|-label)?="([^"]+)"/g)].map((m) => m[1])
        );
        for (const clave of [...usadas].sort()) {
            if (!es.has(clave)) fallar('Clave i18n sin traducir', `${clave} falta en 'es'`);
            if (!en.has(clave)) fallar('Clave i18n sin traducir', `${clave} falta en 'en'`);
        }

        // 2b. Paridad: los dos idiomas tienen que tener exactamente las mismas claves
        for (const clave of [...es].sort()) {
            if (!en.has(clave)) fallar('i18n desparejo', `${clave} está en 'es' pero no en 'en'`);
        }
        for (const clave of [...en].sort()) {
            if (!es.has(clave)) fallar('i18n desparejo', `${clave} está en 'en' pero no en 'es'`);
        }
    }
}

// ═══════════════════════════════════════════
// 3. Etiquetas balanceadas
//    (sólo elementos que siempre cierran; los primitivos SVG se autocierran)
// ═══════════════════════════════════════════
{
    const limpio = html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');

    for (const tag of ['div', 'a', 'ul', 'li', 'section', 'span', 'article', 'button', 'form', 'p', 'h1', 'h2', 'h3', 'nav', 'footer']) {
        const abre = (limpio.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
        const cierra = (limpio.match(new RegExp(`</${tag}>`, 'g')) || []).length;
        if (abre !== cierra) fallar('Etiquetas desbalanceadas', `<${tag}>: ${abre} abre / ${cierra} cierra`);
    }
}

// ═══════════════════════════════════════════
// 4. Enlaces externos con rel="noopener"
// ═══════════════════════════════════════════
for (const m of html.matchAll(/<a[^>]*target="_blank"[^>]*>/g)) {
    if (!m[0].includes('noopener')) fallar('target=_blank sin noopener', m[0].slice(0, 90));
}

// ═══════════════════════════════════════════
// 5. <a> anidados — HTML inválido, rompe el click
// ═══════════════════════════════════════════
{
    let prof = 0;
    for (const m of html.matchAll(/<a\b|<\/a>/g)) {
        prof += m[0] === '</a>' ? -1 : 1;
        if (prof > 1) {
            fallar('Enlaces anidados', `hay un <a> dentro de otro <a> cerca del índice ${m.index}`);
            break;
        }
    }
}

// ═══════════════════════════════════════════
// 6. Accesibilidad básica
// ═══════════════════════════════════════════
{
    // 6a. Imágenes sin alt
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
        if (!/\salt=/.test(m[0])) fallar('Imagen sin alt', m[0].slice(0, 90));
    }

    // 6b. Botones y enlaces sin nombre accesible
    for (const [tag, re] of [
        ['button', /<button\b([^>]*)>([\s\S]*?)<\/button>/g],
        ['a', /<a\b([^>]*)>([\s\S]*?)<\/a>/g],
    ]) {
        for (const m of html.matchAll(re)) {
            const atributos = m[1];
            const texto = m[2].replace(/<[^>]+>/g, '').trim();
            if (!texto && !atributos.includes('aria-label')) {
                fallar(`<${tag}> sin nombre accesible`, atributos.slice(0, 90).trim());
            }
        }
    }

    // 6c. Campos de formulario con su <label>
    const conLabel = new Set([...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map((m) => m[1]));
    for (const m of html.matchAll(/<(input|textarea)\b([^>]*)>/g)) {
        const attrs = m[2];
        if (/type="(hidden|checkbox)"/.test(attrs)) continue;
        const id = attrs.match(/id="([^"]+)"/);
        if (!id || !conLabel.has(id[1])) fallar('Campo sin <label>', attrs.slice(0, 90).trim());
    }
}

// ═══════════════════════════════════════════
// 7. Los ids que busca el JS existen en el HTML
// ═══════════════════════════════════════════
for (const m of js.matchAll(/getElementById\('([^']+)'\)/g)) {
    if (!html.includes(`id="${m[1]}"`)) fallar('Id inexistente', `main.js busca #${m[1]}, no está en el HTML`);
}

// ═══════════════════════════════════════════
// 8. Regresiones concretas — cada una es un bug que ya ocurrió
// ═══════════════════════════════════════════
{
    const prohibidos = [
        [
            'bg-indigo-50 dark:bg-indigo-950 text-indigo-500',
            'Chip de tecnología con contraste insuficiente (3.99:1 claro / 3.58:1 oscuro; AA pide 4.5). Usar text-indigo-600 dark:text-indigo-300.',
        ],
        [
            'class="text-xs font-medium text-slate-500"',
            'Label del Tech Stack sin variante dark (3.75:1 en oscuro). Agregar dark:text-slate-400.',
        ],
        [
            '<embed',
            'Los <embed> de PDF no renderizan en iOS ni Android. Usar una miniatura o el bloque de sello.',
        ],
        [
            'min-h-screen',
            'En móvil 100vh mide de más por la barra del navegador. Usar min-h-dvh.',
        ],
    ];

    for (const [patron, motivo] of prohibidos) {
        if (html.includes(patron)) fallar('Regresión', `apareció "${patron}"\n      → ${motivo}`);
    }

    // La sección Novedades no puede volver a tener el hover que desplaza:
    // al moverse deja al cursor afuera y parpadea sin parar en los bordes.
    const iNews = html.indexOf('<section id="news"');
    const iSkills = html.indexOf('<section id="skills"');
    if (iNews !== -1 && iSkills > iNews) {
        const news = html.slice(iNews, iSkills);
        if (news.includes('hover:-translate')) {
            fallar('Regresión', 'volvió el hover que desplaza en #news → parpadea en los bordes');
        }
        // aspect-video estirado por el grid recalcula el ancho desde el alto
        // y se monta sobre el texto: en >=md tiene que quedar apagado.
        const conAspect = (news.match(/aspect-video/g) || []).length;
        const conAuto = (news.match(/md:aspect-auto/g) || []).length;
        if (conAspect !== conAuto) {
            fallar('Regresión', `en #news hay ${conAspect} aspect-video y ${conAuto} md:aspect-auto — tienen que ir de a pares`);
        }
    }
}

// ═══════════════════════════════════════════
// 9. SEO: largos que los buscadores recortan
// ═══════════════════════════════════════════
{
    const meta = html.match(/<meta name="description"\s*\n?\s*content="([^"]*)"/);
    if (!meta) {
        fallar('SEO', 'falta <meta name="description">');
    } else {
        const largo = meta[1].replace(/\s+/g, ' ').trim().length;
        if (largo > 160) fallar('SEO', `meta description de ${largo} caracteres; Bing recorta en 160`);
    }

    const titulo = html.match(/<title>([^<]*)<\/title>/);
    if (!titulo) fallar('SEO', 'falta <title>');
    else if (titulo[1].length > 60) avisos.push(`<title> de ${titulo[1].length} caracteres; Google suele recortar cerca de 60`);

    for (const etiqueta of ['og:title', 'og:description', 'og:image', 'og:url']) {
        if (!html.includes(`property="${etiqueta}"`)) fallar('SEO', `falta la etiqueta ${etiqueta}`);
    }
}

// ═══════════════════════════════════════════
// 10. Artefactos del build (sólo si ya se compiló)
// ═══════════════════════════════════════════
if (existsSync('dist')) {
    for (const archivo of ['index.html', 'sitemap.xml', 'robots.txt', 'favicon.ico', '_headers']) {
        if (!existsSync(join('dist', archivo))) fallar('Build incompleto', `falta dist/${archivo}`);
    }

    if (existsSync('dist/sitemap.xml')) {
        const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
        if (!sitemap.startsWith('<?xml')) fallar('Sitemap', 'no empieza con la declaración <?xml');
        if (!/<loc>https:\/\/[^<]+<\/loc>/.test(sitemap)) fallar('Sitemap', 'no tiene un <loc> con URL absoluta');
    }

    // El original del logo y de la foto no deben terminar en el deploy
    if (existsSync('dist/logo/logo.png')) fallar('Peso', 'dist/logo/logo.png (592 KB) no debería desplegarse: la fuente vive en assets-src/');
    if (existsSync('dist/perfil.jpeg')) fallar('Peso', 'dist/perfil.jpeg (335 KB) no debería desplegarse: la fuente vive en assets-src/');
}

// ═══════════════════════════════════════════
// Resultado
// ═══════════════════════════════════════════
for (const aviso of avisos) console.log(`  aviso  ${aviso}`);

if (errores.length) {
    console.error(`\n✗ ${errores.length} problema(s):\n`);
    for (const e of errores) console.error(`  • ${e}\n`);
    process.exit(1);
}

console.log('\n✓ Todas las verificaciones pasaron.\n');
