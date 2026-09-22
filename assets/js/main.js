/* ==========================================================================
   PORTAFOLIO DIGITAL - SEBASTIÁN GAEL SALINAS SERRANO
   LÓGICA PRINCIPAL (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Función para resolver enlaces de proyectos locales vs producción (Vercel/GitHub Pages)
    function resolveProjectPath(localPath, productionUrl) {
        // Si estamos en entorno local (file://), usar la ruta relativa local
        if (window.location.protocol === 'file:') {
            return localPath;
        }
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
        fidelidad: {
            title: "Tarjeta de Fidelidad & Membresía Digital",
            cat: "Web App / PWA / Comercial",
            techs: ["HTML5", "CSS3 (Vanilla)", "JavaScript (ES6)", "Web Audio API", "HTML5 Canvas", "Apple Wallet Integration"],
            desc: "Simulador interactivo y de alta fidelidad para tarjetas de fidelidad digitales multi-marca. Diseñado con una estética corporativa formal al estilo de Apple, permite alternar marcas (Cafetería, Barbería, Sushi, Boutique) con sus respectivos esquemas de color y conteo de sellos. Cuenta con respuesta táctil directa, reproducción sonora en tiempo real por el sintetizador del navegador e integración simulada con Apple Wallet.",
            features: [
                "Menú dropdown integrado en cabecera para alternar dinámicamente entre negocios.",
                "Cuadrícula de sellos interactiva con checks de confirmación y sonidos de retroalimentación en tiempo real (Web Audio API).",
                "Celebración festiva con confeti de colores dorado y plata dibujado en Canvas 2D a 60 FPS.",
                "Simulador oficial de Apple Wallet con pase de fidelidad detallado, código de barras y avisos push nativos."
            ],
            logo: "assets/img/logo_wallet.png",
            banner: "assets/img/mockup_fidelidad.png",
            mockup: "assets/img/mockup_fidelidad.png",
            path: "../tarjeta%20de%20fidelidad/index.html",
            productionUrl: "https://st24030217-maker.github.io/tarjeta-fidelidad-/"
        },
        milea: {
            title: "MILEA studio — Catálogo de Servicios",
            cat: "Web App / E-commerce / Catálogo",
            techs: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "React", "Lucide Icons"],
            desc: "Catálogo digital interactivo y portfolio de servicios de lujo para MILEA studio. Diseñado con un enfoque editorial asimétrico y animaciones fluidas. Cuenta con pantalla de carga con efectos líquidos, buscador en tiempo real, filtros avanzados de precio y categorías, y un modal de cotizaciones integrado con WhatsApp e Instagram.",
            features: [
                "Preloader animado con transiciones líquidas y cortinas de revelado.",
                "Efecto de parallax interactivo con el cursor sobre el fondo fluido.",
                "Buscador en tiempo real con filtrado inteligente de servicios y categorías.",
                "Estructura responsiva móvil y diseño asimétrico de nivel editorial."
            ],
            logo: "assets/img/logo_milea.png",
            banner: "assets/img/milea_cards.jpg",
            mockup: "assets/img/milea_cards.jpg",
            path: "../catalogo milea/index.html",
            productionUrl: "https://st24030217-maker.github.io/catalogo-milea-/"
        },
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
            mockup: "assets/img/mockup_epad.png",
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
            mockup: "assets/img/mockup_barberia.png",
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
            mockup: "assets/img/mockup_tikeduca.png",
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
            mockup: "assets/img/mockup_kbhuates.png",
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
            mockup: "assets/img/mockup_compadres.png",
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
            mockup: "assets/img/mockup_copa.png",
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
            mockup: "assets/img/mockup_maps.png",
            path: "../proyecto maps/maps.html",
            productionUrl: "https://proyecto-maps.vercel.app/"
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    if (modalOverlay && modalCloseBtn) {
        const tabBtns = modalOverlay.querySelectorAll('.modal-tab-btn');
        const tabContents = modalOverlay.querySelectorAll('.modal-tab-content');
        const iframe = modalOverlay.querySelector('.project-iframe');
        const browserUrl = modalOverlay.querySelector('.browser-url');
        const previewLoader = modalOverlay.querySelector('.preview-loader');
        const refreshBtn = modalOverlay.querySelector('.browser-refresh-btn');

        // Selectores de los contenedores de vista previa
        const modeBtns = modalOverlay.querySelectorAll('.preview-toggle-btn');
        const mockupWrapper = modalOverlay.querySelector('.preview-mockup-wrapper');
        const iframeWrapper = modalOverlay.querySelector('.preview-iframe-wrapper');

        // Función para cambiar de modo de vista previa (Mockup vs Iframe)
        function setPreviewMode(mode) {
            modeBtns.forEach(b => {
                if (b.getAttribute('data-mode') === mode) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            if (mode === 'mockup') {
                if (mockupWrapper) mockupWrapper.classList.add('active');
                if (iframeWrapper) iframeWrapper.classList.remove('active');
                // Detener iframe para ahorrar recursos
                if (iframe) iframe.setAttribute('src', '');
            } else {
                if (mockupWrapper) mockupWrapper.classList.remove('active');
                if (iframeWrapper) iframeWrapper.classList.add('active');
                
                // Cargar iframe si no está cargado
                const currentUrl = modalOverlay.getAttribute('data-current-url');
                if (iframe && iframe.getAttribute('src') !== currentUrl) {
                    if (previewLoader) previewLoader.classList.add('active');
                    if (browserUrl) browserUrl.textContent = currentUrl;
                    iframe.setAttribute('src', currentUrl);
                }
            }
        }

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-mode');
                setPreviewMode(mode);
            });
        });

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

                    // Cargar imagen del mockup
                    const mockupImg = modalOverlay.querySelector('.project-mockup-img');
                    if (mockupImg) {
                        mockupImg.src = data.mockup || data.banner;
                    }

                    // Configurar Enlace del Proyecto (Resuelve local vs producción)
                    const viewProjectBtn = modalOverlay.querySelector('.btn-view-project');
                    const finalUrl = resolveProjectPath(data.path, data.productionUrl);
                    if (viewProjectBtn) {
                        viewProjectBtn.setAttribute('href', finalUrl);
                    }

                    // Guardar URL para previsualizar en vivo
                    modalOverlay.setAttribute('data-current-url', finalUrl);

                    // Resetear el modo de vista previa a mockup predeterminado
                    setPreviewMode('mockup');

                    // Mostrar modal
                    modalOverlay.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });

        // Lógica de Pestañas (Tabs)
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Activar pestaña
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const activeContent = modalOverlay.querySelector(`#tab-${targetTab}`);
                if (activeContent) activeContent.classList.add('active');

                // Si es la pestaña de vista previa, ajustar tamaño de modal
                const modalCard = modalOverlay.querySelector('.modal-card');
                if (targetTab === 'preview') {
                    if (modalCard) modalCard.classList.add('preview-mode');
                    // Iniciar en modo mockup
                    setPreviewMode('mockup');
                } else {
                    if (modalCard) modalCard.classList.remove('preview-mode');
                    if (iframe) iframe.setAttribute('src', ''); // Desactivar iframe al salir
                }
            });
        });

        // Evento onload del iframe para ocultar el loader
        if (iframe) {
            iframe.addEventListener('load', () => {
                if (previewLoader) previewLoader.classList.remove('active');
            });
        }

        // Botón de recargar en el navegador mock
        if (refreshBtn && iframe) {
            refreshBtn.addEventListener('click', () => {
                const currentUrl = modalOverlay.getAttribute('data-current-url');
                if (previewLoader) previewLoader.classList.add('active');
                iframe.setAttribute('src', currentUrl);
            });
        }

        // Cerrar Modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            // Limpiar iframe y resetear pestañas
            if (iframe) iframe.setAttribute('src', '');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            const detailsBtn = modalOverlay.querySelector('.modal-tab-btn[data-tab="details"]');
            const detailsContent = modalOverlay.querySelector('#tab-details');
            if (detailsBtn) detailsBtn.classList.add('active');
            if (detailsContent) detailsContent.classList.add('active');
            
            const modalCard = modalOverlay.querySelector('.modal-card');
            if (modalCard) modalCard.classList.remove('preview-mode');

            if (mockupWrapper) mockupWrapper.classList.remove('active');
            if (iframeWrapper) iframeWrapper.classList.remove('active');
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
            "Soluciones de Software",
            "Aplicaciones Web & PWAs",
            "Sistemas a Medida",
            "Comercio Digital & Stripe",
            "Arquitecturas Escalables",
            "sss.solutions"
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
    const revealElements = document.querySelectorAll('section, .skills-category-card, .project-card, .service-card, .process-step-card, .about-text, .about-highlights');
    
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

    // --- ACETERNITY UI - WAVY BACKGROUND (RECIBIDOR / HERO) ---
    // Implementación de Simplex Noise 3D procedural para ondas fluidas continuas
    class SimplexNoise3D {
        constructor() {
            this.p = new Uint8Array(256);
            for (let i = 0; i < 256; i++) this.p[i] = Math.floor(Math.random() * 256);
            this.perm = new Uint8Array(512);
            this.permMod12 = new Uint8Array(512);
            for (let i = 0; i < 512; i++) {
                this.perm[i] = this.p[i & 255];
                this.permMod12[i] = (this.perm[i] % 12);
            }
        }
        noise(xin, yin, zin) {
            const grad3 = [
                [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
            ];
            const F3 = 1.0 / 3.0;
            const G3 = 1.0 / 6.0;
            let n0, n1, n2, n3;
            const s = (xin + yin + zin) * F3;
            const i = Math.floor(xin + s);
            const j = Math.floor(yin + s);
            const k = Math.floor(zin + s);
            const t = (i + j + k) * G3;
            const X0 = i - t;
            const Y0 = j - t;
            const Z0 = k - t;
            const x0 = xin - X0;
            const y0 = yin - Y0;
            const z0 = zin - Z0;
            let i1, j1, k1;
            let i2, j2, k2;
            if (x0 >= y0) {
                if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
                else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
                else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
            } else {
                if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
                else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
                else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
            }
            const x1 = x0 - i1 + G3;
            const y1 = y0 - j1 + G3;
            const z1 = z0 - k1 + G3;
            const x2 = x0 - i2 + 2.0 * G3;
            const y2 = y0 - j2 + 2.0 * G3;
            const z2 = z0 - k2 + 2.0 * G3;
            const x3 = x0 - 1.0 + 3.0 * G3;
            const y3 = y0 - 1.0 + 3.0 * G3;
            const z3 = z0 - 1.0 + 3.0 * G3;
            const ii = i & 255;
            const jj = j & 255;
            const kk = k & 255;
            let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
            if (t0 < 0) n0 = 0.0;
            else {
                t0 *= t0;
                const gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]];
                n0 = t0 * t0 * (grad3[gi0][0]*x0 + grad3[gi0][1]*y0 + grad3[gi0][2]*z0);
            }
            let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
            if (t1 < 0) n1 = 0.0;
            else {
                t1 *= t1;
                const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]];
                n1 = t1 * t1 * (grad3[gi1][0]*x1 + grad3[gi1][1]*y1 + grad3[gi1][2]*z1);
            }
            let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
            if (t2 < 0) n2 = 0.0;
            else {
                t2 *= t2;
                const gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]];
                n2 = t2 * t2 * (grad3[gi2][0]*x2 + grad3[gi2][1]*y2 + grad3[gi2][2]*z2);
            }
            let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
            if (t3 < 0) n3 = 0.0;
            else {
                t3 *= t3;
                const gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]];
                n3 = t3 * t3 * (grad3[gi3][0]*x3 + grad3[gi3][1]*y3 + grad3[gi3][2]*z3);
            }
            return 32.0 * (n0 + n1 + n2 + n3);
        }
    }

    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        const noise = new SimplexNoise3D();
        let w = 0, h = 0, nt = 0;
        const waveCount = 5;
        const waveWidth = 45;
        const speed = 0.0022;

        // Paleta monocromática en blanco y negro (Aceternity B&W Edition)
        const darkWaveColors = [
            "rgba(255, 255, 255, 0.42)",
            "rgba(228, 228, 231, 0.32)",
            "rgba(161, 161, 170, 0.25)",
            "rgba(113, 113, 122, 0.20)",
            "rgba(63, 63, 70, 0.16)"
        ];

        const lightWaveColors = [
            "rgba(9, 9, 11, 0.32)",
            "rgba(39, 39, 42, 0.24)",
            "rgba(82, 82, 91, 0.18)",
            "rgba(113, 113, 122, 0.14)",
            "rgba(161, 161, 170, 0.10)"
        ];

        function resizeCanvas() {
            w = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
            h = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function drawWaves() {
            nt += speed;
            const isLight = document.body.classList.contains('light-theme');
            const colors = isLight ? lightWaveColors : darkWaveColors;

            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth;
                ctx.strokeStyle = colors[i % colors.length];

                for (let x = 0; x < w; x += 5) {
                    const y = noise.noise(x / 800, 0.3 * i, nt) * 100;
                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
        }

        function renderWavyBackground() {
            const isLight = document.body.classList.contains('light-theme');
            ctx.fillStyle = isLight ? "#ffffff" : "#000000";
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 1;

            drawWaves();
            requestAnimationFrame(renderWavyBackground);
        }
        renderWavyBackground();
    }

    // Purga de preferencias antiguas de acento de color
    localStorage.removeItem('accent-color');

    // --- ANIMACIÓN DE CONTADORES DE ESTADÍSTICAS ---
    const statsContainer = document.querySelector('.about-highlights');
    const statNumbers = document.querySelectorAll('.highlight-box h4');

    if (statsContainer && statNumbers.length > 0) {
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const text = stat.textContent.trim();
                const numericMatch = text.match(/\d+/);
                if (!numericMatch) return;

                const targetVal = parseInt(numericMatch[0], 10);
                const suffix = text.replace(numericMatch[0], '');
                
                let currentVal = 0;
                const duration = 1200; // 1.2s
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeProgress = progress * (2 - progress);
                    currentVal = Math.floor(easeProgress * targetVal);
                    
                    stat.textContent = currentVal + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = text;
                    }
                };

                requestAnimationFrame(updateCount);
            });
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        statsObserver.observe(statsContainer);
    }
});
