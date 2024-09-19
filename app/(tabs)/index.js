import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import JournalEntryModal from "@/components/JournalEntryModal";
import StatisticsModal from "@/components/StatisticsModal";
import { auth } from "@/firebaseConfig"; 
import LoginScreen from "@/components/LoginScreen";
import { getJournalEntries } from "@/journalApi"; 

export default function HomeScreen({ journalEntries: initialEntries, isLoggedIn, setIsLoggedIn, onEntryPress }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch and merge entries when logged in
	useEffect(() => {
		if (isLoggedIn) {
			async function fetchEntries() {
				try {
					const entries = await getJournalEntries();
					// Sort entries by date in descending order
					const sortedEntries = entries.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

					setJournalEntries((prevEntries) => {
						// Merge fetched entries with existing entries
						const mergedEntries = [...prevEntries, ...sortedEntries];
						// Remove duplicates based on entry id
						const uniqueEntries = mergedEntries.filter((entry, index, self) => index === self.findIndex((e) => e.id === entry.id));
						// Sort entries by date in descending order
						return uniqueEntries.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
					});
				} catch (error) {
					console.error("Error fetching entries:", error);
				}
			}
			fetchEntries();
		}
	}, [isLoggedIn]);

	const handleEntryPress = (entry) => {
		setSelectedEntry(entry);
		setModalVisible(true);
	};

	const handleModalDismiss = () => {
		setSelectedEntry(null);
		setModalVisible(false);
	};

	const handleSaveEntry = (updatedEntry) => {
		console.log("Saving Entry:", updatedEntry);
		setJournalEntries((prevEntries) => {
			const existingIndex = prevEntries.findIndex((entry) => entry.id === updatedEntry.id);
			let updatedEntries;
			if (existingIndex !== -1) {
				// Update existing entry
				updatedEntries = [...prevEntries];
				updatedEntries[existingIndex] = updatedEntry;
			} else {
				// Add new entry
				updatedEntries = [updatedEntry, ...prevEntries];
			}
			// Remove duplicates by ID and sort by date
			const uniqueEntries = updatedEntries.filter((entry, index, self) => index === self.findIndex((e) => e.id === entry.id));
			return uniqueEntries.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
		});
		handleModalDismiss();
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
									key={index.toString()}
									entry={entry}
									onPress={() => handleEntryPress(entry)}
									searchQuery={searchQuery}
								/>
							))}
						</ThemedView>
					</ParallaxScrollView>
					<JournalEntryModal visible={modalVisible} onDismiss={handleModalDismiss} onSave={handleSaveEntry} entry={selectedEntry} />
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
