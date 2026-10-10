export type Theme = 'light' | 'dark';

// Keep in sync with the pre-paint script in src/pages/index.astro.
const STORAGE_KEY = 'lv_theme';
const THEME_COLORS: Record<Theme, string> = {
  light: '#f1f2f8',
  dark: '#10121f',
};

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function applyTheme(next: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
  document.documentElement.dataset.theme = next;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[next]);
}
