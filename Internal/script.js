document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const htmlTag = document.documentElement;

    // Check for saved theme preference
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
        htmlTag.classList.add('dark');
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
    } else {
        htmlTag.classList.remove('dark');
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }

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

    // Mobile menu logic, updated to match index.html
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);
});
document.querySelectorAll("[data-modal-target]").forEach(trigger => {
  trigger.addEventListener("click", e => {
  e.preventDefault();
  const targetId = trigger.getAttribute("data-modal-target");
  const modal = document.getElementById(targetId);
  if (modal) {
      modal.classList.add("active");
      document.body.classList.add("overflow-hidden"); // Prevent background scroll
  }
  });
});

// Close modal when clicking close buttons or backdrop
document.querySelectorAll("[data-modal-close]").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
  const targetId = closeBtn.getAttribute("data-modal-close");
  const modal = document.getElementById(targetId);
  if (modal) {
      modal.classList.remove("active");
      document.body.classList.remove("overflow-hidden");
  }
  });
});