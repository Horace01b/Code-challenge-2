const form = document.getElementById("guest-form");
const nameInput = document.getElementById("guest-name");
const categoryInput = document.getElementById("guest-category");
const guestListEl = document.getElementById("guest-list");
const countEl = document.getElementById("guest-count");
const filterInput = document.getElementById("filter-category");

let guest = JSON.parse(localStorage.getItem("guests")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.Value.trim();
    const category = categoryInput.value.trim();

    if (!name || !category) return;

    if (guest.length >= 10) {
        alert("Guest list limit reached (10)");
        return;
    }

    const guest = {
    ide: Date.now(),
    name,
    category,
    attending: true,
    addedAt: new Date().toLocaleTimeString
};

guest.push(newGuest);
saveGuests();
nameInput.value = "";
categoryInput.value = "";
renderList();
});

function saveGuests() {
    localStorage.setItem("guests", JSON.stringify(guests));
}

function renderList() {
    guestList.innerHTML = "";

    const selectedCategory = filterInput.value.trim().toLowerCase();

    const visibleGuests = guests.filter(guest =>
        selectedCategory === "" || guest.category.toLowerCase().includes(selectedCategory)
    );

    visibleGuests.forEach((guest) => {
        const li = document.createElement("li");
        li.className = `guest ${guest.attending ? "attending" : "not.attending"}`;

        li.innerHTML = `
            <span>
                <strong>${guest.name}</strong> - ${guest.category} - added at ${guest.addedAt}
            </span>
            <div>
                <button onclick="toggleRSVP(${guest.id})"> ${guest.attending ? "Attending" : "Not Attending"}</button>
                <button onclick="editGuest(${guest.id})">Edit</button>
                <button onclick="removeGuest(${guest.id})">Remove</button>
            </div>
            `;

            guestListEl.appendChild(li);

    });
}

    window.removeGuest = (id) => {
        guests = guests.filter((guest) => guest.id !==id);
        renderList(); 
    };

    window.toggleRSVP = (id) => {
        guests = guests.map((guest) =>
            guest.id === id ? {...guest, attending: !guest.attending} : guest
    );
    renderList()
    }

    window.editGuest = (id) => {
        const guest = guests.find((g) => g.id ===id);
        const newName = prompt("Enter new name:", guest.name);
        if (newName && newName.trim()) {
            guest.name = newName.trim();
            renderList();
        }
    };




