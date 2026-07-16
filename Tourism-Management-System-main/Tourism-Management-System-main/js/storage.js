const Storage = {
  save() {
    localStorage.setItem("tms_bookings", JSON.stringify(bookings));
    localStorage.setItem("tms_enquiries", JSON.stringify(enquiries));
  },
  load() {
    const b = localStorage.getItem("tms_bookings");
    const e = localStorage.getItem("tms_enquiries");
    if (b) bookings = JSON.parse(b);
    if (e) enquiries = JSON.parse(e);
  }
};