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

export default function HomeScreen({ journalEntries: initialEntries, isLoggedIn, setIsLoggedIn, updateEntry, deleteEntry }) {
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const handleEntryPress = (entry) => {
		setSelectedEntry(entry);
		setModalVisible(true);
	};

	const handleModalDismiss = () => {
		setSelectedEntry(null);
		setModalVisible(false);
	};

	const handleDeleteEntry = async (deletedEntryId) => {
		try {
			await deleteEntry(deletedEntryId);
			// Optionally, you can update local state here if needed
		} catch (error) {
			console.error("Error deleting entry:", error);
		}
	};

	const handleSaveEntry = async (updatedEntry) => {
		try {
			// Update existing entry
			if (updatedEntry.id) {
				await updateEntry(updatedEntry);
			}
			// Removed handleModalDismiss(); since the modal is already closed
		} catch (error) {
			console.error("Error saving entry:", error);
		}
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredEntries = initialEntries.filter(
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
							{filteredEntries.map((entry) => (
								<CardComponent
									key={entry.id} // Use entry.id as key for better performance
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
						onDelete={handleDeleteEntry}
					/>
					<StatisticsModal
						visible={statisticsModalVisible}
						onDismiss={() => setStatisticsModalVisible(false)}
						journalEntries={initialEntries}
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
