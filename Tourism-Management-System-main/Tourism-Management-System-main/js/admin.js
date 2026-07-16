const Admin = {
  render() {
    const view = document.getElementById("adminView");
    view.innerHTML = `
      <h2 class="section-title">Admin Panel</h2>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Package</th>
              <th>Destination</th>
              <th>Category</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            ${packages.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>${p.destination}</td>
                <td>${p.category}</td>
                <td>৳${p.price}</td>
                <td>${p.seats}</td>
                <td><img src="${p.image}" alt="${p.name}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;" onerror="this.style.display='none'"></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title" style="margin-top:24px;">Bookings</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Package</th>
              <th>Date</th>
              <th>Travelers</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => {
              const pkg = packages.find(p => p.id === b.packageId);
              return `
                <tr>
                  <td>${b.name}</td>
                  <td>${pkg ? pkg.name : "-"}</td>
                  <td>${b.date}</td>
                  <td>${b.travelers}</td>
                  <td>${b.status}</td>
                  <td>
                    ${b.status !== "Ticket Issued" ? `<button class="btn btn-primary" onclick="Admin.advanceBooking('${b.id}')">Advance</button>` : `<span style="color:var(--sage);">✓ Complete</span>`}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title" style="margin-top:24px;">Enquiries</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Package</th>
              <th>Message</th>
              <th>Resolved</th>
            </tr>
          </thead>
          <tbody>
            ${enquiries.map(e => `
              <tr>
                <td>${e.name}</td>
                <td>${e.packageName}</td>
                <td>${e.message}</td>
                <td>${e.resolved ? "✅ Yes" : "❌ No"}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  advanceBooking(id) {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    if (booking.status === "Pending") {
      booking.status = "Confirmed";
      showToast("Booking confirmed.");
    } else if (booking.status === "Confirmed") {
      booking.status = "Ticket Issued";
      booking.code = "TMS-" + Math.floor(10000 + Math.random() * 90000);
      showToast(`Ticket issued! Code: ${booking.code}`);
    }

    Storage.save();
    appRender();
  }
};