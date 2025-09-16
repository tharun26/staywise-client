import { Button } from "@/components/ui/button";
import { UserStar, Binoculars, MessageCircle, CircleX } from "lucide-react";

export default function HostBookingActions({ onCancelBooking, onViewDetails }) {
  return (
    <>
      <div className="flex gap-2">
        <Button
          title="Listing Details"
          onClick={onViewDetails}
          className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110  text-base font-medium"
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
    </>
  );
}
