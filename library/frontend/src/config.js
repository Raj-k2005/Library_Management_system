
export const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://library-management-system-of21.onrender.com/api/";

export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");
