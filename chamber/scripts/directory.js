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
            <div class="member-card">
                <img src="${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
                <p>${member.description}</p>
            </div>
        `;
    }

    function createMemberList(member) {
        return `
            <div class="member-list-item">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${["Member", "Silver", "Gold"][member.membershipLevel - 1]}</p>
                <p>${member.description}</p>
            </div>
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
