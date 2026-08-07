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

export default defineConfig({
    plugins: [tailwindcss(), quitarComentariosHtml],
});
