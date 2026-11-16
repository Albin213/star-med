const project = (lon: number, lat: number) => ({
  x: Math.round((lon - 44) * 52 + 40),
  y: Math.round((31 - lat) * 42 + 10),
});

const hub = { name: "Abu Dhabi", ...project(54.4, 24.45) };
const dubai = { name: "Dubai", ...project(55.3, 25.2) };

const markets = [
  { name: "Saudi Arabia", ...project(46.7, 24.7), anchor: "middle", dy: 34 },
  { name: "Kuwait", ...project(48, 29.4), anchor: "middle", dy: -22 },
  { name: "Bahrain", ...project(50.55, 26.2), anchor: "end", dy: -18 },
  { name: "Qatar", ...project(51.5, 25.3), anchor: "middle", dy: 36 },
  { name: "Oman", ...project(58.4, 23.6), anchor: "middle", dy: 36 },
] as const;

const arc = (to: { x: number; y: number }) => {
  const mx = (hub.x + to.x) / 2;
  const my = (hub.y + to.y) / 2 - Math.abs(hub.x - to.x) * 0.28 - 14;
  return `M${hub.x} ${hub.y} Q${mx} ${my} ${to.x} ${to.y}`;
};

/** Stylised network radar: city positions are projected from real coordinates. */
export function GccMap() {
  return (
    <svg
      viewBox="0 0 880 500"
      role="img"
      aria-label="STARMED distribution network from Abu Dhabi and Dubai to Saudi Arabia, Kuwait, Bahrain, Qatar and Oman"
      className="h-auto w-full"
      fill="none"
    >
      <defs>
        <radialGradient id="map-glow">
          <stop offset="0" stopColor="#17368c" stopOpacity="0.12" />
          <stop offset="1" stopColor="#17368c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sweep" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#17368c" stopOpacity="0" />
          <stop offset="1" stopColor="#17368c" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="arc-grad" x1="0" x2="1">
          <stop offset="0" stopColor="#17368c" />
          <stop offset="1" stopColor="#71b204" />
        </linearGradient>
        <pattern id="map-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#0e1a36" fillOpacity="0.12" />
        </pattern>
      </defs>

      <rect width="880" height="500" fill="url(#map-dots)" />
      <circle cx={hub.x} cy={hub.y} r="360" fill="url(#map-glow)" />

      {[90, 180, 270, 360].map((r) => (
        <circle key={r} cx={hub.x} cy={hub.y} r={r} stroke="#17368c" strokeOpacity="0.12" strokeDasharray={r % 180 ? "3 6" : undefined} />
      ))}
      <line x1={hub.x - 380} y1={hub.y} x2={hub.x + 380} y2={hub.y} stroke="#17368c" strokeOpacity="0.08" />
      <line x1={hub.x} y1={hub.y - 380} x2={hub.x} y2={hub.y + 380} stroke="#17368c" strokeOpacity="0.08" />

      {/* Rotating radar sweep */}
      <g className="radar">
        <rect x={hub.x - 360} y={hub.y - 360} width="720" height="720" fill="none" />
        <path d={`M${hub.x} ${hub.y} L${hub.x + 360} ${hub.y} A360 360 0 0 0 ${hub.x + 312} ${hub.y - 180} Z`} fill="url(#sweep)" />
      </g>

      {[...markets, dubai].map((m, i) => (
        <g key={m.name}>
          <path d={arc(m)} stroke="#17368c" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="4 5" />
          <path
            d={arc(m)}
            pathLength={1}
            stroke="url(#arc-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="pulse-travel"
            style={{ animationDelay: `${i * -0.9}s`, animationDuration: "4.5s", filter: "drop-shadow(0 0 4px #17368c)" }}
          />
        </g>
      ))}

      {markets.map((m, i) => (
        <g key={m.name}>
          <circle
            cx={m.x}
            cy={m.y}
            r="9"
            fill="#17368c"
            fillOpacity="0.4"
            className="ping-ring"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <circle cx={m.x} cy={m.y} r="5" fill="#f7f6f2" stroke="#17368c" strokeWidth="2" />
          <text
            x={m.x}
            y={m.y + m.dy}
            textAnchor={m.anchor}
            fill="#0e1a36"
            fontSize="18"
            fontFamily="var(--font-jetbrains), monospace"
            letterSpacing="1"
            className="max-sm:hidden"
          >
            {m.name.toUpperCase()}
          </text>
        </g>
      ))}

      <circle cx={dubai.x} cy={dubai.y} r="7" fill="#71b204" style={{ filter: "drop-shadow(0 0 1.5px #71b204)" }} />
      <text x={dubai.x + 16} y={dubai.y - 8} fill="#4d8a0b" fontSize="18" fontWeight="600" fontFamily="var(--font-jetbrains), monospace" className="max-sm:hidden">
        Dubai hub
      </text>

      <circle cx={hub.x} cy={hub.y} r="14" fill="#71b204" fillOpacity="0.4" className="ping-ring" />
      <circle cx={hub.x} cy={hub.y} r="9" fill="#71b204" style={{ filter: "drop-shadow(0 0 2px #71b204)" }} />
      <text
        x={hub.x}
        y={hub.y + 38}
        textAnchor="middle"
        fill="#4d8a0b"
        fontSize="18"
        fontWeight="600"
        fontFamily="var(--font-jetbrains), monospace"
        className="max-sm:hidden"
      >
        Abu Dhabi hub
      </text>
    </svg>
  );
}
