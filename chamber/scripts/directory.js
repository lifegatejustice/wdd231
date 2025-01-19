// Get the current year
const currentYear = new Date().getFullYear();

// Get the last modified date
const lastModifiedDate = document.lastModified;

// Select the footer paragraphs
const footerParagraphs = document.querySelectorAll('footer p');


// Update the first paragraph with the current year and add a line break
footerParagraphs[6].innerHTML = `© ${currentYear} 2025 Abia Chamber Of Commerce`;

// Update the third paragraph with the last modified date
footerParagraphs[7].textContent = `Last modified: ${lastModifiedDate}`;

document.getElementById('menu').addEventListener('click', toggleMenu);

function toggleMenu() {
    const nav = document.querySelector('.navigation');
    const menu = document.getElementById('menu');
    nav.classList.toggle('open');
    menu.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", async () => {
    const memberListContainer = document.getElementById("member-list");
    const gridViewButton = document.getElementById("grid-view-button");
    const listViewButton = document.getElementById("list-view-button");

    async function fetchMembers() {
        const response = await fetch("data/members.json");
        const members = await response.json();
        return members;
    }

    function createMemberCard(member) {
        return `

            <div class="member-card1">
            <h3>${member.name}</h3>
            <div class="member-card">
              
                <img src="${member.image}" alt="${member.name} logo">
                
                <div class="member-details">
                
                <b>ADDRESS: </b><p>${member.address}</p>
                <b>PHONE: </b><p>${member.phone}</p>
                <b>WEBSITE: </b><p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <b>MEMBERSHIP LEVEL: </b><p>${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
                <p><span class="member-des">${member.description}</span></p></div>
            </div></div>
        `;
    }

    function createMemberList(member) {
        return `
             <div class="member-card1">
            <h3>${member.name}</h3>
            <div class="member-card">
              
                <img src="${member.image}" alt="${member.name} logo">
                
                <div class="member-details">
                
                <b>ADDRESS: </b><p>${member.address}</p>
                <b>PHONE: </b><p>${member.phone}</p>
                <b>WEBSITE: </b><p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <b>MEMBERSHIP LEVEL: </b><p>${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
                <p>${member.description}</p></div>
            </div></div>
        `;
    }

    async function renderMembers(viewType = "grid") {
        const members = await fetchMembers();
        memberListContainer.innerHTML = members
            .map(member => (viewType === "grid" ? createMemberCard(member) : createMemberList(member)))
            .join("");
        memberListContainer.className = viewType === "grid" ? "grid-view" : "list-view";
    }

    gridViewButton.addEventListener("click", () => renderMembers("grid"));
    listViewButton.addEventListener("click", () => renderMembers("list"));

    renderMembers(); // Default view
});
