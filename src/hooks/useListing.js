import api from "../services/api";


export const fetchListings = async () => {
  try {
    const response = await api.get("/listings");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchListing = async (id) => {
  try {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookingAvailability = async (id) => {
  try {
    const response = await api.get(`/listings/${id}/bookings`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
