import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "light" ? "escuro" : "claro";

  return (
    <button
      className={`theme-toggle ${className}`.trim()}
      type="button"
      onClick={toggleTheme}
      aria-label={`Ativar tema ${nextTheme}`}
      aria-pressed={theme === "dark"}
    >
      <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
      Tema {theme === "light" ? "escuro" : "claro"}
    </button>
  );
}
