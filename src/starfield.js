/* ═══════════════════════════════════════════
   starfield.js — Fondo interactivo de toda la página
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const html = document.documentElement;
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
    const protegidos = Array.from(document.querySelectorAll('[data-star-safe]'));

    const CFG = {
        areaPorEstrella: 5200,    // px² de pantalla por cada estrella
        maxEstrellas: 420,
        radioCursor: 165,         // alcance del brillo por cercanía
        suavizado: 0.09,          // qué tan rápido persigue el brillo a su objetivo
        margenTexto: 24,          // cuánto se apartan de los textos protegidos
        fundidoTexto: 80,         // ancho del degradado alrededor de ellos
        distLinea: 95,            // largo máximo de las líneas de constelación
        maxIluminadas: 34,        // techo de estrellas que participan de las líneas
        msReposo: 34,             // ~30 fps cuando nadie está interactuando
        esperaReposo: 1200,       // cuánto sigue a 60 fps tras el último movimiento
    };

    // Modo noche: estrellas blancas con alguna azulada. Modo día: puntos índigo
    // mucho más tenues, porque un cielo estrellado sobre blanco se lee como
    // suciedad en la pantalla, no como estrellas.
    const PALETA = {
        oscuro: {
            tonos: [[255, 255, 255], [255, 255, 255], [199, 210, 254], [165, 180, 252]],
            alphaMin: 0.15,
            alphaMax: 0.30,
            radioMin: 0.5,
            radioMax: 1.8,
            realce: 0.55,
            linea: [199, 210, 254],
            alphaLinea: 0.30,
            parpadeo: 0.28,
        },
        claro: {
            tonos: [[99, 102, 241], [129, 140, 248], [79, 70, 229]],
            alphaMin: 0.09,
            alphaMax: 0.16,
            radioMin: 0.9,
            radioMax: 2.2,
            realce: 0.32,
            linea: [99, 102, 241],
            alphaLinea: 0.18,
            parpadeo: 0.10,
        },
    };

    let ancho = 0;
    let alto = 0;
    let estrellas = [];
    let cajas = [];
    let mx = null;
    let my = null;
    let oscuro = html.classList.contains('dark');
    let rafId = null;
    let ultimoMov = -Infinity;
    let ultimoDibujo = 0;
    let scrollAnterior = -1;

    const iluminadas = [];

    function azar(min, max) {
        return min + Math.random() * (max - min);
    }

    function envolver(v, max) {
        const r = v % max;
        return r < 0 ? r + max : r;
    }

    function generar() {
        const p = oscuro ? PALETA.oscuro : PALETA.claro;
        const cantidad = Math.min(
            CFG.maxEstrellas,
            Math.round((ancho * alto) / CFG.areaPorEstrella)
        );

        estrellas = [];
        for (let i = 0; i < cantidad; i++) {
            const radio = azar(p.radioMin, p.radioMax);
            estrellas.push({
                x: Math.random() * ancho,
                y: Math.random() * alto,
                r: radio,
                alpha: azar(p.alphaMin, p.alphaMax),
                tono: p.tonos[Math.floor(Math.random() * p.tonos.length)],
                fase: Math.random() * Math.PI * 2,
                velFase: azar(0.006, 0.018),
                vx: azar(-0.05, 0.05),
                vy: azar(-0.05, 0.05),
                // Las más grandes se mueven más al hacer scroll: da sensación de
                // profundidad y evita que el cielo parezca un sticker pegado.
                par: 0.05 + ((radio - p.radioMin) / (p.radioMax - p.radioMin)) * 0.30,
                brillo: 0,
                ey: 0,
                oculto: 1,
            });
        }
    }

    // Los textos que van directo sobre el fondo (héroe y títulos de sección)
    // definen zonas donde las estrellas se apagan del todo. Las tarjetas no
    // hacen falta: sus fondos son opacos y ya las tapan.
    //
    // La medición se parte en dos porque en coordenadas del documento estas
    // cajas no se mueven al scrollear: medirlas una vez y después sólo restarles
    // el scroll evita un getBoundingClientRect() por elemento en cada cuadro,
    // que fuerza un reflow y es lo más caro del fondo en móvil.
    let cajasDoc = [];

    function medirCajasDoc() {
        const sy = window.scrollY;
        cajasDoc = [];
        for (let i = 0; i < protegidos.length; i++) {
            const r = protegidos[i].getBoundingClientRect();
            cajasDoc.push({
                izq: r.left - CFG.margenTexto,
                arr: r.top + sy - CFG.margenTexto,
                der: r.right + CFG.margenTexto,
                aba: r.bottom + sy + CFG.margenTexto,
            });
        }
        scrollAnterior = -1;   // obliga a reproyectar en el próximo cuadro
    }

    // Pasa las cajas a coordenadas de pantalla y descarta las que quedaron fuera.
    function proyectarCajas(sy) {
        cajas = [];
        for (let i = 0; i < cajasDoc.length; i++) {
            const c = cajasDoc[i];
            const arr = c.arr - sy;
            const aba = c.aba - sy;
            if (aba < -CFG.fundidoTexto || arr > alto + CFG.fundidoTexto) continue;
            cajas.push({ izq: c.izq, arr: arr, der: c.der, aba: aba });
        }
    }

    // Lo que sí mueve estas cajas es que cambie el layout: desplegar los
    // certificados, cambiar de idioma o rotar el teléfono.
    if ('ResizeObserver' in window) {
        let pendiente = false;
        const observador = new ResizeObserver(() => {
            if (pendiente) return;
            pendiente = true;
            requestAnimationFrame(() => { pendiente = false; medirCajasDoc(); });
        });
        observador.observe(document.body);
        for (let i = 0; i < protegidos.length; i++) observador.observe(protegidos[i]);
    }

    function factorTexto(x, y) {
        let f = 1;
        for (let i = 0; i < cajas.length; i++) {
            const c = cajas[i];
            const dx = Math.max(c.izq - x, 0, x - c.der);
            const dy = Math.max(c.arr - y, 0, y - c.aba);
            if (dx === 0 && dy === 0) return 0;
            const d2 = dx * dx + dy * dy;
            if (d2 >= CFG.fundidoTexto * CFG.fundidoTexto) continue;
            const v = Math.sqrt(d2) / CFG.fundidoTexto;
            if (v < f) f = v;
        }
        return f;
    }

    function redimensionar() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const nuevoAncho = window.innerWidth;
        const nuevoAlto = window.innerHeight;
        if (!nuevoAncho || !nuevoAlto) return;

        canvas.width = Math.round(nuevoAncho * dpr);
        canvas.height = Math.round(nuevoAlto * dpr);
        canvas.style.width = nuevoAncho + 'px';
        canvas.style.height = nuevoAlto + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // En móvil la barra del navegador se retrae al scrollear y eso dispara
        // `resize` con el ancho intacto. Regenerar ahí hacía saltar todo el cielo
        // en pleno scroll: si sólo cambió el alto se estiran las que ya están.
        const soloAlto = estrellas.length > 0 && nuevoAncho === ancho;
        const escala = alto ? nuevoAlto / alto : 1;

        ancho = nuevoAncho;
        alto = nuevoAlto;
        scrollAnterior = -1;
        medirCajasDoc();

        if (soloAlto) {
            for (let i = 0; i < estrellas.length; i++) estrellas[i].y *= escala;
        } else {
            generar();
        }
    }

    function dibujar() {
        const temaAhora = html.classList.contains('dark');
        if (temaAhora !== oscuro) {
            oscuro = temaAhora;
            generar();
        }

        // Ya medidas en coordenadas del documento: acá sólo se les resta el scroll.
        const sy = window.scrollY;
        if (sy !== scrollAnterior) {
            scrollAnterior = sy;
            proyectarCajas(sy);
        }

        const p = oscuro ? PALETA.oscuro : PALETA.claro;
        const quieto = reducido.matches;
        const R = CFG.radioCursor;
        const R2 = R * R;
        const hayCursor = mx !== null;

        ctx.clearRect(0, 0, ancho, alto);
        iluminadas.length = 0;

        for (let i = 0; i < estrellas.length; i++) {
            const e = estrellas[i];

            if (!quieto) {
                e.x = envolver(e.x + e.vx, ancho);
                e.y = envolver(e.y + e.vy, alto);
                e.fase += e.velFase;
            }

            const ey = envolver(e.y - sy * e.par, alto);
            e.ey = ey;

            // Brillo por cercanía al cursor. Persigue su objetivo en vez de
            // saltar: así se encienden suave y se apagan dejando un rastro.
            let objetivo = 0;
            if (hayCursor) {
                const dx = e.x - mx;
                const dy = ey - my;
                const d2 = dx * dx + dy * dy;
                if (d2 < R2) objetivo = 1 - Math.sqrt(d2) / R;
            }
            e.brillo += (objetivo - e.brillo) * CFG.suavizado;
            if (e.brillo < 0.001) e.brillo = 0;

            const oculto = factorTexto(e.x, ey);
            e.oculto = oculto;
            if (oculto === 0) continue;

            const parpadeo = quieto ? 1 : 1 - p.parpadeo + p.parpadeo * Math.sin(e.fase);
            const a = (e.alpha * parpadeo + e.brillo * p.realce) * oculto;
            if (a <= 0.004) continue;

            ctx.beginPath();
            ctx.arc(e.x, ey, e.r * (1 + e.brillo * 0.9), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + e.tono[0] + ',' + e.tono[1] + ',' + e.tono[2] + ',' + a + ')';
            ctx.fill();

            if (e.brillo > 0.16 && iluminadas.length < CFG.maxIluminadas) {
                iluminadas.push(e);
            }
        }

        dibujarConstelacion(p);
    }

    // Sólo se unen las estrellas que el cursor tiene encendidas, así se arma una
    // constelación alrededor del puntero sin comparar todas contra todas.
    function dibujarConstelacion(p) {
        if (iluminadas.length < 2) return;

        const D = CFG.distLinea;
        ctx.lineWidth = 0.6;

        for (let i = 0; i < iluminadas.length; i++) {
            const a = iluminadas[i];
            for (let j = i + 1; j < iluminadas.length; j++) {
                const b = iluminadas[j];
                const dx = a.x - b.x;
                const dy = a.ey - b.ey;
                const d2 = dx * dx + dy * dy;
                if (d2 > D * D) continue;

                const fuerza = Math.min(a.brillo, b.brillo) * (1 - Math.sqrt(d2) / D);
                const alpha = fuerza * p.alphaLinea * Math.min(a.oculto, b.oculto);
                if (alpha <= 0.004) continue;

                ctx.beginPath();
                ctx.moveTo(a.x, a.ey);
                ctx.lineTo(b.x, b.ey);
                ctx.strokeStyle = 'rgba(' + p.linea[0] + ',' + p.linea[1] + ',' + p.linea[2] + ',' + alpha + ')';
                ctx.stroke();
            }
        }
    }

    // El fondo acompaña toda la sesión, así que en reposo baja a ~30 fps y sólo
    // sube a 60 mientras el cursor se está moviendo.
    function bucle(t) {
        if (document.hidden) {
            rafId = null;
            return;
        }
        rafId = requestAnimationFrame(bucle);

        const activo = t - ultimoMov < CFG.esperaReposo;
        if (!activo && t - ultimoDibujo < CFG.msReposo) return;

        ultimoDibujo = t;
        dibujar();
    }

    function arrancar() {
        if (rafId === null && !document.hidden) {
            rafId = requestAnimationFrame(bucle);
        }
    }

    window.addEventListener('pointermove', (e) => {
        // El dedo también dispara `pointermove`, pero en táctil no hay
        // `mouseleave` que lo apague: el brillo quedaba clavado para siempre
        // donde el usuario tocó por última vez. El cielo responde sólo al cursor.
        if (e.pointerType === 'touch') return;
        mx = e.clientX;
        my = e.clientY;
        ultimoMov = performance.now();
    }, { passive: true });

    html.addEventListener('mouseleave', () => {
        mx = null;
        my = null;
    });

    document.addEventListener('visibilitychange', arrancar);

    let temporizador = null;
    window.addEventListener('resize', () => {
        window.clearTimeout(temporizador);
        temporizador = window.setTimeout(redimensionar, 150);
    });

    redimensionar();
    arrancar();
})();
