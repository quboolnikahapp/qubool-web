"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/matchmaking", label: "Discover matches" },
  { href: "/auth/login", label: "Login" },
  { href: "/auth/signup", label: "Register" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="landing-nav">
      <button type="button" className="landing-menu-button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label="Toggle navigation">
        <span /><span /><span />
      </button>
      {isOpen && (
        <nav className="landing-menu" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
}
