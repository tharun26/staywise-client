import { useState } from "react";
import { fetchBookingAvailability } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";

export function BookedCalendar({ listingId }) {
  const [selectedRange, setSelectedRange] = useState({
    from: undefined,
    to: undefined,
  });
  const {
    data: bookingAvailability,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listingBooking", listingId],
    queryFn: () => fetchBookingAvailability(listingId),
  });

  // Map API bookings to date ranges
  const bookedRanges =
    bookingAvailability?.map((b) => ({
      from: new Date(b.checkIn),
      to: new Date(b.checkOut),
    })) || [];

  // Disable all dates before today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time part
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const disabledDates = [
    ...bookedRanges,
    { from: new Date(0), to: yesterday }, // all days before today
  ];

  return (
    <div className="rounded-md border p-4">
      {isLoading && <p>Loading availability…</p>}
      {error && <p className="text-red-500">Failed to load bookings</p>}

      <Calendar
        mode="range"
        selected={selectedRange}
        onSelect={(range) => {
          // If range is undefined, clear selection
          if (!range) {
            setSelectedRange({ from: undefined, to: undefined });
            return;
          }
          // If user clicks the start date again, unselect
          if (
            range.from &&
            !range.to &&
            selectedRange.from &&
            !selectedRange.to &&
            range.from.getTime() === selectedRange.from.getTime()
          ) {
            setSelectedRange({ from: undefined, to: undefined });
          } else {
            setSelectedRange(range);
          }
        }}
        className="rounded-md"
        disabled={disabledDates} // disables booked and past dates
        modifiers={{ booked: bookedRanges }} // custom modifier
        modifiersClassNames={{
          booked: "line-through text-red-500 bg-gray-100",
        }}
      />
      {/* Show selected range for demonstration */}
      {selectedRange.from && selectedRange.to && (
        <div className="mt-2 text-sm text-gray-700">
          Selected: {selectedRange.from.toLocaleDateString()} to{" "}
          {selectedRange.to.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
