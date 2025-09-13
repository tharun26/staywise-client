import React from "react";
import {
  Calendar,
  User,
  Clock,
  CircleX,
  MessageCircle,
  UserStar,
  Binoculars,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

export default function BookingCard({ booking }) {
  const listing = booking.listingId;
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  const navigate = useNavigate();
  return (
    <Card className="flex flex-row items-center justify-between p-8 rounded-3xl shadow-sm border border-gray-200 bg-white max-w-7xl w-full">
      <div className="flex items-center gap-8 flex-1 min-w-0">
        <div className="w-40 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          {listing.photos?.[0] ? (
            <img
              src={listing.photos[0]}
              alt={listing.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold truncate">{listing.title}</h2>
          </div>
          <div className="text-gray-500 text-base">
            {listing.address?.city}, {listing.address?.country}
          </div>
          <div className="flex items-center gap-4 text-base text-gray-700">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Check-in:{" "}
              {checkIn.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              • Check-out:{" "}
              {checkOut.toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-4 text-base text-gray-700">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" aria-hidden="true" />
              {booking.guests || 2} Guests
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 min-w-[200px] ml-8 self-stretch justify-center">
        <span className="px-3 py-1 rounded-full text-base font-medium bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
          <Clock className="w-4 h-4 inline-block" aria-hidden="true" />
          {booking.status}
        </span>
        <div className="text-2xl font-bold text-gray-900">
          €{booking.totalPrice} total
        </div>
        <div className="flex gap-2">
          <Button
            title=" My Reviews"
            className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110 text-base font-medium"
          >
            <UserStar />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              navigate(`/listing/${listing._id}`);
            }}
            title="View Details"
            className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110 text-base font-medium"
          >
            <Binoculars />
          </Button>
          <Button
            title="Message Host"
            className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110  text-base font-medium"
            // onClick={onMessageHost}
          >
            <MessageCircle />
          </Button>
          <Button
            title="Cancel Booking"
            className="rounded-xl px-6 py-2 text-blue-700 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:scale-110  text-base font-medium"
          >
            <CircleX />
          </Button>
        </div>
      </div>
    </Card>
  );
}
