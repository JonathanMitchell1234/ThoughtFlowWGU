import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, View, Alert, Animated, Easing, Image, Platform } from "react-native";
import { Modal, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import SelectMenu from "@/components/SelectMenu";

const JournalEntryModal = ({ visible, onDismiss, onSave }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [imageUri, setImageUri] = useState(null);
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
			date: new Date().toISOString(),
		};

		onSave(newEntry);
		setTitle("");
		setContent("");
		setImageUri(null);
	}, [title, content, imageUri, onSave]);

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
	iconRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
		position: "fixed",
	},
});

export default JournalEntryModal;
