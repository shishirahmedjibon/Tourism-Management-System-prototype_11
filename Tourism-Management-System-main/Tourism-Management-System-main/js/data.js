const packages = [
  { 
    id: "p1", 
    name: "Cox's Bazar Beach Escape", 
    destination: "Cox's Bazar", 
    category: "Beach", 
    days: 4, 
    price: 12500, 
    rating: 4.6, 
    seats: 8, 
    blurb: "The world's longest natural sea beach with golden sands and stunning sunsets.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&crop=center",
    itinerary: ["Arrival and hotel check-in", "Sunset at Laboni Point", "Inani beach exploration", "Local market visit and departure"]
  },
  { 
    id: "p2", 
    name: "Sundarbans Wildlife Expedition", 
    destination: "Sundarbans", 
    category: "Wildlife", 
    days: 3, 
    price: 15800, 
    rating: 4.8, 
    seats: 5, 
    blurb: "Cruise through the mangrove channels and spot Royal Bengal tigers in their natural habitat.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&h=400&fit=crop&crop=center",
    itinerary: ["Boat departure and mangrove entry", "Karamjal watch tower visit", "Kotka wildlife trail", "Return cruise with sunset views"]
  },
  { 
    id: "p3", 
    name: "Sylhet Tea Garden Retreat", 
    destination: "Sylhet", 
    category: "Hill", 
    days: 3, 
    price: 9800, 
    rating: 4.5, 
    seats: 12, 
    blurb: "Experience the rolling hills of tea gardens and explore the unique swamp forests.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&crop=center",
    itinerary: ["Arrival and tea garden tour", "Sunset view from the hills", "Jaflong boat ride and tribal village visit", "Departure with local tea souvenirs"]
  }
];

let bookings = [
  { id: "b1", packageId: "p1", name: "Anuj Rahman", email: "anuj@gmail.com", travelers: 2, date: "2026-08-14", status: "Pending", code: null }
];

let enquiries = [
  { id: "e1", name: "Mahin Chowdhury", email: "mahin@gmail.com", packageName: "Sundarbans Wildlife Expedition", message: "Is a private boat available?", resolved: false }
];

const categories = ["All", "Beach", "Wildlife", "Hill", "Adventure"];