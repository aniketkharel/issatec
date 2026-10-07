(() => {
  const key = "issatec-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const valid = value => ["light", "dark", "system"].includes(value) ? value : "system";
  let preference = "system";
  try { preference = valid(localStorage.getItem(key)); } catch { }
  function apply() {
    document.documentElement.dataset.theme = preference === "system"
      ? (media.matches ? "dark" : "light") : preference;
    const select = document.getElementById("theme-preference");
    if (select) select.value = preference;
  }
  apply();
  media.addEventListener("change", apply);
  window.addEventListener("storage", event => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue);
      apply();
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.getElementById("theme-preference")?.addEventListener("change", event => {
      preference = valid(event.target.value);
      try { localStorage.setItem(key, preference); } catch { }
      apply();
    });
  });
})();
