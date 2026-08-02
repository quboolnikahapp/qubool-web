"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  function validateForm() {
    const nextErrors: { email?: string; password?: string } = {};

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
    try {
      if (!supabase) {
        setIsSubmitting(false);
        setStatusMessage("Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setIsSubmitting(false);

      if (error) {
        setStatusMessage(error.message);
        return;
      }

      // On success, navigate to matchmaking (or user's dashboard)
      setStatusMessage("Sign-in successful — redirecting...");
      router.push("/matchmaking");
    } catch (err: unknown) {
      setIsSubmitting(false);
      const message = err instanceof Error ? err.message : String(err);
      setStatusMessage(message || "An unexpected error occurred.");
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col justify-center px-6 py-16 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Card eyebrow="Secure access" title="Welcome back" description="Sign in to continue your journey with Qubool in a calm, private, and respectful setting.">
          <form className="space-y-5" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 text-sm text-slate-600">
              Your privacy is protected. Authentication will be connected to Supabase when your backend is ready.
            </div>

            <Button type="submit" fullWidth loading={isSubmitting}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <Link href="/auth/signup" className="font-semibold text-slate-900">
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
