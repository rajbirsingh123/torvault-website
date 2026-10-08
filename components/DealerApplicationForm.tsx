"use client";

import { useState } from "react";

const DEALER_EMAIL = "dealers@torvaultsafe.com";

export default function DealerApplicationForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessUrl, setBusinessUrl] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [comments, setComments] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Torvault Dealer Application — ${businessName || fullName}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Business Name: ${businessName}`,
        `Business URL: ${businessUrl}`,
        `Business Address: ${businessAddress}`,
        `City: ${city}`,
        `Province: ${province}`,
        `Postal Code: ${postalCode}`,
        "",
        "Questions or comments:",
        comments || "—",
      ].join("\n")
    );
    window.location.href = `mailto:${DEALER_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="dealer-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="df-name">Full Name</label>
        <input
          id="df-name"
          type="text"
          placeholder="Your first and last name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="df-phone">Phone Number</label>
        <input
          id="df-phone"
          type="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="df-email">Email</label>
        <input
          id="df-email"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="df-business-name">Business Name</label>
        <input
          id="df-business-name"
          type="text"
          placeholder="Your business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
      </div>
      <div className="field field-full">
        <label htmlFor="df-business-url">Business URL</label>
        <input
          id="df-business-url"
          type="text"
          placeholder="Website URL (e.g. www.mybusiness.com)"
          value={businessUrl}
          onChange={(e) => setBusinessUrl(e.target.value)}
        />
      </div>
      <div className="field field-full">
        <label htmlFor="df-business-address">Business Address</label>
        <input
          id="df-business-address"
          type="text"
          placeholder="Street address"
          value={businessAddress}
          onChange={(e) => setBusinessAddress(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="df-city">City</label>
        <input
          id="df-city"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="df-province">Province</label>
        <input
          id="df-province"
          type="text"
          placeholder="Province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </div>
      <div className="field field-full">
        <label htmlFor="df-postal">Postal Code</label>
        <input
          id="df-postal"
          type="text"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <div className="field field-full">
        <label htmlFor="df-comments">Questions or Comments?</label>
        <textarea
          id="df-comments"
          placeholder="Please list any questions or comments about becoming a Torvault authorized dealer."
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button className="btn" type="submit">
        Send Application
      </button>
    </form>
  );
}
