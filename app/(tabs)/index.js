import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import AvatarButton from "@/components/Avatar";
import JournalEntryModal from "@/components/JournalEntryModal";
import StatisticsModal from "@/components/StatisticsModal"; // Import the StatisticsModal component
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function HomeScreen({ journalEntries: initialEntries }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [statisticsModalVisible, setStatisticsModalVisible] = useState(false); // State for StatisticsModal visibility
	const [searchQuery, setSearchQuery] = useState("");
	const [forceRender, setForceRender] = useState(false);

	useEffect(() => {
		setJournalEntries(initialEntries);
		setForceRender((prev) => !prev); // Force re-render when entries change
	}, [initialEntries]);

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

		const existingIndex = journalEntries.findIndex((entry) => entry.id === updatedEntry.id);

		if (existingIndex !== -1) {
			// Update existing entry
			setJournalEntries((prevEntries) => {
				prevEntries[existingIndex] = updatedEntry;
				return [...prevEntries];
			});
		} else {
			// Add new entry
			setJournalEntries((prevEntries) => [...prevEntries, updatedEntry]);
		}

		handleModalDismiss();
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	console.log("All Entries:", journalEntries);
	console.log("Search Query:", searchQuery);

	const filteredEntries = journalEntries.filter(
		(entry) =>
			entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
			searchQuery === ""
	);

	console.log("Filtered Entries:", filteredEntries);

	return (
		<Provider>
			<View style={{ flex: 1 }}>
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
					headerImage={<Image source={require("@/assets/images/emotions.jpg")} style={styles.headerImage} />}
				>
					<ThemedView style={styles.cardContainer}>
						<SearchBar onChangeText={handleSearch} value={searchQuery} />
						{filteredEntries.map((entry, index) => {
							console.log("Rendering Card for Entry:", entry);
							return (
								<CardComponent
									key={index.toString()}
									entry={entry}
									onPress={() => handleEntryPress(entry)}
									searchQuery={searchQuery}
								/>
							);
						})}
					</ThemedView>
				</ParallaxScrollView>
				<JournalEntryModal visible={modalVisible} onDismiss={handleModalDismiss} onSave={handleSaveEntry} entry={selectedEntry} />
				<StatisticsModal
					visible={statisticsModalVisible}
					onDismiss={() => setStatisticsModalVisible(false)}
					journalEntries={journalEntries}
				/>
			</View>
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
