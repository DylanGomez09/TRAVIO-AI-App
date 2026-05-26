"use client";

import { useState, useEffect } from "react";
import { getWikipediaCityImage } from "@/lib/get-city-image";

export default function LazyTripImage({
  destination,
  className,
}: {
  destination: string;
  className?: string;
}) {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchRealImage() {
      const url = await getWikipediaCityImage(destination);
      if (url) {
        setImgUrl(url);
      } else {
        setImgUrl(`https://picsum.photos/seed/${encodeURIComponent(destination)}/600/400`);
      }
    }
    
    fetchRealImage();
  }, [destination]);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-gray-700 to-gray-900 ${className}`}>
      {imgUrl && !errored && (
        <img
          src={imgUrl}
          alt={destination}
          className={`absolute inset-0 h-full w-full object-cover mix-blend-overlay transition-opacity duration-500 ${
            loaded ? "opacity-80" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}