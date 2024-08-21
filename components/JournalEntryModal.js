import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, View, Alert, Animated, Easing, Image, Button, Platform } from "react-native";
import { Modal, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import SelectMenu from "@/components/SelectMenu";

const JournalEntryModal = ({ visible, onDismiss, onSave }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUri, setImageUri] = useState(null);
	const [aiResponse, setAiResponse] = useState(""); // State for AI response
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

	const handleSave = useCallback(() => {
		if (typeof onSave !== "function") {
			console.error("onSave is not a function");
			Alert.alert("Error", "Unable to save entry. Please try again later.");
			return;
		}

		const newEntry = {
			title,
			content,
			imageUri,
			aiResponse, // Include AI response in the saved entry
			date: new Date().toISOString(),
		};

		onSave(newEntry);
		setTitle("");
		setContent("");
		setImageUri(null);
		setAiResponse(""); // Clear AI response on save
	}, [title, content, imageUri, aiResponse, onSave]);

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

	const generateAiResponse = async () => {
		// Placeholder function to simulate generating AI response
		setAiResponse("AI-generated response based on your content.");
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
							<SelectMenu />
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
