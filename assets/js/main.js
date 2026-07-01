/* ==========================================================================
   PORTAFOLIO DIGITAL - SEBASTIÁN GAEL SALINAS SERRANO
   LÓGICA PRINCIPAL (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Función para resolver enlaces de proyectos locales vs producción (Vercel/GitHub Pages)
    function resolveProjectPath(localPath, productionUrl) {
        return productionUrl || localPath;
    }

    // Inicializar Iconos Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- CURSOR PERSONALIZADO ---
    const cursorDot = document.querySelector('.custom-cursor');
    const cursorRing = document.querySelector('.custom-cursor-ring');

    if (cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            // Suavizado sutil para el anillo exterior
            cursorRing.animate({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            }, { duration: 150, fill: 'forwards' });
        });

        // Eventos hover en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .form-control');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });
    }

    // --- TEMA CLARO / OSCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Comprobar preferencia previa o del sistema
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (currentTheme === 'light' || (!currentTheme && !systemPrefersDark)) {
        document.body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }

    // --- EFECTO HEADER AL HACER SCROLL ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Cambiar icono de menú si es necesario
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Cerrar menú al hacer clic en un enlace
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- FILTRADO DE PROYECTOS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de otros botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCat === filterValue) {
                    card.classList.remove('hidden');
                    // Efecto fade-in sutil
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease';
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- MODALES DE PROYECTOS (DETALLES AMPLIADOS) ---
    const projectData = {
        epad: {
            title: "EPAD — Cursos USICAMM 2026",
            cat: "Web App / Comercial",
            techs: ["HTML5", "Vanilla CSS", "JavaScript", "Lucide Icons", "Vercel / Firebase"],
            desc: "EPAD (Equipo Pedagógico de Apoyo Docente) es una plataforma comercial de alto tráfico diseñada para la preparación de maestros mexicanos en los procesos de la USICAMM 2026 (Admisión, Promoción Horizontal y Vertical). Cuenta con un diseño elegante, barra de progreso interactiva, optimizaciones de velocidad críticas y estructuras SEO avanzadas para el posicionamiento en Google.",
            features: [
                "Indexación SEO automatizada y datos estructurados Schema.org.",
                "Estructura responsiva móvil de alto impacto visual.",
                "Diseño visual premium con fuentes elegantes y animaciones fluidas.",
                "Enlaces integrados con APIs de redes sociales y pasarelas de información."
            ],
            logo: "assets/img/epad.jpeg",
            banner: "assets/img/epad.jpeg",
            path: "../pagina oficial/index.html",
            productionUrl: "https://epad-ofical.vercel.app/"
        },
        barberia: {
            title: "Barbería Vázquez (Lerdo, Dgo)",
            cat: "Web App / PWA",
            techs: ["PWA", "JavaScript", "CSS Custom", "Stripe API", "OneSignal API", "Local Storage"],
            desc: "Una aplicación web progresiva (PWA) de lujo para la gestión de citas y servicios de la barbería. Permite a los usuarios agendar cortes de cabello, seleccionar su barbero favorito, comprar tarjetas de regalo virtuales con Stripe y recibir notificaciones push en tiempo real a través de OneSignal.",
            features: [
                "Soporte PWA nativo (instalable en móviles con Manifest y Service Worker).",
                "Integración de pasarela de pagos Stripe para tarjetas de regalo.",
                "Notificaciones automáticas Push mediante OneSignal SDK.",
                "Panel administrativo incorporado para la gestión de barberos y reservas."
            ],
            logo: "assets/img/barberia.png",
            banner: "assets/img/barberia_principal.jpg",
            path: "../barberia/index.html",
            productionUrl: "https://barberia-vazquez.vercel.app/"
        },
        tikeduca: {
            title: "TikEduca — Educadores del Futuro",
            cat: "Web App / Eventos",
            techs: ["Tailwind CSS", "JavaScript (ES6)", "HTML Canvas", "Google Apps Script", "Google Sheets API"],
            desc: "Página oficial interactiva del Congreso Educativo y Maestros Fest en Guadalajara. Diseñada con un concepto futurista y cyberpunk, incluye un canvas con efectos holográficos, selector interactivo de ponentes, animaciones neon grid de alta fidelidad y almacenamiento de inscripciones en Google Sheets usando Google Apps Script.",
            features: [
                "Animación interactiva en Canvas 2D de fondo con efectos de partículas y escáner.",
                "Registro en vivo de asistentes sincronizado con Google Sheets.",
                "Efectos de resplandor neón en CSS y transiciones personalizadas.",
                "Visualización interactiva de ponentes y agenda del congreso."
            ],
            logo: "assets/img/tikeduca.jpg",
            banner: "assets/img/tikeduca_logo_pagina.jpg",
            path: "../tikeduca/index.html",
            productionUrl: "https://tik-educa-oficial.vercel.app/"
        },
        kbhuates: {
            title: "KB HUATES — Sistema de Pedidos",
            cat: "Full Stack / Mobile First",
            techs: ["Node.js", "Express", "SQLite", "Tailwind CSS", "PWA", "JavaScript"],
            desc: "Aplicación móvil web progresiva para la venta y pedidos en línea de snacks y cacahuates de la marca KB HUATES. Los usuarios pueden armar su carrito de compras de manera interactiva con sonido ambiente incorporado, enviar su pedido por WhatsApp y el administrador gestiona las órdenes mediante una base de datos SQLite.",
            features: [
                "Lógica completa de carrito de compras móvil con almacenamiento local.",
                "Base de datos pedidos.db (SQLite) para guardar la información.",
                "Servidor backend local desarrollado en Node.js y Express.",
                "Efectos sonoros y transiciones fluidas estilo App nativa."
            ],
            logo: "assets/img/kbhuates.png",
            banner: "assets/img/kbhuates.png",
            path: "../kBHUATES/index.html",
            productionUrl: "https://la-dupla-ttak.vercel.app/"
        },
        compadres: {
            title: "Tacos Los Compadres (Menú Digital)",
            cat: "Web App / UI-UX",
            techs: ["HTML5", "CSS Grid/Flexbox", "JavaScript", "Google Fonts", "Multimedia"],
            desc: "Sitio web interactivo de presentación y menú oficial para la conocida taquería 'Tacos Los Compadres' en la Comarca Lagunera. Ofrece un menú interactivo segmentado (Asada, Carnitas, Bebidas, Horarios) con animaciones scroll-reveal, pre-cargador personalizado (loader) y una galería interactiva con videos y fotos de los platillos.",
            features: [
                "Loader inicial personalizado ('Preparando el carbón...').",
                "Tablas de precios interactivas y destacadas con etiquetas de especialidad.",
                "Videos y fotografías de alta calidad integrados de manera fluida.",
                "Scroll spy y navegación rápida adaptada a móviles para uso rápido en restaurante."
            ],
            logo: "assets/img/los_compadres.jpeg",
            banner: "assets/img/compadres_1.jpeg",
            path: "../menu/index.html",
            productionUrl: "https://st24030217-maker.github.io/MENU-COMPADRES/"
        },
        copa: {
            title: "Registro 3ra Copa Zona Laguna",
            cat: "Full Stack / Base de Datos",
            techs: ["Node.js", "Express", "SQLite", "Glassmorphism CSS", "JavaScript"],
            desc: "Sistema web de registro y administración para el torneo de fútbol local '3ra Copa Zona Laguna'. Cuenta con un formulario con efecto glassmorphism premium, validaciones robustas del lado del cliente, base de datos SQLite local para almacenar los jugadores registrados y panel administrativo para la exportación de reportes.",
            features: [
                "Diseño visual de alto impacto inspirado en interfaces deportivas con fondos dinámicos.",
                "Base de datos de registro SQLite (`registro_copa.db`).",
                "Servidor Express con endpoints para el registro y consulta de datos.",
                "Panel administrativo interno seguro para descargar plantillas de juego."
            ],
            logo: "assets/img/copa.png",
            banner: "assets/img/copa_poster.png",
            path: "../apli/index.html",
            productionUrl: "https://st24030217-maker.github.io/3ERA-COPA-ZONA-LAGUNA/"
        },
        maps: {
            title: "Localizador de Mapas con Supabase",
            cat: "Web App / Georreferencia",
            techs: ["Maps API", "Supabase DB", "JavaScript", "HTML5", "CSS Glassmorphism"],
            desc: "Un visor interactivo que utiliza APIs de mapas para localizar geográficamente diferentes puntos de interés en la región de la Comarca Lagunera (Torreón, Gómez Palacio, Lerdo). Almacena las coordenadas y metadatos de los puntos en Supabase para cargarlos dinámicamente en tiempo real.",
            features: [
                "Integración con servicios de Mapas (Leaflet / Google Maps).",
                "Base de datos en la nube gestionada en Supabase.",
                "Marcadores personalizados y popups interactivos con información de ubicación.",
                "Funciones de filtrado de ubicaciones por categorías locales."
            ],
            logo: "assets/img/mockup_maps.png",
            banner: "assets/img/mockup_maps.png",
            path: "../proyecto maps/maps.html",
            productionUrl: "https://proyecto-maps.vercel.app/"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    if (modalOverlay && modalCloseBtn) {
        // Abrir Modal
        document.querySelectorAll('.open-modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const data = projectData[projectId];

                if (data) {
                    // Cargar contenido en el modal
                    modalOverlay.querySelector('.modal-title').textContent = data.title;
                    modalOverlay.querySelector('.modal-cat').textContent = data.cat;
                    modalOverlay.querySelector('.modal-description').textContent = data.desc;
                    
                    // Cargar imagen de banner e icono
                    const bannerImg = modalOverlay.querySelector('.banner-bg');
                    if (bannerImg) bannerImg.src = data.banner || data.logo;
                    
                    const logoImg = modalOverlay.querySelector('.modal-logo-img');
                    if (logoImg) logoImg.src = data.logo;

                    // Cargar Tecnologías
                    const techStackContainer = modalOverlay.querySelector('.modal-tech-stack .project-techs');
                    if (techStackContainer) {
                        techStackContainer.innerHTML = '';
                        data.techs.forEach(tech => {
                            const badge = document.createElement('span');
                            badge.className = 'project-tech-badge';
                            badge.textContent = tech;
                            techStackContainer.appendChild(badge);
                        });
                    }

                    // Cargar Características Destacadas
                    const featuresList = modalOverlay.querySelector('.modal-features-list');
                    if (featuresList) {
                        featuresList.innerHTML = '';
                        data.features.forEach(feat => {
                            const li = document.createElement('li');
                            li.textContent = feat;
                            featuresList.appendChild(li);
                        });
                    }

                    // Configurar Enlace del Proyecto (Resuelve local vs producción)
                    const viewProjectBtn = modalOverlay.querySelector('.btn-view-project');
                    if (viewProjectBtn) {
                        const finalUrl = resolveProjectPath(data.path, data.productionUrl);
                        viewProjectBtn.setAttribute('href', finalUrl);
                    }

                    // Mostrar modal
                    modalOverlay.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });

        // Cerrar Modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        };

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // --- ANIMACIÓN DE HABILIDADES AL ENTRAR EN PANTALLA ---
    const skillsSection = document.getElementById('skills');
    const skillProgressFills = document.querySelectorAll('.skill-progress-fill');

    if (skillsSection && skillProgressFills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressFills.forEach(fill => {
                        const progress = fill.getAttribute('data-progress');
                        fill.style.width = progress + '%';
                    });
                    // Dejar de observar después de la animación
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        skillsObserver.observe(skillsSection);
    }

    // --- SCROLL SPY (INDICADOR DE SECCIÓN ACTIVA EN NAV) ---
    const sections = document.querySelectorAll('section, header.hero');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 180)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}` || 
                (currentSectionId === 'hero' && link.getAttribute('href') === '#hero')) {
                link.classList.add('active');
            }
        });
    });

    // --- FORMULARIO DE CONTACTO SIMULADO ---
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('contact-toast');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Deshabilitar botón para evitar envíos múltiples
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="text-gradient">Enviando...</span>';

            // Simular petición AJAX (1.5 segundos)
            setTimeout(() => {
                // Mostrar Toast
                toast.classList.add('active');
                
                // Reiniciar Formulario
                contactForm.reset();
                
                // Habilitar botón de nuevo
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Ocultar Toast tras 4 segundos
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 4000);
            }, 1500);
        });
    }

    // --- EFECTO TYPING (Hero) ---
    const typingTextEl = document.getElementById('typing-text');
    if (typingTextEl) {
        const phrases = [
            "Salinas Serrano",
            "Desarrollador de Software",
            "Estudiante de Ingeniería",
            "Creador de Soluciones Web",
            "Desarrollador Full Stack"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40; // Borrado más rápido
            } else {
                typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Escritura normal
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Terminado de escribir, pausar y luego borrar
                typingSpeed = 1800;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Terminado de borrar, pasar a la siguiente frase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        // Iniciar efecto después de un pequeño retraso
        setTimeout(type, 800);
    }

    // --- ANIMACIONES DE SCROLL (REVEAL) ---
    const revealElements = document.querySelectorAll('section, .skills-category-card, .project-card, .about-text, .about-highlights');
    
    revealElements.forEach(el => {
        // Ignorar hero para que aparezca de inmediato
        if (el.id === 'hero') return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        if (el.id !== 'hero') {
            revealObserver.observe(el);
        }
    });
});
