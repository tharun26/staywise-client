import React from "react";
import { Clock } from "lucide-react";

export default function HostBookingStatus({ status, totalPrice }) {
  const isCancelled = status === "cancelled";
  const statusColor = isCancelled ? "text-red-600" : "text-blue-600";

  return (
    <>
      <span
        className={`px-3 py-1 rounded-full text-base font-medium bg-blue-50 ${statusColor} border border-blue-100 flex items-center gap-1`}
      >
        <Clock className="w-4 h-4 inline-block" aria-hidden="true" />
        {status}
      </span>
      <div className="text-2xl font-bold text-gray-900">
        €{totalPrice} total
      </div>
    </>
  );
}
