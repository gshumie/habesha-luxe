import React from "react";

export function TibebBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center opacity-85 select-none ${className}`}>
      <svg
        className="w-full h-4 sm:h-5 text-gold-500"
        viewBox="0 0 1200 20"
        fill="currentColor"
        preserveAspectRatio="repeat-x"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id="tibeb-pattern" width="80" height="20" patternUnits="userSpaceOnUse">
          {/* Central Meskel Cross Motif */}
          <path
            d="M40 2 L45 7 L42 7 L42 9 L44 9 L44 11 L42 11 L42 13 L45 13 L40 18 L35 13 L38 13 L38 11 L36 11 L36 9 L38 9 L38 7 L35 7 Z"
            fill="#c59b27"
          />
          {/* Diamond Rhombus / Shemane Accents */}
          <polygon points="15,10 20,4 25,10 20,16" fill="#e5b842" opacity="0.9" />
          <polygon points="55,10 60,4 65,10 60,16" fill="#e5b842" opacity="0.9" />
          {/* Emerald & Crimson cultural tiny dots */}
          <circle cx="20" cy="10" r="1.5" fill="#1b4332" />
          <circle cx="60" cy="10" r="1.5" fill="#5c1b24" />
          <circle cx="40" cy="10" r="1.5" fill="#faf9f6" />
          {/* Horizontal Golden Filigree Thread */}
          <line x1="0" y1="2" x2="80" y2="2" stroke="#c59b27" strokeWidth="0.8" opacity="0.6" />
          <line x1="0" y1="18" x2="80" y2="18" stroke="#c59b27" strokeWidth="0.8" opacity="0.6" />
          <circle cx="5" cy="10" r="1" fill="#c59b27" opacity="0.7" />
          <circle cx="75" cy="10" r="1" fill="#c59b27" opacity="0.7" />
        </pattern>
        <rect width="100%" height="20" fill="url(#tibeb-pattern)" />
      </svg>
    </div>
  );
}

export function ImperialSeal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        className="w-16 h-16 text-gold-400"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="46" stroke="#c59b27" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="41" stroke="#e5b842" strokeWidth="1" />
        {/* Crown of Ethiopia */}
        <path
          d="M32 60 L35 44 L44 50 L50 36 L56 50 L65 44 L68 60 Z"
          fill="url(#goldGrad)"
          stroke="#c59b27"
          strokeWidth="1.2"
        />
        {/* Base of Crown */}
        <rect x="32" y="60" width="36" height="5" rx="1" fill="#c59b27" />
        <circle cx="50" cy="34" r="2.5" fill="#f3cf65" />
        <circle cx="35" cy="42" r="2" fill="#f3cf65" />
        <circle cx="65" cy="42" r="2" fill="#f3cf65" />
        <defs>
          <linearGradient id="goldGrad" x1="32" y1="36" x2="68" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f3cf65" />
            <stop offset="0.5" stopColor="#c59b27" />
            <stop offset="1" stopColor="#866019" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function MeskelCrossIcon({ className = "w-4 h-4 text-gold-400" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2h2v3h3v2h-3v4h4v-3h2v8h-2v-3h-4v4h3v2h-3v3h-2v-3H8v-2h3v-4H7v3H5V9h2v3h4V7H8V5h3V2z" />
    </svg>
  );
}
