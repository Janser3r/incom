const menuButton = document.querySelector(".menu-toggle"),
  nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
document.querySelectorAll(".nav a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }),
);
document.getElementById("year").textContent = new Date().getFullYear();
const items = document.querySelectorAll(".reveal");
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  items.forEach((item) => observer.observe(item));
} else items.forEach((item) => item.classList.add("visible"));
document.getElementById("contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form),
    value = (key, fallback = "") =>
      data.get(key)?.toString().trim() || fallback;
  const message = [
    "Hola INCOM, deseo solicitar información sobre un proyecto.",
    "",
    `Nombre: ${value("nombre")}`,
    `Empresa: ${value("empresa", "No indicada")}`,
    `Teléfono: ${value("telefono")}`,
    `Correo: ${value("correo")}`,
    `Servicio: ${value("servicio")}`,
    "",
    `Proyecto: ${value("mensaje")}`,
  ].join("\n");
  document.getElementById("form-status").textContent = "Abriendo WhatsApp…";
  const popup = window.open(
    `https://wa.me/573161154523?text=${encodeURIComponent(message)}`,
    "_blank",
  );
  if (popup) popup.opener = null;
  else
    location.href = `https://wa.me/573161154523?text=${encodeURIComponent(message)}`;
});

const dynamicCards = document.querySelectorAll(
  ".service, .project, .difference-list article, .hero-card",
);
const canAnimateCards =
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

dynamicCards.forEach((card, index) => {
  card.classList.add("dynamic-card");
  card.style.setProperty("--card-index", index % 6);
  if (!canAnimateCards) return;
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--rotate-x", `${(0.5 - y) * 4}deg`);
    card.style.setProperty("--rotate-y", `${(x - 0.5) * 5}deg`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--rotate-x");
    card.style.removeProperty("--rotate-y");
  });
});
