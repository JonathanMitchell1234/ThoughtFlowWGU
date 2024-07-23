import React, { useState } from "react";
import { Image, StyleSheet, Platform, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider, Portal, Button, FAB } from "react-native-paper";
import JournalEntryModal from "@/components/JournalEntryModal";

export default function HomeScreen() {
	const [modalVisible, setModalVisible] = useState(false);


	return (
		<Provider>
			<View style={{ flex: 1 }}>
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
					headerImage={
						<Image
							source={require("@/assets/images/mentalhealth.jpeg")}
							style={{ width: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, height: "100" }}
						/>
					}
				>
					<ThemedView style={styles.cardContainer}>
						<SearchBar />
						<CardComponent />
						<CardComponent />
					</ThemedView>
				</ParallaxScrollView>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "100%",
		gap: 20,
		marginHorizontal: 0,
		gapHorizontal: 0,
    backgroundColor: "transparent",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
