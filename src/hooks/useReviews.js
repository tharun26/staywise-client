import api from "../services/api";

export const fetchReviews = async (listingid) => {
  try {
    const response = await api.get(`/reviews/listings/${listingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReview = async (bookingid) => {
  try {
    const response = await api.get(`/reviews/booking/${bookingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createReview = async (review) => {
  try {
    const response = await api.post("/reviews", review);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editReview = async (reviewPayload) => {
  const { reviewId, reviewData } = reviewPayload;
  try {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (reviewid) => {
  try {
    const response = await api.delete(`/reviews/${reviewid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
