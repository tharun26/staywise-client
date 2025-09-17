import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUser, editUser, deleteUser } from "@/hooks/useUser";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import AddressSection from "./components/AddressSection";
import ContactSection from "./components/ContactSection";

function UserProfilePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(),
  });
  const { verify } = useContext(AuthContext);
  const navigate = useNavigate();
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
      toast.success("Data Updated!", {
        description: "Your Personal Information is updated Successfully",
        duration: 3000,
      });
    },
  });

  const deleteTheUser = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      toast.success("User Deleted", {
        description: "Your Personal Information is Deleted Successfully",
        duration: 3000,
      });
      localStorage.removeItem("authToken");
      verify();
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
  });

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

  const handleDeleteUser = (e) => {
    e.stopPropagation();
    deleteTheUser.mutate();
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
        <button
          onClick={handleDeleteUser}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors duration-150"
        >
          <Trash2 className="text-xl" />
          Delete Account
        </button>
      </div>

      <ContactSection
        formData={formData}
        isEditing={isEditing}
        handleChange={handleChange}
        user={user}
      />
      <AddressSection
        addressForm={addressForm}
        handleAddressChange={handleAddressChange}
        isEditing={isEditing}
      />
      <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
        <Button
          onClick={handleButtonClick}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
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
  ) : (
    <div className="flex justify-center items-center h-64 text-xl text-gray-500 my-[20%]">
      Kindly Login to see the User Profile
    </div>
  );
}

export default UserProfilePage;
