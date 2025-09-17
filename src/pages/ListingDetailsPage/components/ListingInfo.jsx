import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookedCalendar } from "./BookedCalendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/hooks/useBooking";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ListingInfo = ({ listing, listingid }) => {
  const [selectedRange, setSelectedRange] = useState({
    from: undefined,
    to: undefined,
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const reserveAListing = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("Booked Successfully", {
        description: `You have booked ${listing.title}`,
      });
      navigate("/myBookings");
    },
  });

  const days =
    selectedRange?.from && selectedRange?.to
      ? (selectedRange.to - selectedRange.from) / 86400000
      : 0;
  const totalPrice = days * listing.pricePerNight;

  const handleReserve = () => {
    const listingDetails = {
      checkIn: selectedRange.from,
      checkOut: selectedRange.to,
      listingId: listingid,
      totalPrice,
    };
    reserveAListing.mutate(listingDetails);
  };

  return (
    <Card className="p-8 min-w-[380px]">
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-semibold">{listing.title}</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">
            Max Guests: {listing.maxGuests}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg">
            Bedrooms: {listing.bedrooms}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
            Bathrooms: {listing.bathrooms}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">
            €{listing.pricePerNight} per Night
          </p>
          <Button
            onClick={handleReserve}
            className="px-6"
            disabled={!selectedRange?.from || !selectedRange?.to || !user}
          >
            Reserve
          </Button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <Avatar>
            <AvatarImage src={listing.hostId.avatarUrl} />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Hosted by {listing.hostId.name}</p>
            <p className="text-sm text-gray-500">
              Response time: within 1 hour
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <BookedCalendar
            listingId={listingid}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingInfo;
