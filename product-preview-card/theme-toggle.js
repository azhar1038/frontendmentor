const storageKey = "theme-preference";

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
}

const theme = {
  value: getColorPreference(),
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.value);
  document.querySelector("#theme-toggle")?.setAttribute("aria-label", theme.value);
}

reflectPreference();

window.onload = () => {
  reflectPreference();
  document.querySelector("#theme-toggle")?.addEventListener("click", onClick);
}

const onClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  setPreference();
}

window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches: isDark})=>{
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });