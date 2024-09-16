import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import JournalEntryModal from "@/components/JournalEntryModal";
import StatisticsModal from "@/components/StatisticsModal";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { auth } from "@/firebaseConfig"; // Import your Firebase Auth instance
import LoginScreen from "@/components/LoginScreen";

export default function HomeScreen({ journalEntries: initialEntries }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [forceRender, setForceRender] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setJournalEntries(initialEntries);
		setForceRender((prev) => !prev); // Force re-render when entries change
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setIsLoggedIn(!!user); // Set isLoggedIn based on user object existence
		});

		return unsubscribe;
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

	const filteredEntries = journalEntries.filter(
		(entry) =>
			entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
							{filteredEntries.map((entry, index) => {
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
