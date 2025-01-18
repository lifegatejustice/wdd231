document.getElementById('menu').addEventListener('click', toggleMenu);
document.getElementById('search-icon-link').addEventListener('click', toggleMenu);

function toggleMenu() {
    const nav = document.querySelector('.navigation');
    const menu = document.getElementById('menu');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
}