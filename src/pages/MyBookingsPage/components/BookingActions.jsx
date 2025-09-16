import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserStar, Binoculars, MessageCircle, CircleX } from "lucide-react";
import ReviewDialog from "./ReviewDialog";

export default function BookingActions({
  onViewDetails,
  onCancelBooking,
 booking
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <Button
          title="My Reviews"
          className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110 text-base font-medium"
          onClick={() => setOpen(true)}
        >
          <UserStar />
        </Button>
        <Button
          variant="outline"
          onClick={onViewDetails}
          title="View Details"
          className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110 text-base font-medium"
        >
          <Binoculars />
        </Button>
        <Button
          title="Cancel Booking"
          onClick={onCancelBooking}
          className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110  text-base font-medium"
        >
          <CircleX />
        </Button>
      </div>
      <ReviewDialog open={open} setOpen={setOpen} booking={booking} />
    </>
  );
}
