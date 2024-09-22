import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, View, Alert, Animated, Easing, Image, Button, Platform } from "react-native";
import { Modal, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import SelectMenu from "@/components/SelectMenu";
import { createJournalEntry, updateJournalEntry, deleteJournalEntry } from "../journalApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from "react-native-markdown-display";

const JournalEntryModal = ({ visible, onDismiss, onSave, onDelete, entry }) => {
	const [title, setTitle] = useState(entry?.title || "");
	const [content, setContent] = useState(entry?.content || "");
	const [imageUri, setImageUri] = useState(entry?.imageUri || null);
	const [aiResponse, setAiResponse] = useState(entry?.aiResponse || "No AI response yet.");
	const [selectedMoods, setSelectedMoods] = useState(entry?.selectedMoods || []);
	const slideAnim = useRef(new Animated.Value(0)).current;

	// Initialize the AI model
	const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
	const genAI = new GoogleGenerativeAI(apiKey);

	const model = genAI.getGenerativeModel({
		model: "gemini-1.0-pro",
	});

	const generationConfig = {
		temperature: 0.9,
		topP: 1,
		maxOutputTokens: 2048,
		responseMimeType: "text/plain",
	};

	useEffect(() => {
		if (visible) {
			Animated.timing(slideAnim, {
				toValue: 1,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(slideAnim, {
				toValue: 0,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		}
	}, [visible, slideAnim]);

	useEffect(() => {
		if (entry) {
			setTitle(entry.title);
			setContent(entry.content);
			setImageUri(entry.imageUri);
			setAiResponse(entry.aiResponse || "No AI response yet.");
			// Map selectedMoods to an array of mood names
			const moodNames = entry.selectedMoods ? [...entry.selectedMoods] : [];
			setSelectedMoods(moodNames);
			setSelectedMoods(moodNames);
		} else {
			resetFields();
		}
	}, [entry]);

	const resetFields = () => {
		setTitle("");
		setContent("");
		setImageUri(null);
		setAiResponse("No AI response yet.");
		setSelectedMoods([]);
	};

	// Function to save the journal entry
	const handleSave = async () => {
		console.log("Updated Entry Object:", JSON.stringify(updatedEntry));

		const updatedEntry = {
			id: entry ? entry.id : null,
			title,
			content,
			imageUri,
			aiResponse,
			mood: selectedMoods,
			dateCreated: new Date().toISOString(),
		};

		console.log("Updated Entry Object:", updatedEntry);

		try {
			if (entry && entry.id) {
				await updateJournalEntry(entry.id, updatedEntry);
			} else {
				await createJournalEntry(updatedEntry);
			}
			onSave(updatedEntry);
			resetFields(); // Reset fields after saving
			onDismiss(); // Close the modal
		} catch (error) {
			console.error("Error saving entry:", error);
		}
	};

	// Function to delete the journal entry
	const handleDelete = useCallback(async () => {
		if (entry && typeof onDelete === "function") {
			Alert.alert(
				"Delete Entry",
				"Are you sure you want to delete this entry?",
				[
					{ text: "Cancel", style: "cancel" },
					{
						text: "Delete",
						style: "destructive",
						onPress: async () => {
							try {
								await deleteJournalEntry(entry.id);
								onDelete(entry.id);
								resetFields(); // Reset fields after deleting
								onDismiss(); // Close the modal
							} catch (error) {
								console.error("Error deleting entry:", error);
							}
						},
					},
				],
				{ cancelable: true }
			);
		}
	}, [entry, onDelete]);

	// Image picker functionality
	const openImagePicker = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permissionResult.granted) {
			Alert.alert("Permission Denied", "You need to allow permission to access the media library.");
			return;
		}
		const pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log("Picker Result:", pickerResult);

		if (!pickerResult.canceled) {
			setImageUri(pickerResult.assets[0].uri);
			console.log("Image URI:", pickerResult.assets[0].uri);
		}
	};

	// AI response generation functionality
	const generateAiResponse = async () => {
		try {
			setAiResponse("Generating AI response...");

			const predefinedInstructions = `
            1. Provide a concise and clear response.
            2. Suggestions to improve journal entry.
            3. Positive, encouraging tone.
            4. Focus on mental health advice (no medical advice).
        `;
			const combinedPrompt = `${predefinedInstructions}\nUser Input: ${content}`;
			const chatSession = model.startChat({ generationConfig, history: [] });
			const result = await chatSession.sendMessage(combinedPrompt);

			const responseText = await result.response.text();

			console.log("AI Response:", responseText); // Log the AI response text

			setAiResponse(responseText || "AI response is empty.");
		} catch (error) {
			console.error("Error generating AI response:", error);
			Alert.alert("Error", "Unable to generate AI response. Please try again later.");
			setAiResponse("No AI response yet.");
		}
	};

	const containerStyle = {
		backgroundColor: "white",
		padding: 20,
		margin: "auto",
		borderRadius: 10,
		width: "98%",
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
						<IconButton icon="arrow-left" size={30} onPress={onDismiss} style={{ paddingRight: 20 }} />
						<Text style={styles.modalTitle}>Journal Entry</Text>
						<SelectMenu
							selectedItems={selectedMoods}
							onSelectedItemsChange={(newMoods) => {
								console.log("Selected Moods:", newMoods);

								if (newMoods && newMoods.length > 0) {
									console.log("Valid Selected Moods:", newMoods);
									setSelectedMoods(newMoods);
								} else {
									setSelectedMoods([]);
								}
							}}
						/>

						<TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
						<TextInput
							placeholder="Content"
							value={content}
							onChangeText={setContent}
							multiline
							style={[styles.input, styles.contentInput]}
						/>
						{imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
						<View style={styles.aiResponseContainer}>
							<View style={styles.aiResponseHeader}>
								<Text style={styles.aiResponseLabel}>AI Suggestions/Responses</Text>
								<IconButton icon="robot" size={30} color="#6200ee" onPress={generateAiResponse} style={styles.generateIcon} />
							</View>
							<Markdown>{aiResponse}</Markdown>
							<Button title="Generate" onPress={generateAiResponse} color="#6200ee" />
						</View>

						<View style={styles.iconRow}>
							<IconButton icon="image" size={30} color="#6200ee" onPress={openImagePicker} />
							<IconButton icon="content-save" size={30} color="#6200ee" onPress={handleSave} />
							<IconButton icon="cancel" size={30} color="#6200ee" onPress={onDismiss} />
							{entry && <IconButton icon="delete" size={30} color="#ee0000" onPress={handleDelete} />}
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
		fontSize: 24,
		marginBottom: 7,
	},
	input: {
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#f1ebff",
	},
	contentInput: {
		height: 350,
		textAlignVertical: "top",
	},
	image: {
		width: "100%",
		height: 100,
		marginTop: 10,
		borderRadius: 10,
	},
	aiResponseContainer: {
		marginVertical: 20,
		padding: 10,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		backgroundColor: "#f9f9f9",
	},
	aiResponseHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	aiResponseLabel: {
		fontSize: 16,
		fontWeight: "bold",
	},
	aiResponseText: {
		fontSize: 14,
		marginBottom: 10,
	},
	generateIcon: {
		margin: 0,
		padding: 0,
	},
	iconRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
});

export default JournalEntryModal;
