// Set the current date and time in the hidden timestamp field
document.getElementById('timestamp').value = new Date().toISOString();

// Modal functionality
var modals = document.getElementsByTagName("dialog");
var links = document.getElementsByClassName("modal-link");
var spans = document.getElementsByClassName("close");

for (let i = 0; i < links.length; i++) {
    links[i].onclick = function(event) {
        event.preventDefault();
        var modalId = this.getAttribute("href");
        document.querySelector(modalId).showModal();
    }
}

for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function() {
        this.parentElement.parentElement.close();
    }
}

window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
            modals[i].close();
        }
    }
}