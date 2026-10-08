import Link from "next/link";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <span className="hide-sm">
          A new line from Security Lock &amp; Safe Inc. &mdash; Toronto&rsquo;s
          trusted safe experts since 1987
        </span>
        <div className="topbar-links">
          <a href="tel:+18778875620">1-877-887-5620</a>
          <Link href="/dealers">Become a Dealer</Link>
        </div>
      </div>
    </div>
  );
}
