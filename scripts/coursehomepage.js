const lastModified = document.querySelector("#last-modified");

const today = new Date();
const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(today);

if (lastModified) lastModified.textContent = formattedDate;