"use client";

import Link from "next/link";
import { useState } from "react";
import { QuboolLogo } from "@/components/qubool-logo";

const links = [
  { href: "#why-qubool", label: "Why Qubool" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#stories", label: "Stories" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-nav">
      <QuboolLogo className="site-brand" priority />
      <nav className="site-links" aria-label="Main navigation">
        {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
      </nav>
      <div className="site-actions">
        <Link className="site-login" href="/auth/login">Login</Link>
        <Link className="site-register" href="/auth/signup">Register free</Link>
      </div>
      <button className="site-menu" type="button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}><span /><span /><span /></button>
      {isOpen && <nav className="site-mobile-links" aria-label="Mobile navigation">{[...links, { href: "/auth/login", label: "Login" }, { href: "/auth/signup", label: "Register free" }].map((link) => <Link href={link.href} key={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>)}</nav>}
    </header>
  );
}
