import Link from "next/link";
import { QuboolLogo } from "@/components/qubool-logo";

type IconName = "check" | "video" | "shield" | "heart" | "lock" | "search" | "chat" | "spark" | "phone" | "arrow";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    check: <path d="m5 12 4.2 4L19 6" />, video: <><rect x="3" y="6" width="13" height="12" rx="2" /><path d="m16 10 5-3v10l-5-3" /></>, shield: <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Zm-3 9 2 2 4-4" />, heart: <path d="M20.8 8.2c0 5.5-8.8 10.8-8.8 10.8S3.2 13.7 3.2 8.2A4.5 4.5 0 0 1 12 6.8a4.5 4.5 0 0 1 8.8 1.4Z" />, lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>, search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>, chat: <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.3-.7L4 20l1.4-4A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />, spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 14 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />, phone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M10 5h4m-2 13.5h.01" /></>, arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const reasons = [
  ["video", "Video verified", "A real person, thoughtfully verified before meaningful conversations begin."],
  ["shield", "Profiles with intention", "Built for people seeking marriage, with clear profile details and shared values."],
  ["lock", "Privacy by default", "You decide what is visible, when photos are shared, and who can reach you."],
  ["heart", "Family-friendly", "A respectful journey that welcomes family involvement at the pace that feels right."],
] as const;

const features = [["search", "Thoughtful matching", "Refine your search around deen, values, lifestyle, education and plans for the future."], ["chat", "Safe introductions", "Start conversations securely, without having to share personal contact details."], ["spark", "Premium discovery", "See more compatible profiles and use focused filters to make every introduction count."]] as const;

const faqs = [
  ["Is Qubool for serious matrimonial connections?", "Yes. Qubool is designed for people looking for a meaningful, marriage-focused connection—not casual dating."],
  ["How does video verification work?", "Members complete a short, guided video check. This helps create a more authentic community before introductions begin."],
  ["Can I control who sees my profile and photos?", "Yes. Qubool gives you privacy controls for your profile, photos and communication preferences."],
  ["Can family members be involved?", "Absolutely. Our experience is made for respectful, family-friendly matchmaking, at the pace you choose."],
];

function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-title"><span>{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

