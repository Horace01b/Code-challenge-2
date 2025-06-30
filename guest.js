const form = document.getElementById("guest-form");
const nameInput = document.getElementById("guest-name");
const categoryInput = document.getElementById("guest-category");
const guestListEl = document.getElementById("guest-list");
const countEl = document.getElementById("guest-count");
const filterInput = document.getElementById("filter-category");

let guests = JSON.parse(localStorage.getItem("guests")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const category = categoryInput.value.trim();

  if (!name || !category) return;

  if (guests.length >= 10) {
    alert("Guest list limit reached (10)");
    return;
  }

  const newGuest = {
    id: Date.now(),
    name,
    category,
    attending: true,
    addedAt: new Date().toLocaleTimeString()
  };

  guests.push(newGuest);
  saveGuests();
  renderList();
  form.reset();
});

function saveGuests() {
  localStorage.setItem("guests", JSON.stringify(guests));
}

function renderList() {
  guestListEl.innerHTML = "";

  const selectedCategory = filterInput.value.trim().toLowerCase();

  const visibleGuests = guests.filter(guest =>
    selectedCategory === "" || guest.category.toLowerCase().includes(selectedCategory)
  );

  countEl.textContent = `Total Guests: ${visibleGuests.length}`;

  visibleGuests.forEach((guest) => {
    const li = document.createElement("li");
    li.className = `guest ${guest.attending ? "attending" : "not-attending"}`;

    li.innerHTML = `
      <span>
        <strong>${guest.name}</strong> - ${guest.category} - added at ${guest.addedAt}
      </span>
      <div>
        <button onclick="toggleRSVP(${guest.id})">${guest.attending ? "Attending" : "Not Attending"}</button>
        <button onclick="editGuest(${guest.id})">Edit</button>
        <button onclick="removeGuest(${guest.id})">Remove</button>
      </div>
    `;

    guestListEl.appendChild(li);
  });
}

window.removeGuest = (id) => {
  guests = guests.filter((guest) => guest.id !== id);
  saveGuests();
  renderList();
};

window.toggleRSVP = (id) => {
  guests = guests.map((guest) =>
    guest.id === id ? { ...guest, attending: !guest.attending } : guest
  );
  saveGuests();
  renderList();
};

window.editGuest = (id) => {
  const guest = guests.find((g) => g.id === id);
  const newName = prompt("Enter new name:", guest.name);
  if (newName && newName.trim()) {
    guest.name = newName.trim();
    saveGuests();
    renderList();
  }
};

filterInput.addEventListener("input", renderList);

// Initial render
renderList();
