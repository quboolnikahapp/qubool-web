"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm() {
    const nextErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Please tell us your name.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Password is required.";
    } else if (password.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setIsSubmitting(false);
    setStatusMessage("Your account form is ready for Supabase authentication.");
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Card eyebrow="Join the community" title="Create your account" description="Join a thoughtful community focused on respectful, meaningful connection.">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Full name"
              placeholder="Aisha Khan"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
              }}
              error={errors.name}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
              error={errors.email}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
              }}
              error={errors.password}
              rightElement={
                <button
                  type="button"
                  className="text-sm font-medium text-slate-600"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            {statusMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                {statusMessage}
              </div>
            ) : null}

            <Button type="submit" fullWidth loading={isSubmitting}>
              Sign up
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-slate-900">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
