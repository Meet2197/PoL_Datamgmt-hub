document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration and Data ---
    const tailwindConfig = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    // Retaining the original color scheme as requested
                    'primary-blue': '#1a237e',
                    'secondary-violet': '#6a47a8',
                    'secondary-red': '#ef4444',
                    'light-bg': '#f4f7f9',
                    'dark-bg': '#121212',
                    'dark-surface': '#1e1e1e',
                    'dark-card': '#2a2a2a',
                    // Ensuring the gray color palette is available for text
                    'gray': {
                        100: '#f3f4f6',
                        200: '#e5e7eb',
                        300: '#d1d5db',
                        400: '#9ca3af',
                        500: '#6b7280',
                        600: '#4b5563',
                        700: '#374151',
                        800: '#1f2937',
                        900: '#111827',
                    }
                },
                fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                },
            },
        },
    };
    tailwind.config = tailwindConfig;

    // The list of tools for the carousel, as provided by the user.
    const toolsData = [
        { name: 'Zenodo', link: 'https://zenodo.org/', logo: 'static/images/logos/zenodo_logo.jpg', description: 'A general-purpose open-access repository for research data, software, publications, and more.', documentation: 'https://help.zenodo.org/docs/', join: 'https://zenodo.org/signup/' },
        { name: 'Figshare', link: 'https://figshare.com/', logo: 'static/images/logos/imagesc-logo.png', description: 'An online repository to share, publish, and discover research data, figures, and other scholarly outputs.', documentation: 'https://knowledge.figshare.com/', join: 'https://figshare.com/account/login' },
        { name: 'elabftw', link: 'https://elab.cmcb.tu-dresden.de/', logo: 'static/images/logos/elabftw-logo.png', description: 'An open-source electronic lab notebook for recording and managing experimental data.', documentation: 'https://doc.elabftw.net/', join: 'https://elab.cmcb.tu-dresden.de/login.php' },
        { name: 'Gitlab TUD', link: 'https://gitlab.mn.tu-dresden.de/', logo: 'static/images/logos/gitlab-logo.png', description: 'TU Dresden\'s platform for Git-based version control, code collaboration, and CI/CD.', documentation: 'https://tu-dresden.de/mn/der-bereich/it-kompetenz-und-servicezentrum/gitlab-dienst', join: 'https://gitlab.mn.tu-dresden.de/users/sign_in' },
        { name: 'OpARA TUD', link: 'https://opara.zih.tu-dresden.de/home', logo: 'static/images/logos/opara-logo.png', description: 'TU Dresden\'s institutional repository for publications and research data, ensuring long-term accessibility.', documentation: 'https://opara.zih.tu-dresden.de/collections/1b788b1c-9c5f-402c-8c5b-74eb38f69bb0', join: 'https://opara.zih.tu-dresden.de/login' },
        { name: 'BioImage Archive', link: 'https://www.ebi.ac.uk/bioimage-archive/help-policies/', logo: 'static/images/logos/bioimage-archive-logo.png', description: 'EMBL supported Large-scale, centralised data resource to host reference imaging data.', documentation: 'https://www.ebi.ac.uk/about/', join: 'https://www.ebi.ac.uk/biostudies/submissions/signin' },
        { name: 'PRIDE Database', link: 'https://www.ebi.ac.uk/pride/', logo: 'static/images/logos/pride_logo.png', description: 'PRoteomics Archive database is data repository for mass spectrometry proteomics data.', documentation: 'https://www.ebi.ac.uk/pride/markdownpage/citationpage', join: 'https://www.ebi.ac.uk/pride/login'},
    ];
    
    const sliderContainer = document.getElementById('sharing-archiving-tools-container');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const sliderDots = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    let toolsPerSlide = 2; // Default for mobile
    let totalSlides = 0;
    
    // --- Hamburger Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }
    // --- End Hamburger Menu Toggle ---

    // Function to determine tools per slide based on screen size
    const updateToolsPerSlide = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
            toolsPerSlide = 3; // Desktop
        } else if (width >= 768) {
            toolsPerSlide = 2; // Tablet
        } else {
            toolsPerSlide = 1; // Mobile
        }
        totalSlides = Math.ceil(toolsData.length / toolsPerSlide);
    };
    
    // Function to populate and open the tool details modal
    const openToolDetailsModal = (tool) => {
        const modal = document.getElementById('tool-details-modal');
        
        const modalLogo = document.getElementById('tool-modal-logo');
        const modalName = document.getElementById('tool-modal-name');
        const modalDescription = document.getElementById('tool-modal-description');
        const modalDocBtn = document.getElementById('tool-modal-doc-btn');
        const modalJoinBtn = document.getElementById('tool-modal-join-btn');
        modalLogo.src = tool.logo;
        modalLogo.alt = `${tool.name} logo`;
        modalName.textContent = tool.name;
        modalDescription.textContent = tool.description;
        modalDocBtn.href = tool.documentation;
        modalJoinBtn.href = tool.join;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };
    
    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    
    // Set theme on page load based on localStorage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
        if (lightIcon && darkIcon) {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    } else {
        document.body.classList.remove('dark');
        if (lightIcon && darkIcon) {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
    
    // Add event listener to the toggle button
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDarkMode = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        if (lightIcon && darkIcon) {
            lightIcon.classList.toggle('hidden');
            darkIcon.classList.toggle('hidden');
        }
    });
    // --- End Dark Mode Toggle ---
    
    // Function to render slider cards
    const renderSliderCards = () => {
        sliderContainer.innerHTML = '';
        const startIndex = currentSlide * toolsPerSlide;
        const endIndex = startIndex + toolsPerSlide;
        const toolsToShow = toolsData.slice(startIndex, endIndex);

        toolsToShow.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'slider-card-item p-4 bg-gray-200 dark:bg-dark-surface rounded-lg shadow-md cursor-pointer transition-transform duration-200 transform hover:scale-105';
            card.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${tool.logo}" alt="${tool.name} logo" class="h-10 w-10 object-contain">
                    <span class="font-semibold text-gray-800 dark:text-gray-200">${tool.name}</span>
                </div>
            `;
            card.addEventListener('click', () => {
                openToolDetailsModal(tool);
            });
            sliderContainer.appendChild(card);
        });

        // Update dot pagination and button state
        updateSliderDots();
        updateSliderButtons();
    };
    
    // Function to update slider dots
    const updateSliderDots = () => {
        if (!sliderDots) return;
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = `w-2 h-2 rounded-full ${i === currentSlide ? 'bg-secondary-violet' : 'bg-gray-400 dark:bg-gray-600'} cursor-pointer`;
            dot.addEventListener('click', () => {
                currentSlide = i;
                renderSliderCards();
            });
            sliderDots.appendChild(dot);
        }
    };
    
    // Function to update slider buttons
    const updateSliderButtons = () => {
        if (sliderPrev) {
            sliderPrev.disabled = currentSlide === 0;
        }
        if (sliderNext) {
            sliderNext.disabled = currentSlide >= totalSlides - 1;
        }
    };

    // Event listeners for slider controls
    if (sliderPrev) {
        sliderPrev.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                renderSliderCards();
            }
        });
    }

    if (sliderNext) {
        sliderNext.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                renderSliderCards();
            }
        });
    }

    // Initialize the slider and handle window resize
    const initializeSlider = () => {
        updateToolsPerSlide();
        renderSliderCards();
    };

    window.addEventListener('resize', () => {
        // Reset to first slide on resize to prevent issues
        currentSlide = 0;
        initializeSlider();
    });

    // Run initial setup
    initializeSlider();

    // Attach event listener for the tool details modal close button
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    });

});