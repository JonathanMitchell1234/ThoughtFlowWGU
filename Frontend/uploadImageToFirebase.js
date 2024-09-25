import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Platform } from "react-native";
import { v4 as uuidv4 } from "uuid"; // For unique filenames

const uploadImageToFirebase = async (uri) => {
	const storage = getStorage();
	const fileName = `${uuidv4()}.jpg`; // Create a unique file name
	const storageRef = ref(storage, `images/${fileName}`);

	const response = await fetch(uri); // Fetch the file
	const blob = await response.blob(); // Convert the file to a blob

	await uploadBytes(storageRef, blob); // Upload the blob to Firebase

	// Get the download URL for the uploaded image
	const downloadUrl = await getDownloadURL(storageRef);
	return downloadUrl; // Return the URL to store in your entry
};
