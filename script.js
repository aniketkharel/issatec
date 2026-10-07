const menu = document.querySelector(".menu"),
  nav = document.querySelector("nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
const services = [
  [
    "PCB assembly",
    "Electronic assembly for prototype and production requirements.",
    ["Surface-mount (SMT) assembly", "Through-hole assembly", "BGA placement", "Prototype to high-volume production"],
  ],
  [
    "Cable & harness manufacturing",
    "Custom cable assemblies for power, signal and control applications.",
    ["Power, data, RF and multi-core cables", "Over-moulded assemblies", "Control panel wiring"],
  ],
  [
    "Electronic final assembly",
    "Bring electronics, wiring and mechanical components together in a finished assembly.",
    ["Enclosure and sub-assembly integration", "Firmware programming and calibration", "Product labelling"],
  ],
  [
    "Testing & quality assurance",
    "Check that assemblies meet the requirements of your application.",
    ["Functional testing", "X-ray inspection beneath BGA components", "Documentation and traceability"],
  ],
  [
    "Design support",
    "Work with the team as your design moves from concept into manufacturing.",
    ["Discuss manufacturing requirements", "Support the prototype-to-production transition", "Coordinate assembly and testing needs"],
  ],
  [
    "Distribution & repair",
    "Keep product support connected to the manufacturing process.",
    ["Distribution services", "Product returns", "Repair services"],
  ],
];
const dialog = document.querySelector("dialog");
document.querySelectorAll("[data-service]").forEach((b) =>
  b.addEventListener("click", () => {
    const s = services[Number(b.dataset.service)];
    document.querySelector("#dialog-title").textContent = s[0];
    document.querySelector("#dialog-text").textContent = s[1];
    document.querySelector("#dialog-list").replaceChildren(
      ...s[2].map((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        return li;
      }),
    );
    document.querySelector("#enquiry select").value = [
      "PCB assembly",
      "Cable & harness",
      "Box build",
      "Testing & quality",
      "Design support",
      "Distribution & repair",
    ][Number(b.dataset.service)];
    dialog.showModal();
  }),
);
document.querySelector(".close")?.addEventListener("click", () => dialog.close());
document.querySelector("#dialog-contact")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
});
const industries = [
  [
    "Behind the sound.",
    "Assembly support for audio, audiovisual and communications equipment, combining electronic assemblies, wiring and final product integration.",
  ],
  [
    "Ready for demanding applications.",
    "Electronic assemblies for mining, industrial applications, control systems, power monitoring and material tracking.",
  ],
  [
    "Connect the physical world.",
    "Manufacturing support for telemetry, data loggers, wireless networks and agricultural and environmental monitoring products.",
  ],
];
document.querySelectorAll("[data-industry]").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll("[data-industry]").forEach((t) => t.setAttribute("aria-selected", String(t === b)));
    const i = industries[Number(b.dataset.industry)];
    document.querySelector("#industry-title").textContent = i[0];
    document.querySelector("#industry-text").textContent = i[1];
  }),
);
document.querySelector("#enquiry")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nService: ${f.get("service")}\n\n${f.get("message")}`;
  window.location.href = `mailto:sales@issatecaus.com?subject=${encodeURIComponent("Project enquiry — " + f.get("service"))}&body=${encodeURIComponent(body)}`;
});
