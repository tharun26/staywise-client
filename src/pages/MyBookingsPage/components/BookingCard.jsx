import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "@/hooks/useBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import BookingImage from "./BookingImage";
import BookingInfo from "./BookingInfo";
import BookingStatus from "./BookingStatus";
import BookingActions from "./BookingActions";

export default function BookingCard({ booking }) {
  const listing = booking.listingId;
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);

  const checkIn = checkInDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const checkOut = checkOutDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const cancelABooking = useMutation({
    mutationFn: (bookingid) => cancelBooking(bookingid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBooking"] });
      toast.success("Booking Cancelled!", {
        description: "Your Booking is now cancelled",
        duration: 3000,
      });
    },
  });

  const handleCancelBooking = () => {
    cancelABooking.mutate(booking._id);
  };
  return (
    <Card className="flex flex-row items-center justify-between p-8 rounded-3xl shadow-sm border border-gray-200 bg-white max-w-7xl w-full">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <BookingImage src={listing.photos?.[0]} alt={listing.title} />
        <BookingInfo
          title={listing.title}
          address={listing.address}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={booking.guests}
        />
      </div>
      <div className="flex flex-col items-end gap-4 min-w-[200px] ml-8 self-stretch justify-center">
        <BookingStatus
          status={booking.status}
          totalPrice={booking.totalPrice}
        />
        <BookingActions
          onViewDetails={() => navigate(`/listing/${listing._id}`)}
          onCancelBooking={handleCancelBooking}
          booking={booking}
        />
      </div>
    </Card>
  );
}
