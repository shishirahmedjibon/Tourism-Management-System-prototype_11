const Customer = {
  state: {
    search: "",
    category: "All",
    selectedPackageId: null
  },

  render() {
    const view = document.getElementById("customerView");
    view.innerHTML = `
      <div class="hero">
        <h2>Where to next?</h2>
        <p>Browse tourism packages, check itineraries, and book your trip in minutes.</p>
        <div class="search-row">
          <input id="searchInput" type="text" placeholder="Search destination or package" value="${this.state.search}">
          <select id="categorySelect">
            ${categories.map(c => `<option ${this.state.category === c ? "selected" : ""}>${c}</option>`).join("")}
          </select>
        </div>
      </div>

      <h2 class="section-title">Tour Packages</h2>
      <div class="grid" id="packageGrid"></div>
    `;

    this.bind();
    this.renderPackages();
  },

  bind() {
    document.getElementById("searchInput").addEventListener("input", e => {
      this.state.search = e.target.value;
      this.renderPackages();
    });

    document.getElementById("categorySelect").addEventListener("change", e => {
      this.state.category = e.target.value;
      this.renderPackages();
    });
  },

  filteredPackages() {
    const q = this.state.search.toLowerCase();
    return packages.filter(p => {
      const matchesCategory = this.state.category === "All" || p.category === this.state.category;
      const matchesSearch = p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  },

  renderPackages() {
    const grid = document.getElementById("packageGrid");
    const items = this.filteredPackages();

    if (items.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--sage);">No packages found matching your search.</p>`;
      return;
    }

    grid.innerHTML = items.map(pkg => `
      <div class="card">
        <div class="card-image">
          <img src="${pkg.image}" alt="${pkg.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400/164b43/fffcf5?text=No+Image'">
        </div>
        <div class="card-content">
          <h3>${pkg.name}</h3>
          <div class="meta">${pkg.destination} · ${pkg.days} days · ${pkg.category}</div>
          <p class="blurb">${pkg.blurb}</p>
          <div class="price">৳${pkg.price.toLocaleString()}</div>
          <div class="card-footer">
            <span class="rating-info">⭐ ${pkg.rating} | Seats: ${pkg.seats}</span>
            <button class="btn btn-primary" data-package-id="${pkg.id}" id="view-${pkg.id}">View details</button>
          </div>
        </div>
      </div>
    `).join("");

    items.forEach(pkg => {
      document.getElementById(`view-${pkg.id}`).addEventListener("click", () => {
        this.state.selectedPackageId = pkg.id;
        this.openModal(pkg);
      });
    });
  },

  openModal(pkg) {
    const root = document.getElementById("modalRoot");
    root.innerHTML = `
      <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
          <img src="${pkg.image}" alt="${pkg.name}" onerror="this.src='https://via.placeholder.com/760x250/164b43/fffcf5?text=No+Image'">
          <h2>${pkg.name}</h2>
          <p><strong>Destination:</strong> ${pkg.destination}</p>
          <p><strong>Duration:</strong> ${pkg.days} days</p>
          <p><strong>Category:</strong> ${pkg.category}</p>
          <p><strong>Price:</strong> ৳${pkg.price.toLocaleString()}</p>
          <p><strong>Rating:</strong> ⭐ ${pkg.rating} | <strong>Seats left:</strong> ${pkg.seats}</p>
          <p>${pkg.blurb}</p>
          <h4>Itinerary</h4>
          <ul>${pkg.itinerary.map(i => `<li>${i}</li>`).join("")}</ul>

          <div class="booking-form">
            <h4>Book This Package</h4>
            <div class="form-row">
              <input class="form-field" id="bookName" placeholder="Full name">
              <input class="form-field" id="bookEmail" placeholder="Email address">
              <input class="form-field" id="bookDate" type="date">
              <input class="form-field" id="bookTravelers" type="number" min="1" value="1" placeholder="Travelers">
            </div>
            <div class="form-actions">
              <button class="btn btn-coral" id="confirmBooking">Confirm booking</button>
              <button class="btn btn-outline" id="closeModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("closeModal").onclick = () => root.innerHTML = "";
    document.getElementById("modalOverlay").onclick = e => {
      if (e.target.id === "modalOverlay") root.innerHTML = "";
    };

    document.getElementById("confirmBooking").onclick = () => {
      const name = document.getElementById("bookName").value.trim();
      const email = document.getElementById("bookEmail").value.trim();
      const date = document.getElementById("bookDate").value;
      const travelers = Number(document.getElementById("bookTravelers").value || 1);

      if (!name || !email || !date) {
        alert("Please fill all booking fields (Name, Email, and Date).");
        return;
      }

      if (travelers > pkg.seats) {
        alert(`Only ${pkg.seats} seats available for this package.`);
        return;
      }

      bookings.push({
        id: "b" + Date.now(),
        packageId: pkg.id,
        name,
        email,
        travelers,
        date,
        status: "Pending",
        code: null
      });

      // Reduce available seats
      const packageIndex = packages.findIndex(p => p.id === pkg.id);
      if (packageIndex !== -1) {
        packages[packageIndex].seats -= travelers;
      }

      Storage.save();
      root.innerHTML = "";
      showToast(`Booking request submitted for ${pkg.name}!`);
      this.renderPackages();
    };
  }
};