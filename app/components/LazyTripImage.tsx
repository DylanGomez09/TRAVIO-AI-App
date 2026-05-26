"use client";

import { useState } from "react";

export default function LazyTripImage({
  destination,
  className,
}: {
  destination: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const picsumUrl = `https://picsum.photos/seed/${encodeURIComponent(destination)}/600/400`;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 ${className}`}>
      {!errored && (
        <img
          src={picsumUrl}
          alt={destination}
          className={`absolute inset-0 h-full w-full object-cover mix-blend-overlay transition-opacity duration-500 ${loaded ? "opacity-80" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
