document.addEventListener('DOMContentLoaded', () => {
    const formData = document.getElementById('form-data');
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('name') && params.has('email') && params.has('message')) {
        formData.innerHTML = `
            <p><strong>Name:</strong> ${params.get('name')}</p>
            <p><strong>Email:</strong> ${params.get('email')}</p>
            <p><strong>Message:</strong> ${params.get('message')}</p>
        `;
    } else {
        formData.innerHTML = '<p>No form data submitted.</p>';
    }
});