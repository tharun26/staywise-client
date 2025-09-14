import api from "../services/api";

export const createBooking = async (newBooking) => {
  try {
    const response = await api.post("/bookings", newBooking);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchBooking = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBooking = async (bookingid) => {
  try {
    const response = await api.put(`/bookings/${bookingid}/cancel`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
