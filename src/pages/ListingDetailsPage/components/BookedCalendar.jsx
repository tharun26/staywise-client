import { fetchBookingAvailability } from "@/hooks/useListing";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";

export function BookedCalendar({ listingId, selectedRange, setSelectedRange }) {
  const {
    data: bookingAvailability,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["listingBooking", listingId],
    queryFn: () => fetchBookingAvailability(listingId),
  });

  const bookedRanges =
    bookingAvailability?.map((b) => ({
      from: new Date(b.checkIn),
      to: new Date(b.checkOut),
    })) || [];

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const disabledDates = [...bookedRanges, { from: new Date(0), to: yesterday }];

  return (
    <div className="rounded-md border p-4">
      {isLoading && <p>Loading availability…</p>}
      {error && <p className="text-red-500">Failed to load bookings</p>}

      <Calendar
        mode="range"
        selected={selectedRange}
        onSelect={(range) => {
          console.log("🚀 ~ range:", range);
          setSelectedRange(range);
        }}
        disabled={disabledDates}
        modifiers={{ booked: bookedRanges }}
        modifiersClassNames={{
          booked: "line-through text-red-500 bg-gray-100",
        }}
        className="rounded-md"
      />
    </div>
  );
}
