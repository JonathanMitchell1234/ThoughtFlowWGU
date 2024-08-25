import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import AvatarButton from "@/components/Avatar";
import JournalEntryModal from "@/components/JournalEntryModal"; // Import the modal

export default function HomeScreen({ journalEntries: initialEntries }) {
	const [journalEntries, setJournalEntries] = useState(initialEntries);
	const [selectedEntry, setSelectedEntry] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const handleEntryPress = (entry) => {
		setSelectedEntry(entry);
		setModalVisible(true);
	};

	const handleModalDismiss = () => {
		setSelectedEntry(null);
		setModalVisible(false);
	};

	const handleSaveEntry = (updatedEntry) => {
		const updatedEntries = journalEntries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry));
		setJournalEntries(updatedEntries);
		handleModalDismiss();
	};

	return (
		<Provider>
			<View style={{ flex: 1 }}>
				{/* <AvatarButton /> */}
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
					headerImage={<Image source={require("@/assets/images/emotions.jpg")} style={styles.headerImage} />}
				>
					<ThemedView style={styles.cardContainer}>
						<SearchBar />
						{journalEntries.map((entry, index) => (
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
