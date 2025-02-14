// user-profile.js

document.addEventListener('DOMContentLoaded', () => {
    // Create user modal HTML
    const userModal = document.createElement('div');
    userModal.className = 'user-modal';
    userModal.innerHTML = `
        <div class="user-modal-content">
            <div class="user-modal-header">
                <h2>User Profile</h2>
                <button class="user-modal-close">&times;</button>
            </div>
            <div class="user-profile">
                <div class="user-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="user-info">
                    <h3>Guest User</h3>
                    <p>Welcome to Linemania!</p>
                </div>
                <div class="user-actions">
                    <button class="user-action-btn" id="favorites-btn">My Favorites</button>
                    <button class="user-action-btn" id="watchlist-btn">My Watchlist</button>
                </div>
                <div class="user-preferences">
                    <div class="preference-toggle">
                        <span>Dark Mode</span>
                        <input type="checkbox" id="dark-mode-toggle">
                    </div>
                    <div class="preference-toggle">
                        <span>Email Notifications</span>
                        <input type="checkbox" id="notifications-toggle">
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(userModal);

    // Get DOM elements
    const userIcon = document.getElementById('user-icon');
    const closeBtn = userModal.querySelector('.user-modal-close');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const notificationsToggle = document.getElementById('notifications-toggle');

    // Load saved preferences
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
        darkMode: false,
        notifications: false
    };

    darkModeToggle.checked = savedPreferences.darkMode;
    notificationsToggle.checked = savedPreferences.notifications;

    // Event Listeners
    userIcon.addEventListener('click', (e) => {
        e.preventDefault();
        userModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        userModal.classList.remove('active');
    });

    // Close modal when clicking outside
    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
            userModal.classList.remove('active');
        }
    });

    // Save preferences to localStorage
    function savePreferences() {
        const preferences = {
            darkMode: darkModeToggle.checked,
            notifications: notificationsToggle.checked
        };
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-theme', darkModeToggle.checked);
        savePreferences();
    });

    notificationsToggle.addEventListener('change', savePreferences);

    // Handle favorites and watchlist buttons
    document.getElementById('favorites-btn').addEventListener('click', () => {
        alert('Favorites feature coming soon!');
    });

    document.getElementById('watchlist-btn').addEventListener('click', () => {
        alert('Watchlist feature coming soon!');
    });
});