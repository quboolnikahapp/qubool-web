import { Badge } from "@/components/badge";
import { Card } from "@/components/card";

type ProfileCardProps = {
  name: string;
  age: number;
  location: string;
  profession: string;
  education: string;
  about: string;
};

export function ProfileCard({ name, age, location, profession, education, about }: ProfileCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            <Badge tone="emerald">Verified</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {age} • {location}
          </p>
        </div>
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300" />
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-900">Profession:</span> {profession}
        </p>
        <p>
          <span className="font-medium text-slate-900">Education:</span> {education}
        </p>
      </div>

      <p className="text-sm leading-7 text-slate-600">{about}</p>
    </Card>
  );
}
