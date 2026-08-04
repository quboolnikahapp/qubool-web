import Link from "next/link";

const assurances = [
  {
    label: "Verified profiles",
    icon: <path d="m12 2 7 3v5c0 5-3.4 9.3-7 10-3.6-.7-7-5-7-10V5l7-3Zm-3.2 10 2.1 2.1L15.5 9.5" />,
  },
  {
    label: "Privacy focused",
    icon: <path d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12v10H6V10Zm6 4v2" />,
  },
  {
    label: "Trusted community",
    icon: <path d="M12 20s-7-3.7-7-9.2C5 8.1 6.8 6 9.3 6c1.4 0 2.2.7 2.7 1.5C12.5 6.7 13.3 6 14.7 6 17.2 6 19 8.1 19 10.8 19 16.3 12 20 12 20ZM5 11H3v5a4 4 0 0 0 4 4h2m8 0h0a4 4 0 0 0 4-4v-5h-2" />,
  },
];

function UserIcon({ add = false }: { add?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="10" cy="7" r="4" />
      <path d="M2.5 21a7.5 7.5 0 0 1 15 0" />
      {add && <path d="M19 11v7m-3.5-3.5h7" />}
    </svg>
  );
}

export default function Home() {
  return (
    <main className="landing-page">
      <section className="landing-shell">
        <div className="landing-hero" aria-hidden="true" />
        <div className="landing-veil" aria-hidden="true" />

        <div className="landing-content">
          <p className="landing-kicker">A thoughtful way to begin</p>
          <h1 className="landing-logo">Qubool<span aria-hidden="true">♥</span></h1>
          <p className="landing-tagline">Find your perfect match.</p>
          <p className="landing-subtitle">A journey towards a beautiful beginning.</p>

          <div className="landing-ornament" aria-hidden="true">
            <span />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m12 2 2.2 5.2L20 9.5l-4.3 3.8 1.2 5.7-4.9-3-4.9 3 1.2-5.7L4 9.5l5.8-2.3L12 2Z" /></svg>
            <span />
          </div>

          <div className="landing-actions">
            <Link className="landing-button landing-button-primary" href="/auth/login">
              <UserIcon />
              <span>Login</span>
            </Link>
            <Link className="landing-button landing-button-secondary" href="/auth/signup">
              <UserIcon add />
              <span>Register</span>
            </Link>
          </div>
        </div>

        <div className="landing-assurances">
          {assurances.map((assurance, index) => (
            <div className="landing-assurance" key={assurance.label}>
              {index > 0 && <span className="landing-assurance-rule" aria-hidden="true" />}
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                {assurance.icon}
              </svg>
              <span>{assurance.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
