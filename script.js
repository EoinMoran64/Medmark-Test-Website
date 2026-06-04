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
  const message = input?.value.trim();
  const subject = encodeURIComponent("Website chat enquiry");
  const body = encodeURIComponent(message ? `Chat message:\n\n${message}` : "Website chat enquiry");
  window.location.href = `mailto:dublin@medmark.ie?subject=${subject}&body=${body}`;
  if (input) input.value = "";
});

document.querySelector(".contact-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const lines = [
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Company: ${data.get("company") || ""}`,
    `Reason: ${data.get("reason") || ""}`,
    `Preferred contact method: ${data.get("method") || ""}`,
    `Best time to contact: ${data.get("time") || ""}`
  ];
  window.location.href = `mailto:dublin@medmark.ie?subject=${encodeURIComponent("Website callback request")}&body=${encodeURIComponent(lines.join("\n"))}`;
});

const clinicMapEl = document.querySelector("#clinic-map");

if (clinicMapEl && window.L) {
  const clinics = [
    {
      name: "Medmark - Baggot Street",
      address: "69 Lower Baggot Street, Baggot Street Bridge, Dublin 2, D02 HW52",
      coords: [53.3349186, -6.2458024],
    },
    {
      name: "Medmark - Fleming Court",
      address: "Ground Floor, Fleming Court, Fleming's Place, Dublin 4, D04 N4X9",
      coords: [53.3328870, -6.2457500],
    },
    {
      name: "Medmark - Dublin Airport",
      address: "Skybridge House, Corballis Road North, Dublin Airport, Swords, Co. Dublin, K67 P6K2",
      coords: [53.4284822, -6.2350387],
    },
    {
      name: "Medmark - Sligo",
      address: "4 The Mall, Sligo, F91 HT7C",
      coords: [54.2727005, -8.4711371],
    },
    {
      name: "Medmark - Limerick",
      address: "Stanford Clinic, 6 Steamboat Quay, Limerick, V94 Y7YH",
      coords: [52.6605371, -8.6362606],
    },
    {
      name: "Medmark - Galway",
      address: "Unit 7A, Second Floor, Briarhill Business Park, Ballybrit, Galway, H91 621D",
      coords: [53.2939620, -8.9896500],
    },
    {
      name: "Medmark - Waterford",
      address: "Suite no. 8, Whitfield Clinic, Butlerstown North, Cork Road, Co. Waterford, X91 DH9W",
      coords: [52.2401284, -7.1720339],
    },
    {
      name: "Medmark - Cork",
      address: "8 Penrose Wharf, Cork, T23 DC90",
      coords: [51.9007580, -8.4637967],
    },
    {
      name: "Medmark - Belfast (Blackwell Associates)",
      address: "Strand House, 102 Holywood Road, Belfast, BT4 1NU",
      coords: [54.5993323, -5.8833414],
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
  const markersByName = new Map();
  const centralDublinClinics = new Set(["Medmark - Baggot Street", "Medmark - Fleming Court"]);

  function focusClinic(clinicName, shouldScroll = false) {
    const marker = markersByName.get(clinicName);
    if (!marker) return;

    if (shouldScroll) {
      clinicMapEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (centralDublinClinics.has(clinicName)) {
      const dublinMarkers = [...centralDublinClinics]
        .map(name => markersByName.get(name))
        .filter(Boolean);
      const dublinBounds = L.latLngBounds(dublinMarkers.map(dublinMarker => dublinMarker.getLatLng()));
      map.fitBounds(dublinBounds, { padding: [72, 72], maxZoom: 16, animate: true });
      setTimeout(() => marker.openPopup(), shouldScroll ? 520 : 320);
      return;
    }

    map.setView(marker.getLatLng(), 16, { animate: true });
    setTimeout(() => marker.openPopup(), shouldScroll ? 520 : 320);
  }

  clinics.forEach(clinic => {
    bounds.push(clinic.coords);
    const marker = L.marker(clinic.coords, { icon: markerIcon, title: clinic.name })
      .addTo(map)
      .bindPopup(`<h3>${clinic.name}</h3><p>${clinic.address}</p>`);
    marker.on("click", () => {
      focusClinic(clinic.name);
    });
    markersByName.set(clinic.name, marker);
  });

  document.querySelectorAll("[data-clinic]").forEach(button => {
    button.addEventListener("click", () => {
      focusClinic(button.getAttribute("data-clinic"), true);
    });
  });

  const irelandBounds = [[51.25, -10.8], [55.45, -5.25]];
  map.fitBounds(irelandBounds, { padding: [14, 14] });
  setTimeout(() => {
    map.invalidateSize();
    map.fitBounds(irelandBounds, { padding: [14, 14] });
  }, 200);
}

