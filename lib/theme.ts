export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "sweezy-theme";
export const resolveTheme = (value: string | null): Theme => value === "light" ? "light" : "dark";

// Runs before paint and shares the provider's dark-by-default policy.
export const THEME_BOOTSTRAP = `(function(){var t='dark';try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')t='light';}catch(e){}var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.dataset.theme=t;r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#0b100c':'#f2f3ed';})();`;

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0b100c" : "#f2f3ed");
}
