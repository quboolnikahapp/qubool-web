"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";

export default function CreateProfilePage() {
  const [values, setValues] = useState({
    fullName: "",
    age: "",
    city: "",
    gender: "",
    email: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    const nextErrors: Record<string, string> = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Please share your full name.";
    if (!values.age.trim()) nextErrors.age = "Please tell us your age.";
    if (!values.city.trim()) nextErrors.city = "Please choose a city.";
    if (!values.gender.trim()) nextErrors.gender = "Please select a gender.";
    if (!values.email.trim()) nextErrors.email = "Please provide an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (!values.bio.trim()) nextErrors.bio = "A short introduction helps people understand you better.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setStatusMessage("Your profile draft is ready. Supabase-ready profile storage can be connected next.");
  }

  function handleChange(field: string, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col px-6 py-16 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card
          eyebrow="Future-ready profile setup"
          title="Create your profile"
          description="Give the right people a clear picture of who you are and what matters to you."
        >
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              placeholder="Aisha Khan"
              value={values.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
              error={errors.fullName}
            />
            <Input
              label="Age"
              type="number"
              placeholder="28"
              value={values.age}
              onChange={(event) => handleChange("age", event.target.value)}
              error={errors.age}
            />
            <Input
              label="City"
              placeholder="Manchester"
              value={values.city}
              onChange={(event) => handleChange("city", event.target.value)}
              error={errors.city}
            />
            <Input
              label="Gender"
              placeholder="Female"
              value={values.gender}
              onChange={(event) => handleChange("gender", event.target.value)}
              error={errors.gender}
            />
            <div className="md:col-span-2">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                error={errors.email}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block space-y-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">About you</span>
                <textarea
                  className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  placeholder="Share a little about your values, interests, and what you are looking for."
                  value={values.bio}
                  onChange={(event) => handleChange("bio", event.target.value)}
                />
                {errors.bio ? <p className="text-xs text-rose-600">{errors.bio}</p> : null}
              </label>
            </div>
            {statusMessage ? (
              <div className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {statusMessage}
              </div>
            ) : null}
            <div className="md:col-span-2">
              <Button type="submit" fullWidth loading={isSubmitting}>
                Continue to match discovery
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card eyebrow="Preview" title="What your profile may look like" description="This preview is designed to feel polished and future-ready.">
            <EmptyState title="No matches yet" description="Once Supabase data is connected, this area will show your best matches and conversation starters." />
          </Card>
        </div>
      </div>
    </main>
  );
}
