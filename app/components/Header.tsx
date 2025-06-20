"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="w-full flex justify-end p-4">
            <ThemeToggle />
        </header>
    );
}
