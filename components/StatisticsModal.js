import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, View, Animated, Easing, Platform } from "react-native";
import { Modal, IconButton } from "react-native-paper";

const stopWords = [
	"the",
	"and",
	"is",
	"in",
	"it",
	"of",
	"to",
	"a",
	"on",
	"that",
	"at",
	"i",
	"for",
	"was",
	"with",
	"not",
	"as",
	"you",
	"your",
	"his",
	"her",
	"its",
	"our",
	"their",
	"this",
	"that",
	"these",
	"those",
	"am",
	"are",
	"was",
	"were",
	"be",
	"been",
	"being",
	"have",
	"has",
	"had",
	"having",
	"do",
	"does",
	"did",
	"doing",
	"can",
	"could",
	"may",
	"might",
	"must",
	"shall",
	"should",
	"will",
	"would",
	"should",
	"could",
	"would",
	"can",
	"may",
	"must",
	"ought",
	"shall",
	"will",
	"me",
	"my",
	"myself",
	"we",
	"our",
	"ours",
	"ourselves",
	"you",
	"your",
	"yours",
	"yourself",
	"yourselves",
	"he",
	"him",
	"himself",
	"she",
	"her",
	"hers",
	"herself",
	"it",
	"its",
	"itself",
	"they",
	"them",
	"their",
	"theirs",
	"themselves",
	"what",
	"which",
	"who",
	"whom",
	"whose",
	"this",
	"that",
	"these",
	"those",
	"here",
	"there",
	"when",
	"where",
	"why",
	"how",
	"all",
	"any",
	"both",
	"each",
	"few",
	"more",
	"most",
	"other",
	"some",
	"such",
	"no",
	"nor",
	"not",
	"only",
	"own",
	"same",
	"so",
	"than",
	"too",
	"very",
	"just",
	"but",
	"also",
	"because",
	"since",
	"until",
	"while",
	"after",
	"before",
	"again",
	"further",
	"however",
	"indeed",
	"never",
	"otherwise",
	"therefore",
	"then",
	"thus",
	"up",
	"down",
	"in",
	"out",
	"on",
	"off",
	"over",
	"under",
	"again",
	"further",
	"however",
	"indeed",
	"never",
	"otherwise",
	"therefore",
	"then",
	"thus",
	"up",
	"down",
	"in",
	"out",
	"on",
	"off",
	"over",
	"under",
	"above",
	"below",
	"to",
	"from",
	"through",
	"with",
	"without",
	"for",
	"in",
	"of",
	"off",
	"on",
	"out",
	"over",
	"to",
	"under",
	"up",
	"down",
	"into",
	"onto",
	"out of",
	"off of",
	"into",
	"onto",
	"out of",
	"off of",
	"about",
	"across",
	"along",
	"around",
	"behind",
	"beside",
	"between",
	"beyond",
	"by",
	"for",
	"from",
	"in",
	"near",
	"of",
	"off",
	"on",
	"out",
	"over",
	"through",
	"under",
	"until",
	"with",
	"against",
	"among",
	"at",
	"by",
	"for",
	"from",
	"in",
	"near",
	"of",
	"off",
	"on",
	"out",
	"over",
	"through",
	"under",
	"until",
	"with",
].map((word) => word.toLowerCase());

const moodItems = [
	{ name: "Affectionate", id: 36 },
	{ name: "Angry", id: 3 },
	{ name: "Anxious", id: 7 },
	{ name: "Apathetic", id: 43 },
	{ name: "Ashamed", id: 32 },
	{ name: "Bewildered", id: 37 },
	{ name: "Bored", id: 13 },
	{ name: "Calm", id: 19 },
	{ name: "Cheerful", id: 35 },
	{ name: "Confident", id: 10 },
	{ name: "Confused", id: 51 },
	{ name: "Content", id: 8 },
	{ name: "Curious", id: 21 },
	{ name: "Defeated", id: 46 },
	{ name: "Determined", id: 53 },
	{ name: "Detached", id: 52 },
	{ name: "Disappointed", id: 22 },
	{ name: "Disgusted", id: 55 },
	{ name: "Eager", id: 38 },
	{ name: "Elated", id: 50 },
	{ name: "Embarrassed", id: 26 },
	{ name: "Empathetic", id: 45 },
	{ name: "Envious", id: 48 },
	{ name: "Excited", id: 6 },
	{ name: "Fearful", id: 54 },
	{ name: "Frustrated", id: 9 },
	{ name: "Furious", id: 47 },
	{ name: "Grateful", id: 25 },
	{ name: "Guilty", id: 17 },
	{ name: "Happy", id: 1 },
	{ name: "Helpless", id: 39 },
	{ name: "Hopeful", id: 14 },
	{ name: "Impatient", id: 28 },
	{ name: "Indifferent", id: 41 },
	{ name: "Insecure", id: 30 },
	{ name: "Inspired", id: 12 },
	{ name: "Jealous", id: 24 },
	{ name: "Lonely", id: 23 },
	{ name: "Melancholy", id: 4 },
	{ name: "Motivated", id: 31 },
	{ name: "Nervous", id: 11 },
	{ name: "Optimistic", id: 27 },
	{ name: "Overwhelmed", id: 29 },
	{ name: "Peaceful", id: 34 },
	{ name: "Proud", id: 16 },
	{ name: "Regretful", id: 33 },
	{ name: "Relieved", id: 15 },
	{ name: "Sad", id: 2 },
	{ name: "Shocked", id: 42 },
	{ name: "Stressed", id: 18 },
	{ name: "Surprised", id: 20 },
	{ name: "Suspicious", id: 40 },
	{ name: "Sympathetic", id: 49 },
	{ name: "Tired", id: 5 },
	{ name: "Worried", id: 44 },
];

