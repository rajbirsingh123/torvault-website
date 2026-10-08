import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-grad",
  outline: "btn-outline",
  ghost: "btn-text",
};

export default function Button({ href, children, variant = "primary", className = "", onClick }: ButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={`btn ${variantClass[variant]} ${className}`}>
      {children}
    </Link>
  );
}
