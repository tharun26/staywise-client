import React from "react";
import { Calendar, User } from "lucide-react";

export default function BookingInfo({
  title,
  address,
  checkIn,
  checkOut,
  guests,
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold truncate">{title}</h2>
      </div>
      <div className="text-gray-500 text-base">
        {address?.city}, {address?.country}
      </div>
      <div className="flex items-center gap-4 text-base text-gray-700">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          Check-in: {checkIn}
        </span>
        <span className="flex items-center gap-1">• Check-out: {checkOut}</span>
      </div>
      <div className="flex items-center gap-4 text-base text-gray-700">
        <span className="flex items-center gap-1">
          <User className="w-4 h-4" aria-hidden="true" />
          {guests || 2} Guests
        </span>
      </div>
    </div>
  );
}
