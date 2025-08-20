document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
        <nav class="bg-white dark:bg-dark-surface fixed w-full z-20 top-0 start-0 shadow-md dark:shadow-lg transition-colors duration-300">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="index.html" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="Resources/images/logos/tud_logo.svg" class="h-12 w-auto rounded-full shadow-lg" alt="PoL Logo">
                </a>
                <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
                    <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                        <i id="theme-toggle-light-icon" class="fa-solid fa-sun h-5 w-5 hidden"></i>
                        <i id="theme-toggle-dark-icon" class="fa-solid fa-moon h-5 w-5 hidden"></i>
                    </button>
                    <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-dark-surface md:dark:bg-dark-surface dark:border-gray-700">
                        <li>
                            <a href="index.html" class="block py-2 px-3 text-white bg-primary-blue rounded md:bg-transparent md:text-primary-blue md:p-0 md:dark:text-secondary-violet" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="whats-new.html" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-blue md:p-0 md:dark:hover:text-secondary-violet dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">What's New</a>
                        </li>
                        <li>
                            <a href="resources.html" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-blue md:p-0 md:dark:hover:text-secondary-violet dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Resources</a>
                        </li>
                        <li>
                            <a href="Events.html" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-blue md:p-0 md:dark:hover:text-secondary-violet dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Events</a>
                        </li>
                        <li>
                            <a href="about.html" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-blue md:p-0 md:dark:hover:text-secondary-violet dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        <li>
                            <a href="contact.html" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-blue md:p-0 md:dark:hover:text-secondary-violet dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // --- Inject the Navigation Bar into the page ---
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = navHTML;
    }

    // --- Dynamic Logic for Theme Toggle & Mobile Nav ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const htmlTag = document.documentElement;

    // Set initial theme based on localStorage or system preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlTag.classList.add('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    } else {
        htmlTag.classList.remove('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }

    // Add event listener for theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = htmlTag.classList.contains('dark');
        if (isCurrentlyDark) {
            htmlTag.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            htmlTag.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    });

    // Mobile navigation logic
    const mobileMenuBtn = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
    const mobileMenu = document.getElementById('navbar-sticky');
    
    // Check if the mobile menu button exists before adding the event listener
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }
});