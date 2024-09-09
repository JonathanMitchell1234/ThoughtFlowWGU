import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import AvatarButton from "@/components/Avatar";
import JournalEntryModal from "@/components/JournalEntryModal";

export default function HomeScreen({ journalEntries: initialEntries }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries); 
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState(""); 

	const handleEntryPress = (entry) => {
		setSelectedEntry(entry);
		setModalVisible(true);
	};

	const handleModalDismiss = () => {
		setSelectedEntry(null);
		setModalVisible(false);
	};

	const handleSaveEntry = (updatedEntry) => {
		setJournalEntries((prevEntries) => {
			const entryIndex = prevEntries.findIndex((entry) => entry.id === updatedEntry.id);
			if (entryIndex !== -1) {
				const updatedEntries = [...prevEntries];
				updatedEntries[entryIndex] = updatedEntry;
				return updatedEntries;
			}
			return prevEntries;
		});
		handleModalDismiss();
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const filteredEntries = journalEntries.filter(
		(entry) => entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || entry.content.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Provider>
			<View style={{ flex: 1 }}>
				{/* <AvatarButton /> */}
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
					headerImage={<Image source={require("@/assets/images/emotions.jpg")} style={styles.headerImage} />}
				>
					<ThemedView style={styles.cardContainer}>
						<SearchBar onChangeText={handleSearch} value={searchQuery} />
						{filteredEntries.map((entry, index) => (
							<CardComponent key={index} entry={entry} onPress={() => handleEntryPress(entry)} />
						))}
					</ThemedView>
				</ParallaxScrollView>
				<JournalEntryModal visible={modalVisible} onDismiss={handleModalDismiss} onSave={handleSaveEntry} entry={selectedEntry} />
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
