// main.js
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('main-nav');
    const navToggle = document.createElement('button');
    navToggle.textContent = 'Menu';
    navToggle.setAttribute('aria-label', 'Toggle navigation');
    nav.parentNode.insertBefore(navToggle, nav);

    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});