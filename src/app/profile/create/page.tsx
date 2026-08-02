"use client";

"use client";

import { useState } from "react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/input";
import { ProgressSteps } from "@/components/progress-steps";

const steps = ["Personal", "Education", "Career", "Family", "Preferences"];

export default function CreateProfilePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState({
    fullName: "",
    age: "",
    city: "",
    gender: "",
    email: "",
    education: "",
    profession: "",
    familyBackground: "",
    preferences: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateStep() {
    const nextErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!values.fullName.trim()) nextErrors.fullName = "Please share your full name.";
      if (!values.age.trim()) nextErrors.age = "Please tell us your age.";
      if (!values.city.trim()) nextErrors.city = "Please choose a city.";
      if (!values.gender.trim()) nextErrors.gender = "Please select a gender.";
      if (!values.email.trim()) nextErrors.email = "Please provide an email address.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    }

    if (currentStep === 1 && !values.education.trim()) nextErrors.education = "Please share your education background.";
    if (currentStep === 2 && !values.profession.trim()) nextErrors.profession = "Please share your profession.";
    if (currentStep === 3 && !values.familyBackground.trim()) nextErrors.familyBackground = "Please share your family background.";
    if (currentStep === 4 && !values.preferences.trim()) nextErrors.preferences = "Please share your marriage preferences.";
    if (currentStep === 4 && !values.bio.trim()) nextErrors.bio = "A short introduction helps people understand you better.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep()) return;
    if (currentStep < steps.length - 1) setCurrentStep((value) => value + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    if (!validateStep()) return;

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
          eyebrow="Premium profile setup"
          title="Create your profile"
          description="A calm, elegant experience for sharing your values, background, and expectations."
        >
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <ProgressSteps steps={steps} currentStep={currentStep} />
          </div>

          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            {currentStep === 0 ? (
              <>
                <Input label="Full name" placeholder="Aisha Khan" value={values.fullName} onChange={(event) => handleChange("fullName", event.target.value)} error={errors.fullName} />
                <Input label="Age" type="number" placeholder="28" value={values.age} onChange={(event) => handleChange("age", event.target.value)} error={errors.age} />
                <Input label="City" placeholder="Manchester" value={values.city} onChange={(event) => handleChange("city", event.target.value)} error={errors.city} />
                <Input label="Gender" placeholder="Female" value={values.gender} onChange={(event) => handleChange("gender", event.target.value)} error={errors.gender} />
                <div className="md:col-span-2">
                  <Input label="Email" type="email" placeholder="you@example.com" value={values.email} onChange={(event) => handleChange("email", event.target.value)} error={errors.email} />
                </div>
              </>
            ) : null}

            {currentStep === 1 ? (
              <div className="md:col-span-2">
                <Input label="Education" placeholder="University of Oxford" value={values.education} onChange={(event) => handleChange("education", event.target.value)} error={errors.education} />
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="md:col-span-2">
                <Input label="Profession" placeholder="Software Engineer" value={values.profession} onChange={(event) => handleChange("profession", event.target.value)} error={errors.profession} />
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="md:col-span-2">
                <label className="block space-y-2 text-sm text-slate-600">
                  <span className="font-medium text-slate-700">Family background</span>
                  <textarea className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" value={values.familyBackground} onChange={(event) => handleChange("familyBackground", event.target.value)} />
                  {errors.familyBackground ? <p className="text-xs text-rose-600">{errors.familyBackground}</p> : null}
                </label>
              </div>
            ) : null}

            {currentStep === 4 ? (
              <>
                <div className="md:col-span-2">
                  <label className="block space-y-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Marriage preferences</span>
                    <textarea className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" placeholder="Share the values and qualities that matter most to you." value={values.preferences} onChange={(event) => handleChange("preferences", event.target.value)} />
                    {errors.preferences ? <p className="text-xs text-rose-600">{errors.preferences}</p> : null}
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="block space-y-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-700">About you</span>
                    <textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100" placeholder="Share a little about your values, interests, and what you are looking for." value={values.bio} onChange={(event) => handleChange("bio", event.target.value)} />
                    {errors.bio ? <p className="text-xs text-rose-600">{errors.bio}</p> : null}
                  </label>
                </div>
              </>
            ) : null}

            {statusMessage ? (
              <div className="md:col-span-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {statusMessage}
              </div>
            ) : null}

            <div className="md:col-span-2 flex flex-wrap gap-3">
              {currentStep > 0 ? (
                <Button type="button" variant="secondary" onClick={() => setCurrentStep((value) => value - 1)}>
                  Back
                </Button>
              ) : null}
              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={handleNext}>Continue</Button>
              ) : (
                <Button type="submit" loading={isSubmitting}>Finish profile</Button>
              )}
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <Card eyebrow="Preview" title="What your profile may look like" description="This preview is designed to feel polished and future-ready.">
            <div className="space-y-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{values.fullName || "Your Name"}</p>
                    <p className="text-sm text-slate-600">{values.city || "Your city"}</p>
                  </div>
                  <Badge tone="emerald">Verified</Badge>
                </div>
              </div>
              <EmptyState title="No matches yet" description="Once Supabase data is connected, this area will show your best matches and conversation starters." />
            </div>
          </Card>
          <Card eyebrow="Privacy" title="Your information stays protected" description="Qubool is designed to feel calm, private, and respectful from the start.">
            <p className="text-sm leading-7 text-slate-600">
              You stay in control of what you share and when you share it.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
