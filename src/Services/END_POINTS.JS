import axios from "axios"

export const BASE_URL = 'https://upskilling-egypt.com:3006/api/v1'

export const axiosInstance =  axios.create({
    baseURL:BASE_URL, 
    headers: { Authorization: localStorage.getItem('token') }
});

// Interceptor: runs before every request to avoid unauthorized error
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization =  token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//Users URLs
export const BASE_USER = `/users`
export const USER_URLs = {
    login: `${BASE_USER}/login`,
    register: `${BASE_USER}/register`,
    forgot: `${BASE_USER}/reset/request`,
    reset: `${BASE_USER}/reset`,
    verify: `${BASE_USER}/verify`,
    change: `${BASE_USER}/ChangePassword`,

    getAllUsers: `${BASE_USER}/`,
    getUserDetails:(id)=>`/users/${id}`,
    deleteUser:(id)=>`/users/${id}`
}

//Categories URLs
export const Categ_URLs = {
    all: `/category`,
    updateCategory:(id)=> `/category/${id}`,
    deleteCategory:(id)=> `/category/${id}`
}

//Recipes URLs
export const Recipes_URLs = {
    all: `/recipe`,
    addRecipe: 'recipe',
    getRecipeDetails:(id)=>`/recipe/${id}`,
    deleteRecipe:(id)=> `/recipe/${id}`,
    updateRecipe:(id)=> `/recipe/${id}`,
}

export const Favs_URLs = {
    all: `/userRecipe`,
    addFav: `/userRecipe`,
    removeFav:(id)=> `/userRecipe/${id}`
}

export const Tags_URLs = {
    all: `/tag`,
}
