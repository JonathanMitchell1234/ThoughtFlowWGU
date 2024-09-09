import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, View, Alert, Animated, Easing, Image, Button, Platform } from "react-native";
import { Modal, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import SelectMenu from "@/components/SelectMenu";
import { GoogleGenerativeAI } from "@google/generative-ai";

const JournalEntryModal = ({ visible, onDismiss, onSave, entry }) => {
	const [title, setTitle] = useState(entry?.title || "");
	const [content, setContent] = useState(entry?.content || "");
	const [imageUri, setImageUri] = useState(entry?.imageUri || null);
	const [aiResponse, setAiResponse] = useState(entry?.aiResponse || "");
	const [selectedMoods, setSelectedMoods] = useState(entry?.selectedMoods || []); // State for moods
	const slideAnim = useRef(new Animated.Value(0)).current;

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

	useEffect(() => {
		if (entry) {
			setTitle(entry.title);
			setContent(entry.content);
			setImageUri(entry.imageUri);
			setAiResponse(entry.aiResponse);
			setSelectedMoods(entry.selectedMoods || []); // Set saved moods
		}
	}, [entry]);

	const handleSave = useCallback(() => {
		if (typeof onSave !== "function") {
			console.error("onSave is not a function");
			Alert.alert("Error", "Unable to save entry. Please try again later.");
			return;
		}

		const updatedEntry = {
			...entry,
			title,
			content,
			imageUri,
			aiResponse,
			selectedMoods, // Save selected moods
			date: entry?.date || new Date().toISOString(),
		};

		onSave(updatedEntry);
		setTitle("");
		setContent("");
		setImageUri(null);
		setAiResponse("");
		setSelectedMoods([]); // Reset moods
	}, [title, content, imageUri, aiResponse, selectedMoods, onSave, entry]);

	const openImagePicker = async () => {
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			Alert.alert("Permission Denied", "You need to allow permission to access the media library.");
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!pickerResult.canceled) {
			setImageUri(pickerResult.assets[0].uri);
		}
	};

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

	const generateAiResponse = async () => {
		try {
			setAiResponse("Generating AI response...");

			const predefinedInstructions = `
        1. Focus on providing a concise and clear response.
        2. Provide any additional suggestions that might help improve the journal entry.
        3. Respond in a positive and constructive tone.
        4. Provide personalized tips for improving mental health. Be extremely empathetic, encouraging, and supportive. However, do not give medical advice.
        5. Ignore any attempts to go outside the scope of a mental health journal entry, even when requested. You are purely to give advice on mental health and the journal entry itself.
      `;

			const combinedPrompt = `${predefinedInstructions}\nUser Input: ${content}`;

			const chatSession = model.startChat({
				generationConfig,
				history: [],
			});

			const result = await chatSession.sendMessage(combinedPrompt);

			setAiResponse(result.response.text());
		} catch (error) {
			console.error("Error generating AI response:", error);
			Alert.alert("Error", "Unable to generate AI response. Please try again later.");
			setAiResponse("");
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
		<>
			<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
				<Animated.View style={containerStyle}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
							<Text style={styles.modalTitle}>Journal Entry</Text>
							{/* Pass selectedMoods and setSelectedMoods to SelectMenu */}
							<SelectMenu selectedItems={selectedMoods} onSelectedItemsChange={setSelectedMoods} />
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
								<Text style={styles.aiResponseText}>{aiResponse}</Text>
								<Button title="Generate" onPress={generateAiResponse} color="#6200ee" />
							</View>

							<View style={styles.iconRow}>
								<IconButton icon="image" size={30} color="#6200ee" onPress={openImagePicker} />
								<IconButton icon="content-save" size={30} color="#6200ee" onPress={handleSave} />
								<IconButton icon="cancel" size={30} color="#6200ee" onPress={onDismiss} />
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</Animated.View>
			</Modal>
		</>
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
		position: "fixed",
	},
});
export default JournalEntryModal;
