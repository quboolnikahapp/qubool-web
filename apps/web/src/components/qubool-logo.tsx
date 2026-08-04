import Image from "next/image";
import Link from "next/link";

type QuboolLogoProps = { href?: string; className?: string; priority?: boolean; theme?: "light" | "dark" | "mono" };

export function QuboolLogo({ href = "/", className, priority = false, theme = "light" }: QuboolLogoProps) {
  const source = theme === "dark" ? "/qubool-logo-dark.svg" : theme === "mono" ? "/qubool-logo-mono.svg" : "/qubool-logo.svg";
  return <Link href={href} className={className} aria-label="Qubool home"><Image src={source} alt="Qubool" width={720} height={200} priority={priority} /></Link>;
}
