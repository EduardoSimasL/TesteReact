"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "light" | "dark" | null;
        if (saved) setTheme(saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            setTheme("dark");
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded focus:outline-none focus:ring"
            aria-label="Alternar tema"
        >
            {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
        </button>
    );
}
