const services = {
  preemployment: {
    title: "Pre-Employment Medicals",
    summary: "Efficient pre-employment assessments to confirm fitness for role, identify relevant risks and support consistent recruitment decisions.",
    points: [
      "Assessments can be tailored to role demands and relevant workplace risks.",
      "Suitable for recruitment decisions, safety-critical roles and role-specific screening.",
      "Reports provide practical, work-focused advice while respecting confidentiality."
    ]
  },
  occupational: {
    title: "Occupational Health",
    summary: "Specialist occupational health advice to support attendance, capability and safe return to work.",
    points: [
      "Advice can support absence management, return-to-work planning and reasonable accommodations.",
      "Clinicians consider work demands, health factors and sustainable workplace participation.",
      "Recommendations are designed to be clear and practical for employers."
    ]
  },
  nationwide: {
    title: "Nationwide Medical Services",
    summary: "Clinics and secure online systems support consistent occupational health delivery across Ireland.",
    points: [
      "Multiple clinic locations support organisations with distributed workforces.",
      "Online referral and reporting workflows help keep administration clear.",
      "Local access can reduce travel friction for employees attending assessment."
    ]
  },
  nurse: {
    title: "Nurse Case Management",
    summary: "Structured nurse-led case management to support employees during absence and recovery.",
    points: [
      "Supports communication between employee, employer and clinical services.",
      "Helps identify barriers to return to work and practical next steps.",
      "Useful for ongoing absence, capability and rehabilitation planning."
    ]
  },
  wellness: {
    title: "Employee Wellness",
    summary: "Wellbeing support that complements occupational health and helps organisations build healthier teams.",
    points: [
      "Can include screening, advice and organisational wellness programmes.",
      "Supports healthier habits, resilience and sustainable performance.",
      "Works best as part of a wider occupational health strategy."
    ]
  },
  education: {
    title: "Medmark4TeacherSNA",
    summary: "Dedicated occupational health support for education settings and school staff.",
    points: [
      "Supports attendance, medical fitness and return-to-work decision making.",
      "Designed around the context of schools and education-sector roles.",
      "Provides specialist occupational health advice for case complexity."
    ]
  }
};

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const modal = document.querySelector("#service-modal");
const modalTitle = document.querySelector("#modal-title");
const modalSummary = document.querySelector("#modal-summary");
const modalBody = document.querySelector("#modal-body");
const chatButton = document.querySelector(".chat-button");
const chatPanel = document.querySelector(".chat-panel");
const chatClose = document.querySelector(".chat-panel-close");
const chatEntry = document.querySelector(".chat-entry");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});

mobileNav?.addEventListener("click", event => {
  if (event.target instanceof HTMLAnchorElement) {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }
});

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-service]").forEach(button => {
  button.addEventListener("click", () => {
    const service = services[button.getAttribute("data-service")];
    if (!service || !modal || !modalTitle || !modalSummary || !modalBody) return;
    modalTitle.textContent = service.title;
    modalSummary.textContent = service.summary;
    modalBody.innerHTML = service.points.map(point => `<p>${point}</p>`).join("");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-close]").forEach(element => element.addEventListener("click", closeModal));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
  if (event.key === "Escape") closeChat();
});

function closeChat() {
  if (!chatPanel || !chatButton) return;
  chatPanel.hidden = true;
  chatButton.setAttribute("aria-expanded", "false");
}

chatButton?.addEventListener("click", () => {
  if (!chatPanel || !chatButton) return;
  const isOpen = chatButton.getAttribute("aria-expanded") === "true";
  chatPanel.hidden = isOpen;
  chatButton.setAttribute("aria-expanded", String(!isOpen));
  if (!isOpen) chatPanel.querySelector("input")?.focus();
});

chatClose?.addEventListener("click", closeChat);

chatEntry?.addEventListener("submit", event => {
  event.preventDefault();
  const input = chatEntry.querySelector("input");
  if (input) input.value = "";
});

document.querySelector(".contact-form")?.addEventListener("submit", event => {
  event.preventDefault();
});

const clinicMapEl = document.querySelector("#clinic-map");

