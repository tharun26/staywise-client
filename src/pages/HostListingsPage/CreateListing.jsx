import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postListingsHost } from "@/hooks/useListing";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  title: "",
  description: "",
  pricePerNight: "",
  amenities: [],
  maxGuests: 1,
  bedrooms: 0,
  bathrooms: 0,
  photo: null,
};

const initialAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

const AMENITIES = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "TV",
  "Parking",
  "Pool",
  "Gym",
];

function CreateListing() {
  const [form, setForm] = useState(initialState);
  const [addressForm, setAddressForm] = useState(initialAddress);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createAListing = useMutation({
    mutationFn: (listingData) => postListingsHost(listingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      queryClient.invalidateQueries({ queryKey: ["hostListings"] });
      toast.success("Listing created!", {
        description: "Your listing is live now",
        duration: 3000,
      });
    },
  });

  const handleChange = (e) => {
    const { name, value, checked, files } = e.target;
    if (name === "photo") {
      setForm((prev) => {
        return { ...prev, [name]: files[0] };
      });
      return;
    }
    if (name === "amenities") {
      setForm((prev) => {
        const selected = prev.amenities || [];
        return {
          ...prev,
          amenities: checked
            ? [...selected, value]
            : selected.filter((a) => a !== value),
        };
      });
      return;
    }
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const convertToFormData = (payload) => {
    const formDataPayload = new FormData();

    for (const key in payload) {
      const value = payload[key];

      if (key === "address") {
        for (const addrKey in value) {
          formDataPayload.append(`address.${addrKey}`, value[addrKey]);
        }
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formDataPayload.append(`${key}[${index}]`, item);
        });
      } else if (key === "photo" && value) {
        formDataPayload.append("photo", value);
      } else if (value !== null && value !== undefined) {
        formDataPayload.append(key, value);
      }
    }
    return formDataPayload;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { address: addressForm, ...form };
    const formDataFormat = convertToFormData(payload);
    createAListing.mutate(formDataFormat);
    navigate("/host/myListings");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-3xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Create a New Listing
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              maxLength={140}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price per Night (Eur)
            </label>
            <input
              type="number"
              name="pricePerNight"
              value={form.pricePerNight}
              min={0}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-blue-700
                 hover:file:bg-blue-100"
            />
          </div>

          <h2>Address</h2>

          <div className="mx-2 grid grid-cols-3 grid-rows-2 gap-4  ">
            <input
              type="text"
              name="line1"
              placeholder="Address Line 1"
              value={addressForm.line1}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="line2"
              placeholder="Address Line 2 (optional)"
              value={addressForm.line2}
              onChange={handleAddressChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={addressForm.city}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={addressForm.state}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={addressForm.country}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={addressForm.postalCode}
              onChange={handleAddressChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <input
                    type="checkbox"
                    name="amenities"
                    value={amenity}
                    checked={form.amenities.includes(amenity)}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Max Guests
              </label>
              <input
                type="number"
                name="maxGuests"
                value={form.maxGuests}
                min={1}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                min={0}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                min={0}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors duration-150"
            >
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;
