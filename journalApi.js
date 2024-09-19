import axiosInstance from "./axiosInstance";

export const createJournalEntry = async (entry) => {
	try {
		console.log("Sending Entry to API (Create):", entry); // Log the entry object before sending
		const response = await axiosInstance.post("journal-entries", entry);
		return response.data;
	} catch (error) {
		console.error("Error creating journal entry:", error);
		throw error;
	}
};


export const getJournalEntries = async () => {
	try {
		const response = await axiosInstance.get("journal-entries");
		return response.data;
	} catch (error) {
		console.error("Error fetching journal entries:", error);
		throw error;
	}
};

export const updateJournalEntry = async (id, updatedEntry) => {
	try {
		console.log("Sending Updated Entry to API (Update):", updatedEntry); // Log the updated entry object before sending
		const response = await axiosInstance.put(`journal-entries/${id}`, updatedEntry);
		return response.data;
	} catch (error) {
		console.error("Error updating journal entry:", error);
		throw error;
	}
};


export const deleteJournalEntry = async (id) => {
    try {
        const response = await axiosInstance.delete(`journal-entries/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        throw error;
    }
};