export default function Home() {
  return <main className="web-home">
    <section className="web-hero">
      <div className="web-hero-image" aria-hidden="true" />
      <div className="web-hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <span className="hero-eyebrow">A private path to your forever</span>
        <h1>Meaningful matches.<br /><em>Beautiful beginnings.</em></h1>
        <p>Qubool is a privacy-first matrimonial space for Muslim singles and families who are ready to find a life partner with intention.</p>
        <div className="hero-buttons"><Link className="button-primary" href="/auth/signup">Create your profile <Icon name="arrow" /></Link><a className="button-light" href="#how-it-works">See how it works</a></div>
        <div className="hero-signals"><span><Icon name="video" /> Video verified</span><span><Icon name="lock" /> Private by design</span><span><Icon name="heart" /> Family-friendly</span></div>
      </div>
      <div className="match-finder"><div><span className="finder-label">Start your search</span><strong>Find someone who shares your values</strong></div><div className="finder-fields"><label>Looking for<select defaultValue=""><option value="" disabled>Select</option><option>Groom</option><option>Bride</option></select></label><label>Age range<select defaultValue=""><option value="" disabled>21 – 35 years</option><option>21 – 35 years</option></select></label><label>Location<select defaultValue=""><option value="" disabled>Anywhere</option><option>Anywhere</option></select></label><Link href="/matchmaking" aria-label="Search matches"><Icon name="search" /></Link></div></div>
    </section>

    <section className="trust-strip"><div><Icon name="video" /><span><b>Video verification</b>Authenticity you can see</span></div><div><Icon name="shield" /><span><b>Verified profiles</b>Made for serious intentions</span></div><div><Icon name="lock" /><span><b>Privacy-first</b>Always in your control</span></div><div><Icon name="chat" /><span><b>Secure communication</b>Connect with confidence</span></div></section>

    <section className="section why-section" id="why-qubool"><SectionTitle eyebrow="Why Qubool" title="Designed for a more meaningful search" copy="Every detail supports a journey that feels calm, credible and completely yours." /><div className="reason-grid">{reasons.map(([icon, title, copy], index) => <article className="reason-card" key={title}><span className="card-number">0{index + 1}</span><div className="icon-circle"><Icon name={icon} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="process-section" id="how-it-works"><div className="process-copy"><SectionTitle eyebrow="How it works" title="A considered journey, from hello to forever" copy="We’ve made it simple to meet people who are looking for the same kind of future." /><Link href="/auth/signup" className="text-link">Begin your journey <Icon name="arrow" /></Link></div><ol className="steps"><li><span>01</span><div><b>Build your profile</b><p>Share the values, life and future you hope to build.</p></div></li><li><span>02</span><div><b>Get verified</b><p>A short video check adds an extra layer of confidence.</p></div></li><li><span>03</span><div><b>Discover compatibility</b><p>Explore profiles with shared intentions and priorities.</p></div></li><li><span>04</span><div><b>Connect respectfully</b><p>Take each introduction at a pace that feels right.</p></div></li></ol></section>

    <section className="section safety-section" id="safety"><div className="safety-visual"><div className="verification-card"><span className="verified-mark"><Icon name="check" /></span><p>Identity check complete</p><b>Verified on Qubool</b></div><div className="safety-orbit orbit-one" /><div className="safety-orbit orbit-two" /></div><div className="safety-copy"><SectionTitle eyebrow="Verification & privacy" title="Trust is not a feature. It’s the foundation." copy="From the first profile view to every conversation, Qubool is intentionally built around safety and respect." /><ul><li><Icon name="check" /> Video verification for authentic members</li><li><Icon name="check" /> Controlled profile and photo visibility</li><li><Icon name="check" /> Secure in-platform conversations</li><li><Icon name="check" /> Clear reporting and member support</li></ul><Link href="/auth/signup" className="button-primary">Join a trusted community <Icon name="arrow" /></Link></div></section>

    <section className="section premium-section"><SectionTitle eyebrow="Premium features" title="More clarity. More compatibility. More confidence." /><div className="feature-grid">{features.map(([icon, title, copy]) => <article key={title}><div className="feature-icon"><Icon name={icon} /></div><h3>{title}</h3><p>{copy}</p><a href="#faq">Learn more <Icon name="arrow" /></a></article>)}</div></section>

    <section className="stories-section" id="stories"><div className="stories-intro"><SectionTitle eyebrow="Success stories" title="Where meaningful intentions find each other" copy="Real journeys start with a thoughtful introduction." /><div className="story-count"><b>Made for your</b><span>beautiful<br />beginning.</span></div></div><div className="story-card"><div className="story-photo" aria-label="A happy Qubool couple" /><div><span className="quote-mark">“</span><blockquote>Qubool gave us a space that felt respectful from the first conversation. We could focus on our values and let our families be part of the journey.</blockquote><p><b>Amina &amp; Yusuf</b><br />Found each other with Qubool</p></div></div></section>

    <section className="section testimonial-section"><SectionTitle eyebrow="Member voices" title="A community built on confidence" /><div className="testimonial-grid"><figure><blockquote>“I appreciated how intentional the experience felt. I could take my time, keep my privacy, and still meet genuine people.”</blockquote><figcaption><span>SM</span><div><b>Sana M.</b><small>Qubool member</small></div></figcaption></figure><figure><blockquote>“The verification process gave my family comfort. It felt like a platform built with our values in mind.”</blockquote><figcaption><span>AK</span><div><b>Ahmed K.</b><small>Qubool member</small></div></figcaption></figure><figure><blockquote>“The filters helped me look beyond a profile photo and find someone whose priorities really aligned with mine.”</blockquote><figcaption><span>FR</span><div><b>Fatima R.</b><small>Qubool member</small></div></figcaption></figure></div></section>

    <section className="section faq-section" id="faq"><SectionTitle eyebrow="FAQs" title="Questions, answered with care" /><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="app-section"><div className="app-content"><span>Qubool on the go</span><h2>Your next chapter<br />fits in your pocket.</h2><p>Save profiles, receive thoughtful introductions and stay connected securely—wherever life takes you.</p><div className="store-buttons"><a href="#download">Download on the <b>App Store</b></a><a href="#download">GET IT ON <b>Google Play</b></a></div></div><div className="phone-mockup"><div className="phone-notch" /><div className="phone-screen"><span>Qubool</span><div className="phone-profile" /><b>A journey towards<br />a beautiful beginning.</b><i><Icon name="heart" /></i></div></div></section>

    <section className="closing-cta"><span>Begin with intention</span><h2>Your forever could begin<br />with a simple hello.</h2><p>Join a trusted community created for meaningful Muslim matrimony.</p><Link href="/auth/signup" className="button-primary">Create your profile <Icon name="arrow" /></Link></section>

    <footer className="site-footer"><div className="footer-top"><div><QuboolLogo className="footer-brand" theme="dark" /><p>A private, thoughtful space for meaningful Muslim matrimony.</p></div><div><b>Explore</b><Link href="#why-qubool">Why Qubool</Link><Link href="#how-it-works">How it works</Link><Link href="/matchmaking">Discover matches</Link></div><div><b>Support</b><Link href="#faq">FAQs</Link><Link href="#safety">Safety &amp; privacy</Link><Link href="/auth/login">Login</Link></div><div><b>Stay in touch</b><p>Thoughtful stories, product updates and guidance for your journey.</p><a className="footer-email" href="mailto:hello@qubool.com">hello@qubool.com</a></div></div><div className="footer-bottom"><span>© 2026 Qubool. All rights reserved.</span><span><a href="#privacy">Privacy</a><a href="#terms">Terms</a></span></div></footer>
  </main>;
}
