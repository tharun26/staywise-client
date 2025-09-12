import api from "../services/api";

export const fetchReviews = async (listingid) => {
  try {
    const response = await api.get(`/reviews/listings/${listingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
