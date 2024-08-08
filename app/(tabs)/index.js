import React from "react";
import { Image, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import CardComponent from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { Provider } from "react-native-paper";
import AvatarButton from "@/components/Avatar";

export default function HomeScreen({ journalEntries }) {
	return (
		<Provider>
			<View style={{ flex: 1 }}>
				<AvatarButton />
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
					headerImage={<Image source={require("@/assets/images/emotions.jpg")} style={styles.headerImage} />}
				>
					<ThemedView style={styles.cardContainer}>
						<SearchBar />
						{journalEntries.map((entry, index) => (
							<CardComponent key={index} entry={entry} />
						))}
					</ThemedView>
				</ParallaxScrollView>
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
