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

/** Stylised network diagram: city positions are projected from real coordinates. */
export function GccMap() {
  return (
    <svg
      viewBox="0 0 880 500"
      role="img"
      aria-label="STARMED distribution network from Abu Dhabi and Dubai to Saudi Arabia, Kuwait, Bahrain, Qatar and Oman"
      className="h-auto w-full"
      fill="none"
    >
      {[90, 180, 270, 360].map((r) => (
        <circle key={r} cx={hub.x} cy={hub.y} r={r} stroke="#fff" strokeOpacity="0.08" />
      ))}

      {[...markets, dubai].map((m, i) => (
        <g key={m.name}>
          <path d={arc(m)} stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
          <path
            d={arc(m)}
            pathLength={1}
            stroke="#b6e65e"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="pulse-travel"
            style={{ animationDelay: `${i * -0.9}s`, animationDuration: "4.5s" }}
          />
        </g>
      ))}

      {markets.map((m, i) => (
        <g key={m.name}>
          <circle
            cx={m.x}
            cy={m.y}
            r="9"
            fill="#aab4f5"
            fillOpacity="0.45"
            className="ping-ring"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <circle cx={m.x} cy={m.y} r="5.5" fill="#aab4f5" />
          <text
            x={m.x}
            y={m.y + m.dy}
            textAnchor={m.anchor}
            fill="#fff"
            fontSize="20"
            className="max-sm:hidden"
          >
            {m.name}
          </text>
        </g>
      ))}

      <circle cx={dubai.x} cy={dubai.y} r="7" fill="#b6e65e" />
      <text x={dubai.x + 16} y={dubai.y - 8} fill="#fff" fontSize="20" fontWeight="600" className="max-sm:hidden">
        Dubai hub
      </text>

      <circle cx={hub.x} cy={hub.y} r="14" fill="#b6e65e" fillOpacity="0.4" className="ping-ring" />
      <circle cx={hub.x} cy={hub.y} r="9" fill="#b6e65e" />
      <text
        x={hub.x}
        y={hub.y + 38}
        textAnchor="middle"
        fill="#fff"
        fontSize="20"
        fontWeight="600"
        className="max-sm:hidden"
      >
        Abu Dhabi hub
      </text>
    </svg>
  );
}
