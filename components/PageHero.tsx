import { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export default function PageHero({
  crumb,
  eyebrow,
  title,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{crumb}</span>
        </div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
