import React from 'react'

function ListingAmenities({listing}) {
  return (
   <div className="bg-white rounded-2xl border border-blue-100 px-6 py-5 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.slice(0, 15).map((am) => (
                    <span
                      key={am}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>
  )
}

export default ListingAmenities