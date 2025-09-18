import HostBookingCard from "./components/HostBookingCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHostBooking } from "@/hooks/useBooking";

function MyBookingsPage() {
  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myHostBooking"],
    queryFn: () => fetchHostBooking(),
  });

  if (isLoading) {
    <p>Loading....</p>;
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
        Kindly Login to view your Booking
      </div>
    );
  }

  return (
    <>
      {booking && booking.length == 0 && (
        <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
          No Bookings available
        </div>
      )}
      <div className="flex flex-col items-center gap-6 py-8 bg-slate-50 min-h-screen">
        {booking &&
          booking.map((booking) => (
            <HostBookingCard
              key={booking._id}
              booking={booking}
              onMessageHost={() => alert("Message Host clicked!")}
            />
          ))}
      </div>
    </>
  );
}

export default MyBookingsPage;
