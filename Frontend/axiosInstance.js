import axios from "axios";
import { getAuth } from "firebase/auth";

// Create Axios instance
const axiosInstance = axios.create({
	baseURL: "http://localhost:8080/api/", // Replace with your backend's IP or domain
	headers: {
		"Content-Type": "application/json",
	},
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
	async (config) => {
		const auth = getAuth(); // Firebase Auth instance
		const user = auth.currentUser;

		if (user) {
			const token = await user.getIdToken(true); // `true` forces token refresh if expired
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