if (clinicMapEl && window.L) {
  const clinics = [
    {
      name: "Medmark - Baggot Street",
      address: "69 Baggot Street Lower, Dublin 2, D02 HW52",
      coords: [53.3362, -6.2496],
      maps: "https://www.google.com/maps/search/?api=1&query=69%20Baggot%20Street%20Lower%2C%20Dublin%202%2C%20D02%20HW52"
    },
    {
      name: "Medmark - Fleming Court",
      address: "Fleming Place, Fleming Court, Dublin 4, D04 N4X9",
      coords: [53.3348, -6.2414],
      maps: "https://www.google.com/maps/search/?api=1&query=Fleming%20Place%2C%20Fleming%20Court%2C%20Dublin%204%2C%20D04%20N4X9"
    },
    {
      name: "Medmark - Dublin Airport",
      address: "Skybridge House, Corballis Rd S, Swords, Co. Dublin, K67 P6K2",
      coords: [53.4287, -6.2403],
      maps: "https://www.google.com/maps/search/?api=1&query=Skybridge%20House%2C%20Corballis%20Rd%20S%2C%20Swords%2C%20Co.%20Dublin%2C%20K67%20P6K2"
    },
    {
      name: "Medmark - Sligo",
      address: "4 The Mall, Rathquarter, Sligo, F91 HT7C",
      coords: [54.2721, -8.4681],
      maps: "https://www.google.com/maps/search/?api=1&query=4%20The%20Mall%2C%20Rathquarter%2C%20Sligo%2C%20F91%20HT7C"
    },
    {
      name: "Medmark - Limerick",
      address: "6 Steamboat Quay, Mountkennet, Limerick",
      coords: [52.6602, -8.6367],
      maps: "https://www.google.com/maps/search/?api=1&query=6%20Steamboat%20Quay%2C%20Mountkennet%2C%20Limerick"
    },
    {
      name: "Medmark - Galway",
      address: "Unit 7A, Second Floor, Ballybrit, Galway, H91 621D",
      coords: [53.2934, -8.9961],
      maps: "https://www.google.com/maps/search/?api=1&query=Unit%207A%2C%20Second%20Floor%2C%20Ballybrit%2C%20Galway%2C%20H91%20621D"
    },
    {
      name: "Medmark - Waterford",
      address: "Cork Rd, Butlerstown North, Waterford, X91 DH9W",
      coords: [52.2459, -7.1119],
      maps: "https://www.google.com/maps/search/?api=1&query=Cork%20Rd%2C%20Butlerstown%20North%2C%20Waterford%2C%20X91%20DH9W"
    },
    {
      name: "Medmark - Cork",
      address: "Penrose Wharf, 8 Penrose Quay, Victorian Quarter, Cork, T23 DC90",
      coords: [51.9018, -8.4674],
      maps: "https://www.google.com/maps/search/?api=1&query=Penrose%20Wharf%2C%208%20Penrose%20Quay%2C%20Victorian%20Quarter%2C%20Cork%2C%20T23%20DC90"
    },
    {
      name: "Medmark - Belfast (Blackwell Associates)",
      address: "Strand House, 102 Holywood Rd, Belfast BT4 1NU, United Kingdom",
      coords: [54.6008, -5.8778],
      maps: "https://www.google.com/maps/search/?api=1&query=Strand%20House%2C%20102%20Holywood%20Rd%2C%20Belfast%20BT4%201NU%2C%20United%20Kingdom"
    }
  ];

  const map = L.map(clinicMapEl, {
    center: [53.45, -7.7],
    zoom: 7,
    minZoom: 6,
    maxBounds: [[50.9, -11.5], [55.8, -4.6]],
    maxBoundsViscosity: 0.8,
    scrollWheelZoom: false,
    zoomControl: true
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    noWrap: true
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: "",
    html: '<span class="clinic-marker"><img src="https://demo.medmark.ie/icon.png" alt="" /></span>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -16]
  });

  const bounds = [];
  clinics.forEach(clinic => {
    bounds.push(clinic.coords);
    L.marker(clinic.coords, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<h3>${clinic.name}</h3><p>${clinic.address}</p><a href="${clinic.maps}" target="_blank" rel="noreferrer">Open maps</a>`);
  });

  const irelandBounds = [[51.25, -10.8], [55.45, -5.25]];
  map.fitBounds(irelandBounds, { padding: [14, 14] });
  setTimeout(() => {
    map.invalidateSize();
    map.fitBounds(irelandBounds, { padding: [14, 14] });
  }, 200);
}
