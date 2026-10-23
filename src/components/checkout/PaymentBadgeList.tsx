import React from "react";

export function PaymentBadgeList({ compact = false }: { compact?: boolean }) {
  const methods = [
    {
      name: "Chapa Gateway",
      sub: "Verified Ethiopian Gateway",
      color: "bg-emerald-950/40 border-emerald-700/40 text-emerald-300",
      icon: (
        <span className="font-serif font-black tracking-wider text-xs px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-200 border border-emerald-500/40">
          CHAPA
        </span>
      ),
    },
    {
      name: "Telebirr",
      sub: "Ethio Telecom",
      color: "bg-blue-950/40 border-blue-700/40 text-blue-300",
      icon: (
        <span className="font-sans font-bold text-xs px-2 py-0.5 rounded bg-blue-600/30 text-blue-200 border border-blue-500/40">
          telebirr
        </span>
      ),
    },
    {
      name: "CBE Birr",
      sub: "Commercial Bank of Ethiopia",
      color: "bg-purple-950/40 border-purple-700/40 text-purple-300",
      icon: (
        <span className="font-sans font-bold text-xs px-2 py-0.5 rounded bg-purple-600/30 text-purple-200 border border-purple-500/40">
          CBE Birr
        </span>
      ),
    },
    {
      name: "Awash Birr",
      sub: "Awash International",
      color: "bg-amber-950/40 border-amber-700/40 text-amber-300",
      icon: (
        <span className="font-sans font-bold text-xs px-2 py-0.5 rounded bg-amber-600/30 text-amber-200 border border-amber-500/40">
          AWASH
        </span>
      ),
    },
    {
      name: "Visa / Mastercard",
      sub: "Diaspora & Global Cards",
      color: "bg-zinc-900 border-zinc-700 text-zinc-300",
      icon: (
        <div className="flex items-center space-x-1 text-[11px] font-bold">
          <span className="text-blue-400">VISA</span>
          <span className="text-zinc-500">|</span>
          <span className="text-red-400">MC</span>
        </div>
      ),
    },
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {methods.map((m) => (
          <div
            key={m.name}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded border text-xs ${m.color}`}
          >
            {m.icon}
            <span className="font-medium text-ivory-100">{m.name}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
      {methods.map((m) => (
        <div
          key={m.name}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all duration-300 hover:scale-[1.02] ${m.color}`}
        >
          <div className="mb-1.5">{m.icon}</div>
          <span className="text-xs font-semibold text-ivory-100">{m.name}</span>
          <span className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{m.sub}</span>
        </div>
      ))}
    </div>
  );
}
