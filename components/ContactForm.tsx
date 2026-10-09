"use client";

import { useState } from "react";

const SUPPORT_EMAIL = "info@torvaultsafe.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [country, setCountry] = useState("Canada");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Torvault Contact Form — ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Order Number: ${orderNumber || "—"}`,
        `Country: ${country}`,
        "",
        "Message:",
        message,
      ].join("\n")
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="dealer-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Name *</label>
        <input
          id="cf-name"
          type="text"
          placeholder="First & Last"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email *</label>
        <input
          id="cf-email"
          type="email"
          placeholder="Ex: info@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cf-phone">Phone *</label>
        <input
          id="cf-phone"
          type="tel"
          placeholder="(555) 555-5555"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cf-order">Order Number</label>
        <input
          id="cf-order"
          type="text"
          placeholder="If applicable to your request."
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
      </div>
      <div className="field field-full">
        <label htmlFor="cf-country">Country</label>
        <select id="cf-country" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="field field-full">
        <label htmlFor="cf-message">Message *</label>
        <textarea
          id="cf-message"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button className="btn" type="submit">
        Send Message
      </button>
    </form>
  );
}
