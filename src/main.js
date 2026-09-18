/* ═══════════════════════════════════════════
   main.js — Portfolio Functionality
   ═══════════════════════════════════════════ */

import './style.css';
import './starfield.js';

(function () {
    'use strict';

    // ── i18n Translation Maps ──
    const translations = {
        es: {
            'nav.home': 'Inicio',
            'nav.projects': 'Proyectos',
            'nav.news': 'Novedades',
            'nav.skills': 'Habilidades',
            'nav.certificates': 'Certificados',
            'nav.contact': 'Contacto',
            'nav.backToTop': 'Volver al inicio',
            'nav.menu.open': 'Abrir menú',
            'nav.menu.close': 'Cerrar menú',
            'nav.theme': 'Cambiar tema',
            'nav.lang': 'Cambiar idioma',
            'meta.title': 'Matias Espínola — Software Developer',
            'meta.description': 'Software Developer en Asunción, Paraguay. Desarrollo APIs seguras, microservicios y arquitecturas backend escalables con Python, Node.js y AWS.',
            'hero.greeting': 'Hola, soy',
            'hero.role': 'Software Developer',
            'hero.description': 'Me apasiona entender y construir todas las piezas de un producto digital. Mi enfoque principal está en el desarrollo de arquitecturas robustas y APIs seguras, garantizando que cada pieza de software sea escalable y fácil de mantener. Disfruto explorar y conectar diferentes tecnologías para resolver problemas reales. Me considero una persona versátil, con gran capacidad de adaptación y siempre dispuesto a sumar nuevas herramientas a mi ecosistema técnico.',
            'hero.photo.open': 'Ampliar foto',
            'hero.photo.dialog': 'Foto de perfil ampliada',
            'hero.photo.close': 'Cerrar',
            'hero.cta.cv': 'Descargar CV',
            'hero.cta.projects': 'Mis Proyectos',
            'hero.cta.linkedin': 'LinkedIn',
            'projects.title': 'Proyectos Destacados',
            'projects.subtitle': 'Una selección de mi trabajo más reciente',
            'projects.viewRepo': 'Ver Repositorio',
            'projects.p1.title': 'Sistema de Gestión de Pedidos — Microservicios',
            'projects.p1.desc': 'Arquitectura de microservicios con servicios de Clientes, Productos y Pedidos. Comunicación inter-servicios via APIs REST y autenticación con JWT.',
            'projects.p1.tag': 'Microservicios · REST',
            'projects.p2.title': 'Sistema de Autenticación Híbrido (JWT + Sesiones)',
            'projects.p2.desc': 'Autenticación con Express-Session y JWT. Cifrado AES-256-GCM, protección CSRF, rate limiting, bloqueo de cuenta y headers seguros con Helmet.',
            'projects.p2.tag': 'JWT + Sesiones',
            'projects.p3.title': 'Análisis de Vivienda e Infraestructura Energética',
            'projects.p3.desc': 'Inteligencia inmobiliaria en California y análisis de precios SPOT energéticos entre España, Francia y Portugal con series temporales 2014-2018.',
            'projects.p3.tag': 'Análisis de Datos',
            'projects.p4.title': 'Sistema de Votación de Temas (MVC)',
            'projects.p4.desc': 'CRUD completo con sistema de votos, anti-spam por cookies/session, ordenamiento dinámico y base de datos relacional con triggers.',
            'projects.p5.title': 'Books Scraping & SQL + API',
            'projects.p5.desc': 'Web scraping con BeautifulSoup, enriquecimiento de datos con Google Books API y base de datos relacional normalizada (3NF).',
            'projects.p6.title': 'Chat Multihilo con Sockets TCP',
            'projects.p6.desc': 'Chat en tiempo real con arquitectura cliente-servidor usando TCP Sockets, threading para múltiples clientes, broadcast y thread-safety con locks.',
            'news.title': 'Novedades',
            'news.subtitle': 'Sitios web que diseñé y desarrollé para clientes reales',
            'news.viewSite': 'Ver Sitio',
            'news.n1.badge': 'Gremio profesional',
            'news.n1.title': 'Colegio de Graduados en Ciencias Económicas (CGCEP)',
            'news.n1.desc': 'Sitio institucional para el Colegio de Graduados en Ciencias Económicas del Paraguay, el gremio que nuclea a los profesionales en ciencias económicas del país desde 1946. Comunica su historia y autoridades, difunde noticias, eventos y capacitaciones, y canaliza la afiliación de nuevos socios — todo en un sitio 100% estático, sin cookies ni rastreadores, con seguridad reforzada y accesibilidad verificada.',
            'news.n2.badge': 'Organización comunitaria',
            'news.n2.title': 'Club de Leones de Capiatá',
            'news.n2.desc': 'Sitio institucional pensado para impulsar el crecimiento y la expansión digital del Club de Leones de Capiatá, organización de servicio comunitario fundada en 1977. Presenta su historia, autoridades, causas y actividades, y abre un canal propio para sumar voluntarios y socios — con gestión de contenido incluida, para que el club siga creciendo sin depender de un desarrollador en cada actualización.',
            'skills.title': 'Tech Stack',
            'skills.subtitle': 'Tecnologías y herramientas con las que trabajo',
            'skills.backend': 'Backend',
            'skills.frontend': 'Frontend',
            'skills.data': 'Data & DB',
            'skills.devops': 'Cloud & DevOps',
            'skills.tools': 'Herramientas & Lenguajes',
            'certificates.title': 'Certificados',
            'certificates.subtitle': 'Formación continua y certificaciones profesionales',
            'certificates.c1.title': 'AWS Certified Cloud Practitioner',
            'certificates.c1.org': 'Amazon Web Services — 2026',
            'certificates.c2.title': 'DevOps: Docker, Kubernetes, Jenkins y AWS',
            'certificates.c2.org': 'Udemy — 2026',
            'certificates.c3.title': 'Bases de Datos SQL con MySQL',
            'certificates.c3.org': 'Udemy — 2026',
            'certificates.c4.title': 'Bases de Datos NoSQL con MongoDB',
            'certificates.c4.org': 'Udemy — 2026',
            'certificates.c5.title': 'Fundamentos de Nube',
            'certificates.c5.org': 'Amazon Web Services — 2026',
            'certificates.c6.title': 'Gen AI Fundamentos',
            'certificates.c6.org': 'Amazon Web Services — 2026',
            'certificates.c7.title': 'Gen AI Intermedio',
            'certificates.c7.org': 'Amazon Web Services — 2026',
            'certificates.c8.title': 'Metodología de Aprendizaje en Programación',
            'certificates.c8.org': 'Penguin Academy — 2025',
            'certificates.c9.title': 'Trabajo en Equipo y Automotivación',
            'certificates.c9.org': 'Penguin Academy — 2025',
            'certificates.showMore': 'Ver más certificados',
            'certificates.showLess': 'Ver menos',
            'contact.title': 'Contacto',
            'contact.subtitle': '¿Tienes un proyecto en mente? ¡Hablemos!',
            'contact.name': 'Nombre',
            'contact.email': 'Correo Electrónico',
            'contact.message': 'Mensaje',
            'contact.send': 'Enviar Mensaje',
            'contact.emailLabel': 'Email',
            'contact.whatsappLabel': 'WhatsApp',
            'contact.locationLabel': 'Ubicación',
            'contact.location': 'Asunción, Paraguay',
            'footer.copy': '© 2026 Matias Gabriel Espínola Rojas. Todos los derechos reservados.',
        },
        en: {
            'nav.home': 'Home',
            'nav.projects': 'Projects',
            'nav.news': 'Recent Work',
            'nav.skills': 'Skills',
            'nav.certificates': 'Certificates',
            'nav.contact': 'Contact',
            'nav.backToTop': 'Back to top',
            'nav.menu.open': 'Open menu',
            'nav.menu.close': 'Close menu',
            'nav.theme': 'Toggle theme',
            'nav.lang': 'Change language',
            'meta.title': 'Matias Espínola — Software Developer',
            'meta.description': 'Software Developer based in Asunción, Paraguay. I build secure APIs, microservices and scalable backend architectures with Python, Node.js and AWS.',
            'hero.greeting': "Hi, I'm",
            'hero.role': 'Software Developer',
            'hero.description': 'I am passionate about understanding and building every piece of a digital product. My main focus is on developing robust architectures and secure APIs, ensuring every piece of software is scalable and maintainable. I enjoy exploring and connecting different technologies to solve real-world problems. I consider myself a versatile person, highly adaptable and always ready to add new tools to my technical ecosystem.',
            'hero.photo.open': 'Enlarge photo',
            'hero.photo.dialog': 'Enlarged profile photo',
            'hero.photo.close': 'Close',
            'hero.cta.cv': 'Download CV',
            'hero.cta.projects': 'My Projects',
            'hero.cta.linkedin': 'LinkedIn',
            'projects.title': 'Featured Projects',
            'projects.subtitle': 'A selection of my most recent work',
            'projects.viewRepo': 'View Repository',
            'projects.p1.title': 'Order Management System — Microservices',
            'projects.p1.desc': 'Microservices architecture with Customers, Products and Orders services. Inter-service communication via REST APIs and JWT authentication.',
            'projects.p1.tag': 'Microservices · REST',
            'projects.p2.title': 'Hybrid Authentication System (JWT + Sessions)',
            'projects.p2.desc': 'Authentication with Express-Session and JWT. AES-256-GCM encryption, CSRF protection, rate limiting, account locking and secure headers with Helmet.',
            'projects.p2.tag': 'JWT + Sessions',
            'projects.p3.title': 'Housing & Energy Infrastructure Analysis',
            'projects.p3.desc': 'Real estate intelligence in California and SPOT energy price analysis between Spain, France and Portugal with 2014-2018 time series.',
            'projects.p3.tag': 'Data Analysis',
            'projects.p4.title': 'Topic Voting System (MVC)',
            'projects.p4.desc': 'Full CRUD with voting system, anti-spam via cookies/session, dynamic sorting and relational database with triggers.',
            'projects.p5.title': 'Books Scraping & SQL + API',
            'projects.p5.desc': 'Web scraping with BeautifulSoup, data enrichment via Google Books API and normalized relational database (3NF).',
            'projects.p6.title': 'Multithreaded TCP Socket Chat',
            'projects.p6.desc': 'Real-time chat with client-server architecture using TCP Sockets, threading for multiple clients, broadcast and thread-safety with locks.',
            'news.title': 'Recent Work',
            'news.subtitle': 'Websites I designed and built for real clients',
            'news.viewSite': 'Visit Site',
            'news.n1.badge': 'Professional Guild',
            'news.n1.title': 'Paraguayan Association of Economics Graduates (CGCEP)',
            'news.n1.desc': "Institutional site for the Paraguayan Association of Economics Graduates, the guild representing the country's economics professionals since 1946. It shares the organization's history and leadership, publishes news, events and training, and channels new member sign-ups — all on a fully static site, with no cookies or trackers, hardened security and verified accessibility.",
            'news.n2.badge': 'Community Organization',
            'news.n2.title': 'Capiatá Lions Club',
            'news.n2.desc': "An institutional site built to drive the digital growth and expansion of the Capiatá Lions Club, a community-service organization founded in 1977. It presents the club's history, leadership, causes and activities, and opens a direct channel to bring in volunteers and members — with content management included, so growth never depends on a developer for every update.",
            'skills.title': 'Tech Stack',
            'skills.subtitle': 'Technologies and tools I work with',
            'skills.backend': 'Backend',
            'skills.frontend': 'Frontend',
            'skills.data': 'Data & DB',
            'skills.devops': 'Cloud & DevOps',
            'skills.tools': 'Tools & Languages',
            'certificates.title': 'Certificates',
            'certificates.subtitle': 'Continuous learning and professional certifications',
            'certificates.c1.title': 'AWS Certified Cloud Practitioner',
            'certificates.c1.org': 'Amazon Web Services — 2026',
            'certificates.c2.title': 'DevOps: Docker, Kubernetes, Jenkins & AWS',
            'certificates.c2.org': 'Udemy — 2026',
            'certificates.c3.title': 'SQL Databases with MySQL',
            'certificates.c3.org': 'Udemy — 2026',
            'certificates.c4.title': 'NoSQL Databases with MongoDB',
            'certificates.c4.org': 'Udemy — 2026',
            'certificates.c5.title': 'Cloud Fundamentals',
            'certificates.c5.org': 'Amazon Web Services — 2026',
            'certificates.c6.title': 'Gen AI Fundamentals',
            'certificates.c6.org': 'Amazon Web Services — 2026',
            'certificates.c7.title': 'Gen AI Intermediate',
            'certificates.c7.org': 'Amazon Web Services — 2026',
            'certificates.c8.title': 'Learning Methodology in Programming',
            'certificates.c8.org': 'Penguin Academy — 2025',
            'certificates.c9.title': 'Teamwork & Self-Motivation',
            'certificates.c9.org': 'Penguin Academy — 2025',
            'certificates.showMore': 'Show more certificates',
            'certificates.showLess': 'Show less',
            'contact.title': 'Contact',
            'contact.subtitle': "Have a project in mind? Let's talk!",
            'contact.name': 'Name',
            'contact.email': 'Email Address',
            'contact.message': 'Message',
            'contact.send': 'Send Message',
            'contact.emailLabel': 'Email',
            'contact.whatsappLabel': 'WhatsApp',
            'contact.locationLabel': 'Location',
            'contact.location': 'Asunción, Paraguay',
            'footer.copy': '© 2026 Matias Gabriel Espínola Rojas. All rights reserved.',
        },
    };

    // ── State ──
    let currentLang = localStorage.getItem('portfolio-lang') || 'es';

    // ── DOM ──
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('section');
    const navAnchors = document.querySelectorAll('.nav-link');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // ═══════════════════════════════════════════
    // 1. THEME TOGGLE
    // ═══════════════════════════════════════════
    // El tema ya quedó puesto por el script en línea del <head>, antes del primer
    // pintado. Acá sólo se parte de lo que ese script decidió y se sincroniza el
    // ícono: volver a calcularlo produciría un parpadeo.
    let currentTheme = html.classList.contains('dark') ? 'dark' : 'light';

    // `persistir` separa la elección del usuario del tema heredado del sistema:
    // sin eso, la primera visita guardaba el tema del SO como si lo hubiera
    // elegido a mano y el sitio dejaba de acompañarlo cuando el SO cambiaba.
    function applyTheme(theme, persistir) {
        currentTheme = theme;
        html.classList.toggle('dark', theme === 'dark');
        themeIcon.innerHTML = theme === 'dark'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        if (persistir) localStorage.setItem('portfolio-theme', theme);
    }

    applyTheme(currentTheme, false);

    themeToggle.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
    });

    // Mientras no haya elección guardada, el sitio sigue al tema del sistema.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('portfolio-theme')) return;
        applyTheme(e.matches ? 'dark' : 'light', false);
    });

    // ═══════════════════════════════════════════
    // 2. LANGUAGE SWITCH (i18n)
    // ═══════════════════════════════════════════

    // Parte el texto de un [data-split] en palabras y le da a cada una su propio
    // retraso, para que aparezcan encadenadas en vez de todas de golpe.
    // Se vuelve a llamar en cada cambio de idioma, porque applyLanguage reemplaza
    // el contenido del elemento.
    const MAX_SPREAD_MS = 900;   // techo del escalonado, para textos largos

    function splitWords(el) {
        const text = (el.textContent || '').trim();
        if (!text) return;

        const words = text.split(/\s+/);
        const base = Number(el.dataset.delay) || 0;
        const step = words.length > 1
            ? Math.min(Number(el.dataset.step) || 60, MAX_SPREAD_MS / (words.length - 1))
            : 0;

        const frag = document.createDocumentFragment();
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            span.style.animationDelay = Math.round(base + i * step) + 'ms';
            frag.appendChild(span);
            if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
        });

        el.textContent = '';
        el.appendChild(frag);
        el.classList.add('split-ready');
    }

    function applyLanguage(lang) {
        currentLang = lang;
        const strings = translations[lang];
        if (!strings) return;

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (strings[key] === undefined) return;

            const svg = el.querySelector('svg');
            if (svg) {
                Array.from(el.childNodes).forEach((n) => {
                    if (n.nodeType === Node.TEXT_NODE) n.remove();
                });
                el.appendChild(document.createTextNode(' ' + strings[key]));
            } else {
                el.textContent = strings[key];
            }

            if (el.hasAttribute('data-split')) splitWords(el);
        });

        // Los textos que no son contenido sino atributo (tooltip y nombre
        // accesible) se recorren aparte.
        [['data-i18n-title', 'title'], ['data-i18n-label', 'aria-label']].forEach(([datos, attr]) => {
            document.querySelectorAll('[' + datos + ']').forEach((el) => {
                const key = el.getAttribute(datos);
                if (strings[key] !== undefined) el.setAttribute(attr, strings[key]);
            });
        });

        if (strings['meta.title']) document.title = strings['meta.title'];
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && strings['meta.description']) metaDesc.setAttribute('content', strings['meta.description']);

        // La hamburguesa no lleva data-i18n-label: su nombre depende de si el
        // menú está abierto, así que se recalcula según el estado actual.
        hamburger.setAttribute('aria-label', strings[hamburger.classList.contains('active') ? 'nav.menu.close' : 'nav.menu.open']);
        langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
        html.setAttribute('lang', lang);
        localStorage.setItem('portfolio-lang', lang);
    }

    applyLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        applyLanguage(currentLang === 'es' ? 'en' : 'es');
    });

    // ═══════════════════════════════════════════
    // 3. MOBILE MENU
    // ═══════════════════════════════════════════
    const esMovil = window.matchMedia('(max-width: 767px)');

    // Cerrado, el panel sigue en el DOM fuera de pantalla: sin `inert` sus
    // enlaces se podían tabular a ciegas, con el foco en un sitio invisible.
    function sincronizarInert() {
        navLinks.inert = esMovil.matches && !navLinks.classList.contains('open');
    }

    function abrirMenu(abierto) {
        hamburger.classList.toggle('active', abierto);
        navLinks.classList.toggle('open', abierto);
        hamburger.setAttribute('aria-expanded', String(abierto));
        hamburger.setAttribute('aria-label', translations[currentLang][abierto ? 'nav.menu.close' : 'nav.menu.open']);
        // La página de atrás no debe desplazarse con el panel abierto
        document.body.classList.toggle('menu-abierto', abierto);
        sincronizarInert();
    }

    hamburger.addEventListener('click', () => {
        abrirMenu(!navLinks.classList.contains('open'));
    });

    // Al pasar a escritorio el panel vuelve a ser la barra de siempre: si quedó
    // abierto hay que soltar el scroll y devolverle el foco a sus enlaces.
    esMovil.addEventListener('change', () => {
        if (!esMovil.matches) abrirMenu(false);
        sincronizarInert();
    });

    sincronizarInert();

    navAnchors.forEach((link) => {
        link.addEventListener('click', () => abrirMenu(false));
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('open')) return;
        if (navLinks.contains(e.target) || hamburger.contains(e.target)) return;
        abrirMenu(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) abrirMenu(false);
    });

    // ═══════════════════════════════════════════
    // 3b. NAVEGACIÓN SIN # EN LA URL
    // ═══════════════════════════════════════════
    // Los href="#seccion" se mantienen: sirven para accesibilidad y para que la
    // página siga navegándose sin JS. Acá sólo se intercepta el click para hacer
    // el scroll a mano y dejar la barra de direcciones limpia.
    function limpiarUrl() {
        history.replaceState(null, '', location.pathname + location.search);
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            if (!href.startsWith('#') || href === '#') return;

            const target = document.getElementById(href.slice(1));
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
            limpiarUrl();
        });
    });

    // Si alguien entra con un enlace que ya trae #, se respeta el salto del
    // navegador y después se limpia.
    if (location.hash) limpiarUrl();

    // ═══════════════════════════════════════════
    // 4. SCROLL — Active Nav Highlight
    // ═══════════════════════════════════════════
    function updateActiveNav() {
        let current = '';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 120;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });
        navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }

    // ═══════════════════════════════════════════
    // 5. SCROLL — Reveal Animations
    // ═══════════════════════════════════════════
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    // ═══════════════════════════════════════════
    // 6. CONTACT FORM — Web3Forms + Rate Limiting
    // ═══════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Un solo lugar para el texto del boton y el aviso que leen los
    // lectores de pantalla: antes el resultado del envio solo era visual.
    function estadoEnvio(btn, texto, fondo) {
        Array.from(btn.childNodes).forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
        btn.appendChild(document.createTextNode(' ' + texto));
        btn.style.background = fondo || '';
        if (formStatus) formStatus.textContent = texto;
    }
    const RATE_LIMIT_KEY = 'cf_submissions';
    const MAX_SUBMISSIONS = 3;      // max per window
    const RATE_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

    function getSubmissions() {
        try {
            const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
            const now = Date.now();
            return data.filter((ts) => now - ts < RATE_WINDOW_MS);
        } catch { return []; }
    }

    function recordSubmission() {
        const subs = getSubmissions();
        subs.push(Date.now());
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(subs));
    }

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = this.querySelector('.btn-submit');
        const originalText = currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message';

        // Rate limit check
        const subs = getSubmissions();
        if (subs.length >= MAX_SUBMISSIONS) {
            const minsLeft = Math.ceil((RATE_WINDOW_MS - (Date.now() - subs[0])) / 60000);
            estadoEnvio(btn, currentLang === 'es'
                ? `Demasiados envíos. Esperá ${minsLeft} min`
                : `Too many submissions. Wait ${minsLeft} min`,
                'linear-gradient(to right, #f59e0b, #d97706)');
            btn.disabled = true;
            setTimeout(() => {
                btn.disabled = false;
                estadoEnvio(btn, originalText, '');
                if (formStatus) formStatus.textContent = '';
            }, 4000);
            return;
        }

        // Loading state
        btn.disabled = true;
        estadoEnvio(btn, currentLang === 'es' ? 'Enviando...' : 'Sending...', '');

        try {
            const formData = new FormData(this);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                recordSubmission();
                estadoEnvio(btn, currentLang === 'es' ? '¡Enviado! ✓' : 'Sent! ✓',
                    'linear-gradient(to right, #22c55e, #16a34a)');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Error');
            }
        } catch (err) {
            estadoEnvio(btn, currentLang === 'es' ? 'Error al enviar ✗' : 'Send failed ✗',
                'linear-gradient(to right, #ef4444, #dc2626)');
        }

        setTimeout(() => {
            btn.disabled = false;
            estadoEnvio(btn, originalText, '');
            if (formStatus) formStatus.textContent = '';
        }, 3000);
    });

    // ═══════════════════════════════════════════
    // 6b. CONTACT INFO — Obfuscation (anti-scraping)
    // ═══════════════════════════════════════════
    const obfEmail = document.getElementById('obfEmail');
    if (obfEmail) {
        const u = obfEmail.dataset.u;
        const d = obfEmail.dataset.d;
        const addr = u + '@' + d;
        obfEmail.href = 'mai' + 'lto:' + addr;
        obfEmail.textContent = addr;
    }

    const obfWA = document.getElementById('obfWhatsApp');
    const obfWAText = document.getElementById('obfWhatsAppText');
    if (obfWA) {
        const cc = obfWA.dataset.cc;
        const num = obfWA.dataset.num;
        obfWA.href = 'https://wa' + '.me/' + cc + num;
        if (obfWAText) {
            obfWAText.textContent = '+' + cc + ' ' + num.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        }
    }

    // ═══════════════════════════════════════════
    // 6c. SCROLL PROGRESS RING — Volver al inicio
    // ═══════════════════════════════════════════
    const scrollTopBtn = document.getElementById('scrollTop');
    const anillo = scrollTopBtn ? scrollTopBtn.querySelector('[data-anillo]') : null;
    const RING_LENGTH = 138.23;   // 2π × r (r = 22)
    const SHOW_AFTER_PX = 300;

    function updateScrollRing() {
        if (!anillo) return;
        const max = html.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        anillo.style.strokeDashoffset = (RING_LENGTH * (1 - progress)).toFixed(2);
        scrollTopBtn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER_PX);
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
        });
        window.addEventListener('resize', updateScrollRing);
    }

    // ═══════════════════════════════════════════
    // Scroll listener (throttled)
    // ═══════════════════════════════════════════
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                updateScrollRing();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveNav();
    updateScrollRing();

    // ═══════════════════════════════════════════
    // 6d. SKILLS — las herramientas entran de a una
    // ═══════════════════════════════════════════
    const skillCards = document.querySelectorAll('.skill-card');
    const SKILL_BASE_MS = 180;   // espera a que la caja ya esté entrando
    const SKILL_STEP_MS = 65;

    // El retraso va en animation-delay (no en transition-delay) para no
    // demorar el hover de cada herramienta una vez que ya apareció.
    skillCards.forEach((card) => {
        card.querySelectorAll('.skill-item').forEach((item, i) => {
            item.style.animationDelay = SKILL_BASE_MS + i * SKILL_STEP_MS + 'ms';
        });
    });

    if (skillCards.length) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('skills-ready');
                skillsObserver.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        skillCards.forEach((card) => skillsObserver.observe(card));
    }

    // ═══════════════════════════════════════════
    // 7. CERTIFICADOS — Rotación lateral + Ver más
    // ═══════════════════════════════════════════
    const certsGrid = document.getElementById('certsGrid');
    const certsToggle = document.getElementById('certsToggle');
    const certCards = certsGrid ? Array.from(certsGrid.querySelectorAll('.cert-card')) : [];

    const ROTATE_MS = 8000;   // cada cuánto cambia la combinación
    const STAGGER_MS = 110;   // desfase entre tarjetas
    const EXIT_MS = 420;      // debe coincidir con la transición de .cert-card
    const ENTER_MS = 560;

    let certsExpanded = false;
    let currentCombo = [];    // índices de las tarjetas visibles ahora
    let comboPool = [];       // combinaciones que aún no se usaron en este ciclo
    let comboSlots = 0;       // cuántas tarjetas entran en una fila
    let rotateTimer = null;
    let transitioning = false;
    let certsInView = false;
    let certsHovered = false;
    let certsStarted = false;

    // ── Todas las combinaciones de k elementos entre n (sin repetir) ──
    function buildCombos(n, k) {
        const out = [];
        const combo = [];
        (function walk(start) {
            if (combo.length === k) { out.push(combo.slice()); return; }
            for (let i = start; i < n; i++) {
                combo.push(i);
                walk(i + 1);
                combo.pop();
            }
        })(0);
        return out;
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function refillPool() {
        comboPool = shuffle(buildCombos(certCards.length, comboSlots));
    }

    // Del pool saca la combinación que menos comparte con la actual: así cada
    // rotación se nota, y ninguna combinación se repite dentro del ciclo.
    // Al agotarse las combinaciones el pool se rearma en otro orden, y la misma
    // regla impide que la primera del ciclo nuevo repita a la que está en pantalla.
    function takeNextCombo() {
        if (!comboPool.length) refillPool();
        let bestIdx = 0;
        let bestOverlap = Infinity;
        for (let i = 0; i < comboPool.length; i++) {
            const overlap = comboPool[i].filter((x) => currentCombo.includes(x)).length;
            if (overlap < bestOverlap) { bestOverlap = overlap; bestIdx = i; }
            if (overlap === 0) break;
        }
        return shuffle(comboPool.splice(bestIdx, 1)[0]);
    }

    // Cuántas tarjetas entran por fila. El dato lo pone el CSS en `--cols`: el
    // grid tiene el doble de columnas de las que se ven (para poder centrar la
    // última fila), así que contar `gridTemplateColumns` daría el número al
    // revés. Leyéndolo de la variable, sumar un breakpoint es sólo CSS.
    function slotCount() {
        const cols = parseInt(getComputedStyle(certsGrid).getPropertyValue('--cols'), 10);
        return Math.max(1, Math.min(cols || 1, certCards.length));
    }

    // Con una sola columna (celular) rotar de a una tarjeta cada 8 s obliga a
    // esperar o tocar "Ver más" para ver el resto: peor experiencia que
    // mostrarlas todas apiladas de entrada, que es como se lee cualquier lista
    // larga en una pantalla angosta. Ahí se muestran todas y no hay nada que
    // rotar ni que expandir.
    function modoListaCompleta() {
        return comboSlots <= 1;
    }

    // Deja en pantalla exactamente `combo`. Con offstage=true las coloca ya fuera
    // del costado derecho: como venían de display:none, ese salto no se anima.
    function layoutCombo(combo, offstage) {
        certCards.forEach((card) => {
            card.classList.add('cert-hidden');
            card.classList.remove('cert-exit', 'cert-enter');
            card.style.transitionDelay = '';
            card.style.order = '';
        });
        void certsGrid.offsetWidth;   // confirma el display:none antes de reaparecer

        combo.forEach((idx, pos) => {
            const card = certCards[idx];
            card.style.order = pos;
            if (offstage) card.classList.add('cert-enter');
            card.classList.remove('cert-hidden');
        });
        currentCombo = combo;
    }

    function animateIn(combo) {
        transitioning = true;
        layoutCombo(combo, true);
        void certsGrid.offsetWidth;   // confirma el estado de entrada

        requestAnimationFrame(() => {
            combo.forEach((idx, pos) => {
                const card = certCards[idx];
                card.style.transitionDelay = reducedMotion.matches ? '0ms' : pos * STAGGER_MS + 'ms';
                card.classList.remove('cert-enter');
            });
            window.setTimeout(() => {
                combo.forEach((idx) => { certCards[idx].style.transitionDelay = ''; });
                transitioning = false;
            }, reducedMotion.matches ? 0 : ENTER_MS + STAGGER_MS * combo.length);
        });
    }

    function rotate() {
        if (transitioning || certsExpanded) return;
        const next = takeNextCombo();
        transitioning = true;

        const exiting = currentCombo.slice();
        exiting.forEach((idx, pos) => {
            const card = certCards[idx];
            card.style.transitionDelay = reducedMotion.matches ? '0ms' : pos * STAGGER_MS + 'ms';
            card.classList.add('cert-exit');
        });

        window.setTimeout(
            () => animateIn(next),
            reducedMotion.matches ? 0 : EXIT_MS + STAGGER_MS * (exiting.length - 1)
        );
    }

    function startRotation() {
        if (modoListaCompleta() || rotateTimer || certCards.length <= comboSlots) return;
        rotateTimer = window.setInterval(() => {
            // Se saltea el turno si no aporta nada: fuera de pantalla, pestaña en
            // segundo plano, mouse encima (para poder leer o clickear) o expandido.
            if (certsExpanded || certsHovered || !certsInView || document.hidden) return;
            rotate();
        }, ROTATE_MS);
    }

    function stopRotation() {
        window.clearInterval(rotateTimer);
        rotateTimer = null;
    }

    if (certCards.length) {
        comboSlots = slotCount();
        if (certsToggle) certsToggle.hidden = modoListaCompleta();

        if (modoListaCompleta()) {
            // Sin espacio para rotar: van todas, ya en su posición final, a la
            // espera de que la sección entre en pantalla para deslizarse adentro.
            layoutCombo(certCards.map((_, i) => i), true);
        } else {
            refillPool();
            // Estado inicial: la primera combinación ya colocada, pero esperando fuera
            // del costado hasta que la sección entre en pantalla.
            layoutCombo(takeNextCombo(), true);
        }

        const certsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                certsInView = entry.isIntersecting;
                if (entry.isIntersecting && !certsStarted) {
                    certsStarted = true;
                    animateIn(currentCombo);
                    startRotation();
                }
            });
        }, { threshold: 0.15 });
        certsObserver.observe(certsGrid);

        certsGrid.addEventListener('pointerenter', () => { certsHovered = true; });
        certsGrid.addEventListener('pointerleave', () => { certsHovered = false; });
        certsGrid.addEventListener('focusin', () => { certsHovered = true; });
        certsGrid.addEventListener('focusout', () => { certsHovered = false; });

        // Al cambiar de breakpoint cambia cuántas caben en la fila: nuevo tamaño
        // de combinación, nuevo ciclo. Cruzar hacia o desde el modo de lista
        // completa (celular) además prende o apaga la rotación entera.
        window.addEventListener('resize', () => {
            const slots = slotCount();
            if (slots === comboSlots) return;
            comboSlots = slots;
            if (certsToggle) certsToggle.hidden = modoListaCompleta();

            if (modoListaCompleta()) {
                stopRotation();
                certsExpanded = false;
                certsGrid.classList.remove('certs-expandido');
                layoutCombo(certCards.map((_, i) => i), false);
                return;
            }

            refillPool();
            if (!certsExpanded) {
                layoutCombo(takeNextCombo(), false);
                startRotation();
            }
        });
    }

    if (certsToggle) {
        certsToggle.addEventListener('click', () => {
            certsExpanded = !certsExpanded;
            // El CSS centra la última fila sólo con todo desplegado: mientras
            // rota siempre hay una fila llena y hay tarjetas en display:none.
            certsGrid.classList.toggle('certs-expandido', certsExpanded);

            if (certsExpanded) {
                stopRotation();
                animateIn(certCards.map((_, i) => i));
            } else {
                animateIn(takeNextCombo());
                startRotation();
            }

            const chevronDown = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
            const chevronUp = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';

            const key = certsExpanded ? 'certificates.showLess' : 'certificates.showMore';
            certsToggle.setAttribute('data-i18n', key);
            certsToggle.innerHTML = (certsExpanded ? chevronUp : chevronDown) + ' ' + translations[currentLang][key];
        });
    }

    // ═══════════════════════════════════════════
    // 8. PROFILE PHOTO — Click to Enlarge
    // ═══════════════════════════════════════════
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closePhoto = document.getElementById('closePhoto');

    // Quién tenía el foco antes de abrir, para devolvérselo al cerrar y no
    // dejar al usuario de teclado al principio de la página.
    let focoPrevio = null;

    function abrirFoto(abierta) {
        photoModal.classList.toggle('opacity-0', !abierta);
        photoModal.classList.toggle('pointer-events-none', !abierta);
        photoModal.classList.toggle('opacity-100', abierta);
        photoModal.classList.toggle('pointer-events-auto', abierta);
        document.body.classList.toggle('foto-abierta', abierta);

        if (abierta) {
            focoPrevio = document.activeElement;
            photoModal.inert = false;   // hay que soltarlo antes de poder enfocar
            closePhoto.focus();
        } else {
            photoModal.inert = true;
            if (focoPrevio && focoPrevio.isConnected) focoPrevio.focus();
            focoPrevio = null;
        }
    }

    profilePhoto.addEventListener('click', () => abrirFoto(true));
    closePhoto.addEventListener('click', () => abrirFoto(false));

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) abrirFoto(false);
    });

    document.addEventListener('keydown', (e) => {
        if (photoModal.inert) return;
        if (e.key === 'Escape') {
            abrirFoto(false);
            return;
        }
        // El diálogo tiene un solo control, así que cualquier tabulación vuelve
        // a él: el foco no se escapa a la página de atrás mientras está abierto.
        if (e.key === 'Tab') {
            e.preventDefault();
            closePhoto.focus();
        }
    });
})();
