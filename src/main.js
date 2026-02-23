/* ═══════════════════════════════════════════
   main.js — Portfolio Functionality
   ═══════════════════════════════════════════ */

import './style.css';

(function () {
    'use strict';

    // ── i18n Translation Maps ──
    const translations = {
        es: {
            'nav.home': 'Inicio',
            'nav.projects': 'Proyectos',
            'nav.skills': 'Habilidades',
            'nav.certificates': 'Certificados',
            'nav.contact': 'Contacto',
            'hero.greeting': 'Hola, soy',
            'hero.role': 'Software Developer',
            'hero.description': 'Me apasiona entender y construir todas las piezas de un producto digital. Mi enfoque principal está en el desarrollo de arquitecturas robustas y APIs seguras, garantizando que cada pieza de software sea escalable y fácil de mantener. Disfruto explorar y conectar diferentes tecnologías para resolver problemas reales. Me considero un perfil versátil, con gran capacidad de adaptación y siempre dispuesto a sumar nuevas herramientas a mi ecosistema técnico.',
            'hero.cta.cv': 'Descargar CV',
            'hero.cta.projects': 'Mis Proyectos',
            'hero.cta.linkedin': 'LinkedIn',
            'projects.title': 'Proyectos Destacados',
            'projects.subtitle': 'Una selección de mi trabajo más reciente',
            'projects.viewRepo': 'Ver Repositorio',
            'projects.p1.title': 'Sistema de Gestión de Pedidos — Microservicios',
            'projects.p1.desc': 'Arquitectura de microservicios con servicios de Clientes, Productos y Pedidos. Comunicación inter-servicios via APIs REST y autenticación con JWT.',
            'projects.p2.title': 'Sistema de Autenticación Híbrido (JWT + Sesiones)',
            'projects.p2.desc': 'Autenticación con Express-Session y JWT. Cifrado AES-256-GCM, protección CSRF, rate limiting, bloqueo de cuenta y headers seguros con Helmet.',
            'projects.p3.title': 'Análisis de Vivienda e Infraestructura Energética',
            'projects.p3.desc': 'Inteligencia inmobiliaria en California y análisis de precios SPOT energéticos entre España, Francia y Portugal con series temporales 2014-2018.',
            'projects.p4.title': 'Sistema de Votación de Temas (MVC)',
            'projects.p4.desc': 'CRUD completo con sistema de votos, anti-spam por cookies/session, ordenamiento dinámico y base de datos relacional con triggers.',
            'projects.p5.title': 'Books Scraping & SQL + API',
            'projects.p5.desc': 'Web scraping con BeautifulSoup, enriquecimiento de datos con Google Books API y base de datos relacional normalizada (3NF).',
            'projects.p6.title': 'Chat Multihilo con Sockets TCP',
            'projects.p6.desc': 'Chat en tiempo real con arquitectura cliente-servidor usando TCP Sockets, threading para múltiples clientes, broadcast y thread-safety con locks.',
            'skills.title': 'Tech Stack',
            'skills.subtitle': 'Tecnologías y herramientas con las que trabajo',
            'skills.backend': 'Backend',
            'skills.frontend': 'Frontend',
            'skills.data': 'Data & DB',
            'skills.devops': 'DevOps & Tools',
            'certificates.title': 'Certificados',
            'certificates.subtitle': 'Formación continua y certificaciones profesionales',
            'certificates.c1.title': 'AWS Certified Cloud Practitioner',
            'certificates.c1.org': 'Amazon Web Services — 2026',
            'certificates.c2.title': 'Fundamentos de Nube',
            'certificates.c2.org': 'Amazon Web Services — 2026',
            'certificates.c3.title': 'Gen AI Fundamentos',
            'certificates.c3.org': 'Amazon Web Services — 2026',
            'certificates.c4.title': 'Mentalidad de Crecimiento',
            'certificates.c4.org': 'Penguin Academy — 2025',
            'certificates.c5.title': 'Trabajo en Equipo y Automotivación',
            'certificates.c5.org': 'Penguin Academy — 2025',
            'certificates.c6.title': 'Metodología de Aprendizaje en Programación',
            'certificates.c6.org': 'Penguin Academy — 2025',
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
            'nav.skills': 'Skills',
            'nav.certificates': 'Certificates',
            'nav.contact': 'Contact',
            'hero.greeting': "Hi, I'm",
            'hero.role': 'Software Developer',
            'hero.description': 'I am passionate about understanding and building every piece of a digital product. My main focus is on developing robust architectures and secure APIs, ensuring every piece of software is scalable and maintainable. I enjoy exploring and connecting different technologies to solve real-world problems. I consider myself a versatile profile, highly adaptable and always ready to add new tools to my technical ecosystem.',
            'hero.cta.cv': 'Download CV',
            'hero.cta.projects': 'My Projects',
            'hero.cta.linkedin': 'LinkedIn',
            'projects.title': 'Featured Projects',
            'projects.subtitle': 'A selection of my most recent work',
            'projects.viewRepo': 'View Repository',
            'projects.p1.title': 'Order Management System — Microservices',
            'projects.p1.desc': 'Microservices architecture with Customers, Products and Orders services. Inter-service communication via REST APIs and JWT authentication.',
            'projects.p2.title': 'Hybrid Authentication System (JWT + Sessions)',
            'projects.p2.desc': 'Authentication with Express-Session and JWT. AES-256-GCM encryption, CSRF protection, rate limiting, account locking and secure headers with Helmet.',
            'projects.p3.title': 'Housing & Energy Infrastructure Analysis',
            'projects.p3.desc': 'Real estate intelligence in California and SPOT energy price analysis between Spain, France and Portugal with 2014-2018 time series.',
            'projects.p4.title': 'Topic Voting System (MVC)',
            'projects.p4.desc': 'Full CRUD with voting system, anti-spam via cookies/session, dynamic sorting and relational database with triggers.',
            'projects.p5.title': 'Books Scraping & SQL + API',
            'projects.p5.desc': 'Web scraping with BeautifulSoup, data enrichment via Google Books API and normalized relational database (3NF).',
            'projects.p6.title': 'Multithreaded TCP Socket Chat',
            'projects.p6.desc': 'Real-time chat with client-server architecture using TCP Sockets, threading for multiple clients, broadcast and thread-safety with locks.',
            'skills.title': 'Tech Stack',
            'skills.subtitle': 'Technologies and tools I work with',
            'skills.backend': 'Backend',
            'skills.frontend': 'Frontend',
            'skills.data': 'Data & DB',
            'skills.devops': 'DevOps & Tools',
            'certificates.title': 'Certificates',
            'certificates.subtitle': 'Continuous learning and professional certifications',
            'certificates.c1.title': 'AWS Certified Cloud Practitioner',
            'certificates.c1.org': 'Amazon Web Services — 2026',
            'certificates.c2.title': 'Cloud Fundamentals',
            'certificates.c2.org': 'Amazon Web Services — 2026',
            'certificates.c3.title': 'Gen AI Fundamentals',
            'certificates.c3.org': 'Amazon Web Services — 2026',
            'certificates.c4.title': 'Growth Mindset',
            'certificates.c4.org': 'Penguin Academy — 2025',
            'certificates.c5.title': 'Teamwork & Self-Motivation',
            'certificates.c5.org': 'Penguin Academy — 2025',
            'certificates.c6.title': 'Learning Methodology in Programming',
            'certificates.c6.org': 'Penguin Academy — 2025',
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
    let currentTheme = localStorage.getItem('portfolio-theme') || 'light';

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

    // ═══════════════════════════════════════════
    // 1. THEME TOGGLE
    // ═══════════════════════════════════════════
    function applyTheme(theme) {
        currentTheme = theme;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        themeIcon.innerHTML = theme === 'dark'
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
        localStorage.setItem('portfolio-theme', theme);
    }

    if (!localStorage.getItem('portfolio-theme')) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // ═══════════════════════════════════════════
    // 2. LANGUAGE SWITCH (i18n)
    // ═══════════════════════════════════════════
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
        });

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
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navAnchors.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

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
    // 6. CONTACT FORM — Web3Forms Integration
    // ═══════════════════════════════════════════
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const btn = this.querySelector('.btn-submit');
        const originalText = currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message';

        // Loading state
        btn.disabled = true;
        Array.from(btn.childNodes).forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
        btn.appendChild(document.createTextNode(currentLang === 'es' ? ' Enviando...' : ' Sending...'));

        try {
            const formData = new FormData(this);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                // Success
                Array.from(btn.childNodes).forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
                btn.appendChild(document.createTextNode(currentLang === 'es' ? ' ¡Enviado! ✓' : ' Sent! ✓'));
                btn.style.background = 'linear-gradient(to right, #22c55e, #16a34a)';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Error');
            }
        } catch (err) {
            // Error
            Array.from(btn.childNodes).forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
            btn.appendChild(document.createTextNode(currentLang === 'es' ? ' Error al enviar ✗' : ' Send failed ✗'));
            btn.style.background = 'linear-gradient(to right, #ef4444, #dc2626)';
        }

        // Reset button after 3s
        setTimeout(() => {
            btn.disabled = false;
            Array.from(btn.childNodes).forEach((n) => { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
            btn.appendChild(document.createTextNode(' ' + originalText));
            btn.style.background = '';
        }, 3000);
    });

    // ═══════════════════════════════════════════
    // Scroll listener (throttled)
    // ═══════════════════════════════════════════
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveNav();

    // ═══════════════════════════════════════════
    // 7. CERTIFICATES — Show More / Less
    // ═══════════════════════════════════════════
    const certsToggle = document.getElementById('certsToggle');
    const extraCerts = document.querySelectorAll('.cert-extra');
    let certsExpanded = false;

    certsToggle.addEventListener('click', () => {
        certsExpanded = !certsExpanded;
        extraCerts.forEach((card) => {
            card.classList.toggle('hidden', !certsExpanded);
        });

        const chevronDown = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
        const chevronUp = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';

        const label = certsExpanded
            ? (currentLang === 'es' ? 'Ver menos' : 'Show less')
            : (currentLang === 'es' ? 'Ver más certificados' : 'Show more certificates');

        certsToggle.innerHTML = (certsExpanded ? chevronUp : chevronDown) + ' ' + label;
    });

    // ═══════════════════════════════════════════
    // 8. PROFILE PHOTO — Click to Enlarge
    // ═══════════════════════════════════════════
    const profilePhoto = document.getElementById('profilePhoto');
    const photoModal = document.getElementById('photoModal');
    const closePhoto = document.getElementById('closePhoto');

    profilePhoto.addEventListener('click', () => {
        photoModal.classList.remove('opacity-0', 'pointer-events-none');
        photoModal.classList.add('opacity-100', 'pointer-events-auto');
    });

    closePhoto.addEventListener('click', () => {
        photoModal.classList.add('opacity-0', 'pointer-events-none');
        photoModal.classList.remove('opacity-100', 'pointer-events-auto');
    });

    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            photoModal.classList.add('opacity-0', 'pointer-events-none');
            photoModal.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });
})();