// Create a lookup object for mood names
const moodLookup = moodItems.reduce((acc, mood) => {
	acc[mood.id] = mood.name;
	return acc;
}, {});

const StatisticsModal = ({ visible, onDismiss, journalEntries }) => {
	const slideAnim = useRef(new Animated.Value(0)).current;
	const [commonMoods, setCommonMoods] = useState([]);
	const [commonWords, setCommonWords] = useState([]);

	// Function to count the most common moods
	const calculateMostCommonMoods = (entries) => {
		const moodCount = {};
		entries.forEach((entry) => {
			// Ensure selectedMoods is defined and an array
			if (Array.isArray(entry.selectedMoods)) {
				entry.selectedMoods.forEach((mood) => {
					moodCount[mood] = (moodCount[mood] || 0) + 1;
				});
			}
		});
		const sortedMoods = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
		return sortedMoods.slice(0, 5); // Get top 3 moods
	};

	// Function to count the most common words
	const calculateMostCommonWords = (entries) => {
		const wordCount = {};
		entries.forEach((entry) => {
			if (entry.content) {
				const words = entry.content
					.toLowerCase()
					.replace(/[^\w\s]/g, "")
					.split(/\s+/);
				words
					.filter((word) => !stopWords.includes(word))
					.forEach((word) => {
						wordCount[word] = (wordCount[word] || 0) + 1;
					});
			}
		});
		const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]);
		return sortedWords.slice(0, 5);
	};

	useEffect(() => {
		if (journalEntries && journalEntries.length > 0) {
			setCommonMoods(calculateMostCommonMoods(journalEntries));
			setCommonWords(calculateMostCommonWords(journalEntries));
		}
	}, [journalEntries]);

	useEffect(() => {
		if (visible) {
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 300,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		}
	}, [visible, slideAnim]);

	const containerStyle = {
		backgroundColor: "white",
		padding: 20,
		margin: "auto",
		borderRadius: 10,
		width: "98%",
		height: "98%",
		transform: [
			{
				translateY: slideAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [500, 0],
				}),
			},
		],
	};

	return (
		<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
			<Animated.View style={containerStyle}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
						<Text style={styles.modalTitle}>Statistics</Text>
						<View style={styles.statSection}>
							<Text style={styles.sectionTitle}>Top 5 Moods</Text>
							<View style={styles.table}>
								<View style={styles.tableRow}>
									<Text style={styles.tableHeader}>Mood</Text>
									<Text style={styles.tableHeader}>Count</Text>
								</View>
								{commonMoods.map(([moodId, count], index) => (
									<View key={index} style={styles.tableRow}>
										<Text style={styles.tableCell}>{moodLookup[moodId]}</Text>
										<Text style={styles.tableCell}>{count}</Text>
									</View>
								))}
							</View>
						</View>
						<View style={styles.statSection}>
							<Text style={styles.sectionTitle}>Top 5 Words</Text>
							<View style={styles.table}>
								<View style={styles.tableRow}>
									<Text style={styles.tableHeader}>Word</Text>
									<Text style={styles.tableHeader}>Count</Text>
								</View>
								{commonWords.map(([word, count], index) => (
									<View key={index} style={styles.tableRow}>
										<Text style={styles.tableCell}>{word}</Text>
										<Text style={styles.tableCell}>{count}</Text>
									</View>
								))}
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Animated.View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 45,
		marginBottom: 7,
		fontWeight: "bold",
	},
	iconRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	statSection: {
		marginVertical: 20,
	},
	sectionTitle: {
		fontSize: 38,
		fontWeight: "bold",
		marginBottom: 10,
	},
	table: {
		borderWidth: 1,
		borderColor: "#ddd",
	},
	tableRow: {
		flexDirection: "row",
	},
	tableHeader: {
		flex: 1,
		fontWeight: "bold",
		padding: 10,
		backgroundColor: "#f0f0f0",
	},
	tableCell: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ddd",
	},
});

export default StatisticsModal;
