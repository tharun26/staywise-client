import React from "react";
import BookingCard from "./BookingCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBooking } from "@/hooks/useBooking";


function MyBookingsPage() {
  const { data: booking, isLoading } = useQuery({
    queryKey: ["myBooking"],
    queryFn: () => fetchBooking(),
  });

  if (isLoading) {
    <p>Loading....</p>;
  }
  return (
    <div className="flex flex-col items-center gap-6 py-8 bg-slate-50 min-h-screen">
      {booking &&
        booking.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onMessageHost={() => alert("Message Host clicked!")}
          />
        ))}
    </div>
  );
}

export default MyBookingsPage;
