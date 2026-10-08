const TICKS = Array.from({ length: 24 });

export default function CertSeal({ glyph }: { glyph: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        {TICKS.map((_, i) => {
          const angle = (i / TICKS.length) * 360;
          return <line key={i} x1="32" y1="2.5" x2="32" y2="7" transform={`rotate(${angle} 32 32)`} />;
        })}
      </g>
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <circle cx="32" cy="32" r="17.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <text
        x="32"
        y="37.5"
        textAnchor="middle"
        fontSize={glyph.length > 2 ? 13 : 17}
        fontWeight="800"
        fill="currentColor"
        fontFamily="var(--font-jakarta), 'Plus Jakarta Sans', sans-serif"
        letterSpacing={glyph.length > 2 ? "2" : "0"}
      >
        {glyph}
      </text>
    </svg>
  );
}
