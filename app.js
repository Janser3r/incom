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
