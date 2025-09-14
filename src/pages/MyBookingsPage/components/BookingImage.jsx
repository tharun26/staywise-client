import React from "react";

export default function BookingImage({ src, alt }) {
  return (
    <div className="w-40 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
      {src ? (
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>
  );
}
