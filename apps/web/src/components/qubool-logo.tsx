import Image from "next/image";
import Link from "next/link";

type QuboolLogoProps = { href?: string; className?: string; priority?: boolean };

export function QuboolLogo({ href = "/", className, priority = false }: QuboolLogoProps) {
  return <Link href={href} className={className} aria-label="Qubool home"><Image src="/qubool-logo.svg" alt="Qubool" width={720} height={200} priority={priority} /></Link>;
}
