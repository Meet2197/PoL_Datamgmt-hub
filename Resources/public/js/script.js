document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration and Data ---
    const toolsData = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: 'Resources/images/logos/zenodo_logo.jpg', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'Internal/zenodo.html', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: 'Resources/images/logos/imagesc-logo.png', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'Internal/figshare.html', join: 'https://figshare.com/account/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: 'Resources/images/logos/elabftw-logo.png', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'Internal/elabftw.html', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: 'Resources/images/logos/gitlab-logo.png', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'Internal/gitlab.html', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: 'Resources/images/logos/opara-logo.png', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'Internal/OPARA.html', join: 'https://opara.zih.tu-dresden.de/login' },
        { name: 'BioImage Archive', link: 'https://www.ebi.ac.uk/bioimage-archive/help-policies/', logo: 'Resources/images/logos/bioimage-archive-logo.png', description: 'EMBL supported Large-scale, centralised data resource to host reference imaging data.', documentation: 'Internal/Bioimagearchieve.html', join: 'https://www.ebi.ac.uk/biostudies/submissions/signin' },
        { name: 'PRIDE Database', link: 'https://www.ebi.ac.uk/pride/', logo: 'Resources/images/logos/pride_logo.png', description: 'PRoteomics Archive database is data repository for mass spectrometry proteomics data.', documentation: 'Internal/pride_database.html', join: 'https://www.ebi.ac.uk/pride/login'},
    ];
    
    // --- DOM Elements ---
    const sliderContainer = document.getElementById('sharing-archiving-tools-container');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const sliderDots = document.getElementById('slider-dots');
    const modalToolDetails = document.getElementById('tool-details-modal');
    
    let currentSlide = 0;
    
    // --- Helper Functions ---
    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex'; // Use display:flex for the modal container
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none'; // Use display:none to hide the modal
            document.body.style.overflow = '';
        }
    };

    const openToolDetailsModal = (tool) => {
        if (!modalToolDetails) return;
        
        document.getElementById('tool-modal-logo').src = tool.logo;
        document.getElementById('tool-modal-name').textContent = tool.name;
        document.getElementById('tool-modal-description').textContent = tool.description;
        document.getElementById('tool-modal-doc-btn').href = tool.documentation;
        document.getElementById('tool-modal-join-btn').href = tool.join;

        openModal('tool-details-modal');
    };
    
    // --- Dynamic Tool Card Generation ---
    const renderTools = () => {
        if (!sliderContainer) return;
        sliderContainer.innerHTML = '';
        toolsData.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'slider-card-item rounded-lg p-3 sm:p-4 bg-gray-100 dark:bg-dark-card shadow-md flex-shrink-0 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3';
            card.innerHTML = `
                <div class="flex flex-col items-center justify-between h-full">
                    <img src="${tool.logo}" alt="${tool.name} logo" class="h-10 w-10 sm:h-12 sm:w-12 object-contain mb-2">
                    <p class="font-semibold text-xs sm:text-sm text-primary-blue dark:text-gray-200 text-center">${tool.name}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                openToolDetailsModal(tool);
            });
            sliderContainer.appendChild(card);
        });
    };
    
    // --- Slider Functionality ---
    const updateSlider = () => {
        if (!sliderContainer) return;
        const card = sliderContainer.querySelector('.slider-card-item');
        if (!card) return;
        
        const cardWidth = card.offsetWidth + 12;
        const totalSlides = toolsData.length;
        
        if (currentSlide < 0) currentSlide = 0;
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

        sliderContainer.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        
        updateButtons();
        updateDots();
    };
    
    const updateButtons = () => {
        if (sliderPrev && sliderNext) {
            const totalSlides = toolsData.length;
            sliderPrev.disabled = currentSlide === 0;
            sliderNext.disabled = currentSlide >= totalSlides - 1;
        }
    };
    
    const updateDots = () => {
        if (sliderDots) {
            sliderDots.innerHTML = '';
            for (let i = 0; i < toolsData.length; i++) {
                const dot = document.createElement('span');
                dot.className = `w-2 h-2 rounded-full mx-1 transition-colors duration-200 cursor-pointer ${i === currentSlide ? 'bg-secondary-violet' : 'bg-gray-400 dark:bg-gray-600'}`;
                dot.addEventListener('click', () => {
                    currentSlide = i;
                    updateSlider();
                });
                sliderDots.appendChild(dot);
            }
        }
    };
    
    // --- Event Listeners ---
    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            if (currentSlide < toolsData.length - 1) {
                currentSlide++;
                updateSlider();
            }
        });
    }

    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }

    // --- Modal Functionality ---
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal-close');
            closeModal(modalId);
        });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modalWrapper = e.target.closest('.modal-wrapper');
            if (modalWrapper) {
                const modalId = modalWrapper.id;
                closeModal(modalId);
            }
        });
    });

    // --- Other Functionality ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const root = document.documentElement;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        root.classList.add(currentTheme);
        if (currentTheme === 'dark') {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            root.classList.toggle('dark');
            const newTheme = root.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            lightIcon.classList.toggle('hidden');
            darkIcon.classList.toggle('hidden');
        });
    }

    const heroSection = document.querySelector('header');
    const navbar = document.getElementById('navbar');
    
    if (heroSection && navbar) {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    navbar.classList.add('bg-white/80', 'dark:bg-dark-surface/80', 'shadow-md');
                } else {
                    navbar.classList.remove('bg-white/80', 'dark:bg-dark-surface/80', 'shadow-md');
                }
            },
            {
                rootMargin: '-50px 0px 0px 0px',
            }
        );
        observer.observe(heroSection);
    }
    
    // --- Initial Setup and Event Handling ---
    renderTools();
    updateSlider();

    window.addEventListener('resize', debounce(() => {
        updateSlider();
    }, 250));

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": {
                "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                "repulse": { "distance": 200, "duration": 0.4 },
                "push": { "particles_nb": 4 },
                "remove": { "particles_nb": 2 }
            }
        },
        "retina_detect": true
    });
});