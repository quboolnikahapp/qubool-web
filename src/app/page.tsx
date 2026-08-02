"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { FeatureCard } from "@/components/feature-card";
import { Modal } from "@/components/modal";
import { ProfileCard } from "@/components/profile-card";
import { SectionHeading } from "@/components/section-heading";
import { appConfig, exampleProfiles, featureHighlights, steps, trustIndicators } from "@/constants";

export default function Home() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <main className="overflow-hidden">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 rounded-[2.25rem] border border-white/70 bg-gradient-to-br from-[#fdfaf5] via-[#f6efe2] to-[#e8d8c3] p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge tone="emerald">Privacy-first matchmaking</Badge>
              <Badge tone="amber">Trusted by thoughtful families</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Meet your future with elegance, trust, and intention.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {appConfig.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup">
                <Button>Create your profile</Button>
              </Link>
              <Link href="/profile/create">
                <Button variant="secondary">Explore how it works</Button>
              </Link>
              <Button variant="ghost" onClick={() => setIsHowItWorksOpen(true)}>
                View the journey
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-emerald-100 pt-6">
              {trustIndicators.map((indicator) => (
                <Badge key={indicator} tone="slate" className="bg-white/80">
                  {indicator}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-900/10 bg-gradient-to-br from-[#133b31] via-[#1f5b45] to-[#296954] p-8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
              Premium experience
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Built for intention, privacy, and real connection.</h2>
            <div className="mt-6 grid gap-4">
              <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80"
                  alt="Wedding portrait"
                  width={900}
                  height={576}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-white/10 p-4 text-sm text-white backdrop-blur">
                  <p className="font-semibold">Real stories, real matches</p>
                  <p className="mt-1 text-xs text-emerald-100/90">A warm space built for marriage and family.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
                    alt="Couple smiling"
                    width={600}
                    height={264}
                    className="h-44 w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
                    alt="Celebratory gathering"
                    width={600}
                    height={264}
                    className="h-44 w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <SectionHeading
          eyebrow="Why Qubool"
          title="A calm, trustworthy home for your next chapter"
          description="Every detail is designed to feel premium, private, and deeply intentional."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featureHighlights.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} badge={feature.badge} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card eyebrow="Simple journey" title="How it works" description="A thoughtful path from profile creation to meaningful connection.">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-amber-50/70 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-emerald)] to-[var(--brand-gold)] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card eyebrow="Peace of mind" title="Verification and privacy" description="The experience is designed to feel secure without ever becoming cold or clinical.">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
                <h3 className="font-semibold text-slate-900">Verified profile signals</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Clear verification cues help members feel more confident from the first glance.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">
                <h3 className="font-semibold text-slate-900">Private communication</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Respectful communication and controlled visibility create the right pace for connection.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <SectionHeading
          eyebrow="Profile experience"
          title="A premium profile experience that feels warm and intentional"
          description="This layout is ready to evolve into rich, real member profiles once backend data is connected."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {exampleProfiles.map((profile) => (
            <ProfileCard key={profile.name} {...profile} />
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Card eyebrow="Success stories" title="A space for meaningful stories" description="Testimonials will be introduced as the community grows and members begin to share their journeys.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6">
              <p className="text-sm leading-7 text-slate-600">
                “A calm and respectful experience that feels much more thoughtful than typical dating apps.”
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-6">
              <p className="text-sm leading-7 text-slate-600">
                “It feels premium, private, and clearly designed for people who value meaningful connection.”
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Card eyebrow="Begin your journey" title="Begin Your Journey Towards Nikah" description="Create your profile and begin a thoughtful journey toward a meaningful partnership.">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-sm leading-8 text-slate-600">
              The experience is designed to feel private, respectful, and calm from the first interaction onward.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup">
                <Button>Create your profile</Button>
              </Link>
              <Link href="/matchmaking">
                <Button variant="secondary">Explore matchmaking</Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <footer className="border-t border-emerald-100/70 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Qubool Nikah App</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/login" className="transition hover:text-slate-900">
              Login
            </Link>
            <Link href="/matchmaking" className="transition hover:text-slate-900">
              Matchmaking
            </Link>
            <Link href="/profile/create" className="transition hover:text-slate-900">
              Create profile
            </Link>
          </div>
        </div>
      </footer>

      <Modal
        open={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        title="How your journey begins"
        description="The experience is structured to feel calm, guided, and respectful from the start."
      >
        <div className="space-y-4 text-sm leading-7 text-slate-600">
          <p>1. Create a thoughtful profile that reflects your values and what you hope to build.</p>
          <p>2. Discover compatible people through a premium, privacy-conscious experience.</p>
          <p>3. Connect only when the time feels right and the fit feels genuine.</p>
        </div>
      </Modal>
    </main>
  );
}
