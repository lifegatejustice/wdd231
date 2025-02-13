// main.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
});

// main.js (continued)

// Save and load theme preference
function saveThemePreference(isDark) {
    localStorage.setItem('darkTheme', isDark);
}

function loadThemePreference() {
    return localStorage.getItem('darkTheme') === 'true';
}

// Toggle dark theme
function toggleDarkTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    saveThemePreference(isDark);
}

// Apply theme on load
document.addEventListener('DOMContentLoaded', () => {
    if (loadThemePreference()) {
        document.body.classList.add('dark-theme');
    }

const themeToggle = document.querySelector('theme-toggle');

themeToggle.addEventListener('click', toggleDarkTheme);
document.body.appendChild(themeToggle);
});