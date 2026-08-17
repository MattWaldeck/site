const ITEMS = [
  "CPT ⇄ DBN",
  "CPT ⇄ JHB",
  "CPT ⇄ PE",
  "WEEKLY: EDEN KAROO",
  "KEIMOES",
  "GROOTDRINK",
  "450+ TONS MOVED WEEKLY",
];

function TickerItems({ prefix }: { prefix: string }) {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={`${prefix}-${i}`}>
          {item}
          <span className="dim">&nbsp;·</span>
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <TickerItems prefix="a" />
        <TickerItems prefix="b" />
      </div>
    </div>
  );
}
