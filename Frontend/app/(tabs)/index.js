import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import JournalEntryModal from "@/components/JournalEntryModal";
import StatisticsModal from "@/components/StatisticsModal";
import LoginScreen from "@/components/LoginScreen";
import { deleteJournalEntry } from "@/journalApi"; // Import deleteJournalEntry here

export default function HomeScreen({ journalEntries: initialEntries, isLoggedIn, setIsLoggedIn, updateEntry }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries || []);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setJournalEntries(initialEntries);
	}, [initialEntries]);

	const handleEntryPress = (entry) => {
		setSelectedEntry(entry);
		setModalVisible(true);
	};

	const handleModalDismiss = () => {
		setSelectedEntry(null);
		setModalVisible(false);
	};

	const handleDeleteEntry = async (deletedEntryId) => {
		console.log("Attempting to delete entry with ID:", deletedEntryId);
		try {
			if (!deletedEntryId) {
				console.error("Invalid entry ID for deletion");
				return;
			}
			const result = await deleteJournalEntry(deletedEntryId);
			console.log("Delete entry result:", result);
			// Update local state to remove the deleted entry
			setJournalEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== deletedEntryId));
		} catch (error) {
			console.error("Error deleting entry:", error);
		}
	};

	const handleSaveEntry = async (savedEntry) => {
		try {
			if (savedEntry.id) {
				// Entry was updated, replace it in the state
				setJournalEntries((prevEntries) => prevEntries.map((entry) => (entry.id === savedEntry.id ? savedEntry : entry)));
			} else {
				// New entry was created, add it to the state
				setJournalEntries((prevEntries) => [savedEntry, ...prevEntries]);
			}
		} catch (error) {
			console.error("Error saving entry:", error);
		}
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredEntries = journalEntries.filter(
		(entry) =>
			entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			entry.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			searchQuery === ""
	);

	return (
		<Provider>
			{isLoggedIn ? (
				<View style={{ flex: 1 }}>
					<ParallaxScrollView
						headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
						headerImage={<Image source={require("@/assets/images/emotions.jpg")} style={styles.headerImage} />}
					>
						<ThemedView style={styles.cardContainer}>
							<SearchBar onChangeText={handleSearch} value={searchQuery} />
							{filteredEntries.map((entry, index) => (
								<CardComponent
									key={entry.id || index}
									entry={entry}
									onPress={() => handleEntryPress(entry)}
									searchQuery={searchQuery}
								/>
							))}
						</ThemedView>
					</ParallaxScrollView>
					<JournalEntryModal
						visible={modalVisible}
						onDismiss={handleModalDismiss}
						onSave={handleSaveEntry}
						entry={selectedEntry}
						onDelete={handleDeleteEntry} // Pass the handleDeleteEntry function
					/>
					<StatisticsModal
						visible={statisticsModalVisible}
						onDismiss={() => setStatisticsModalVisible(false)}
						journalEntries={journalEntries}
					/>
				</View>
			) : (
				<LoginScreen onLogin={() => setIsLoggedIn(true)} />
			)}
		</Provider>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	cardContainer: {
		width: "100%",
		gap: 20,
		marginHorizontal: 0,
		gapHorizontal: 0,
		backgroundColor: "transparent",
	},
});
