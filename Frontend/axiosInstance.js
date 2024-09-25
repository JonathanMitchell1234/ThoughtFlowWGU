import axios from "axios";
import { getAuth } from "firebase/auth";

// Create Axios instance
const axiosInstance = axios.create({
	baseURL: "http://ec2-18-216-214-123.us-east-2.compute.amazonaws.com:8080/api/", // Replace with your backend's IP or domain
	headers: {
		"Content-Type": "application/json",
	},
});


// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
	async (config) => {
		const auth = getAuth(); // Get Firebase Auth instance
		const user = auth.currentUser;

		if (user) {
			const token = await user.getIdToken(); // Get the Firebase ID token
			config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;

