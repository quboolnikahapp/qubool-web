import { Badge } from "@/components/badge";
import { Card } from "@/components/card";

type FeatureCardProps = {
  title: string;
  description: string;
  badge: string;
};

export function FeatureCard({ title, description, badge }: FeatureCardProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-white to-amber-50/70">
      <Badge tone="emerald" className="mb-4">
        {badge}
      </Badge>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </Card>
  );
}
