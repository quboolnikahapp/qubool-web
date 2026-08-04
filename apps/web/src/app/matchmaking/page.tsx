import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Card } from "@/components/card";

const filters = ["Nearby", "Verified", "Professionals", "Family-minded"];

const matchPreview = [
  {
    name: "Aisha Khan",
    age: 29,
    location: "Hyderabad",
    profession: "Product Designer",
    education: "Bachelor's in Design",
    about: "Values a calm home life, shared faith, and meaningful conversations.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mohammed Bilal",
    age: 32,
    location: "Hyderabad",
    profession: "Software Engineer",
    education: "Masters in Computer Science",
    about: "Looking for a respectful partnership grounded in purpose and family values.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
];

export default function MatchmakingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <Badge tone="emerald">Curated discovery</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Discover meaningful matches with intention.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            This premium matchmaking experience is ready for future Supabase-driven profile discovery, while preserving a warm and respectful tone.
          </p>
        </div>
        <Link href="/profile/create">
          <Button>Refine your profile</Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card eyebrow="Discovery tools" title="Filters" description="Shape the experience around your preferred lifestyle and values.">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Badge key={filter} tone="slate" className="bg-slate-100">
                {filter}
              </Badge>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Compatibility overview</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span>Shared values</span>
                <span className="font-semibold text-slate-900">92%</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span>Family orientation</span>
                <span className="font-semibold text-slate-900">88%</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span>Privacy comfort</span>
                <span className="font-semibold text-slate-900">95%</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {matchPreview.map((profile) => (
            <div key={profile.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-sm">
                    <Image
                      src={profile.avatarUrl}
                      alt={`${profile.name} avatar`}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-slate-900">{profile.name}</h2>
                      <Badge tone="emerald">Verified</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {profile.age} • {profile.location}
                    </p>
                  </div>
                </div>
                <Button variant="secondary">View profile</Button>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Profession:</span> {profile.profession}
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold text-slate-900">Education:</span> {profile.education}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">{profile.about}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
