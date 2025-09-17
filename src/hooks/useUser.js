import api from "../services/api";

export const fetchUser = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (newUserData) => {
  try {
    const response = await api.put("/users", newUserData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFavourites = async () => {
  try {
    const response = await api.get("/users/favorites");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addFavourite = async (listingid) => {
  try {
    const response = await api.post(`/users/favorites/${listingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFavourite = async (listingid) => {
  try {
    const response = await api.delete(`/users/favorites/${listingid}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete("/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
