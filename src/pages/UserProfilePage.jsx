import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, editUser } from "@/hooks/useUser";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";

function UserProfilePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [addressForm, setAddressForm] = useState({
    line1: user?.address?.line1 || "",
    line2: user?.address?.line2 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "",
    postalCode: user?.address?.postalCode || "",
    location: user?.address?.location || { type: "Point", coordinates: [] },
  });

  useEffect(() => {
    setFormData({
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setAddressForm({
      line1: user?.address?.line1 || "",
      line2: user?.address?.line2 || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
      postalCode: user?.address?.postalCode || "",
      location: user?.address?.location || { type: "Point", coordinates: [] },
    });
  }, [user]);

  const queryClient = useQueryClient();

  const editTheUser = useMutation({
    mutationFn: (newUserData) => editUser(newUserData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const submitData = {
        email: formData.email,
        phone: formData.phone,
        address: {
          line1: addressForm.line1,
          line2: addressForm.line2,
          city: addressForm.city,
          state: addressForm.state,
          country: addressForm.country,
          postalCode: addressForm.postalCode,
          location: addressForm.location,
        },
      };
      editTheUser.mutate(submitData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return user ? (
    <div>
      <div className="flex items-center bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-4xl mx-auto shadow-sm">
        <Avatar name={user.name} size="96" round={true} />

        <div className="ml-8 flex-1">
          <div className="text-2xl font-semibold text-gray-900 mb-2">
            {user.name}
          </div>
          <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Joined on {joinDate}
          </span>
        </div>
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors duration-150">
          <Trash2 className="text-xl" />
          Delete Account
        </button>
      </div>
      {/* User Info Form */}
      <form className="bg-blue-50 rounded-2xl p-8 mt-8 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-lg mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              readOnly
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">Phone</label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              readOnly={!isEditing}
              onChange={handleChange}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">Bookings</label>
            <input
              name="bookings"
              type="text"
              value={user.bookings}
              readOnly
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </form>
      {/* Address Form */}
      <form className="bg-blue-50 rounded-2xl p-8 mt-8 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-lg mb-2">
              Address Line 1
            </label>
            <input
              name="line1"
              type="text"
              value={addressForm.line1}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">
              Address Line 2
            </label>
            <input
              name="line2"
              type="text"
              value={addressForm.line2}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">City</label>
            <input
              name="city"
              type="text"
              value={addressForm.city}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">State</label>
            <input
              name="state"
              type="text"
              value={addressForm.state}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">Country</label>
            <input
              name="country"
              type="text"
              value={addressForm.country}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-lg mb-2">
              Postal Code
            </label>
            <input
              name="postalCode"
              type="text"
              value={addressForm.postalCode}
              onChange={handleAddressChange}
              readOnly={!isEditing}
              className="w-full bg-white rounded-xl px-6 py-4 text-lg font-semibold text-gray-900 border-none shadow-sm focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <Button onClick={handleButtonClick}>
              {isEditing ? (
                "Submit"
              ) : (
                <>
                  <Pencil />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center my-[20%] font-extrabold ">
      Kindly Login to see the User Profile
    </div>
  );
}

export default UserProfilePage;
