"use client";

export default function NewsletterForm({
  emailPlaceholder = "Email address",
  buttonLabel = "Sign Up",
}: {
  emailPlaceholder?: string;
  buttonLabel?: string;
}) {
  return (
    <form
      className="newsletter-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="email"
        placeholder={emailPlaceholder}
        aria-label={emailPlaceholder}
        required
      />
      <input
        type="tel"
        placeholder="Phone number (Canada)"
        aria-label="Phone number"
        pattern="[0-9 ()+\-]{7,}"
      />
      <button className="btn" type="submit">
        {buttonLabel}
      </button>
    </form>
  );
}
