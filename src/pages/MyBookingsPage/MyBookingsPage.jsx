import React from "react";
import BookingCard from "./components/BookingCard";
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
  if (!booking || booking.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
        No Bookings available
      </div>
    );
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
