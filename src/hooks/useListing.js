import api from "../services/api";

export const fetchListings = async ({ page = 1, limit = 8 } = {}) => {
  try {
    const response = await api.get("/listings", {
      params: { page, limit },
    });
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

export const fetchListingByIds = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) return [];
  try {
    const response = await api.post("/listings/by-ids", { ids });
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchListingsHost = async () => {
  try {
    const response = await api.get("/listings/host");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postListingsHost = async (listingData) => {
  try {
    // Always send as JSON, no photo upload
    const response = await api.post("/listings", listingData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editListingsHost = async (newListingData) => {
  const { listingId } = newListingData;
  try {
    const response = await api.put(`/listings/${listingId}`, newListingData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteListingsHost = async (listingid) => {
  try {
    const response = await api.delete(`/listings/${listingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
