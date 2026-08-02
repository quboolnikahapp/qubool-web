"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
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
        <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-200/60 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge tone="emerald">New • Privacy-first matchmaking</Badge>
              <Badge tone="slate">Trusted by thoughtful families</Badge>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Find Your Life Partner Through A Trusted Nikah Platform
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {appConfig.tagline}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/auth/signup">
                <Button>Create account</Button>
              </Link>
              <Link href="/profile/create">
                <Button variant="secondary">Create profile</Button>
              </Link>
              <Button variant="ghost" onClick={() => setIsHowItWorksOpen(true)}>
                How it works
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
              {trustIndicators.map((indicator) => (
                <Badge key={indicator} tone="slate" className="bg-slate-100">
                  {indicator}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
              Premium experience
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Built for intention, privacy, and real connection.</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Private profile controls</p>
                <p className="mt-1 leading-7">Share only what feels right, when it feels right.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-medium text-white">Verification ready</p>
                <p className="mt-1 leading-7">Comforting signals that support trust as the foundation of your experience.</p>
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
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card eyebrow="Simple process" title="How it works" description="A thoughtful journey from profile creation to meaningful connection.">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
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

          <Card eyebrow="Built with care" title="Verification and privacy" description="The experience is designed to feel secure without ever becoming cold or clinical.">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-900">Verified profile signals</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Clear verification cues help members feel more confident from the first glance.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
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
          eyebrow="Community preview"
          title="Profiles designed for future Supabase data"
          description="This layout is ready to evolve into rich, real member profiles once backend data is connected."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {exampleProfiles.map((profile) => (
            <ProfileCard key={profile.name} {...profile} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <Card eyebrow="Prepared experience" title="Ready for the next step?" description="The profile flow is intentionally simple, secure, and ready for future Supabase-driven expansion.">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm leading-8 text-slate-600">
                Thoughtful onboarding, clear verification cues, and a calm interface help create a premium first impression.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <EmptyState title="Matches will appear here soon" description="The experience is being prepared for Supabase-powered discovery and private conversations." />
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <Card eyebrow="Testimonials" title="What members are saying" description="Testimonials will be introduced as the community grows.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm leading-7 text-slate-600">
                “A calm and respectful experience that feels much more thoughtful than typical dating apps.”
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm leading-7 text-slate-600">
                “It feels premium, private, and clearly designed for people who value meaningful connection.”
              </p>
            </div>
          </div>
        </Card>
      </section>

      <footer className="border-t border-slate-200 bg-white/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Qubool Nikah App</p>
          <div className="flex gap-4">
            <Link href="/auth/login" className="transition hover:text-slate-900">
              Login
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
