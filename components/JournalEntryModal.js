import React, { useState, useCallback, useEffect, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, TouchableOpacity, Platform, Alert, Animated, Easing } from "react-native";
import { Modal } from "react-native-paper";
import SelectMenu from "@/components/SelectMenu";

const JournalEntryModal = ({ visible, onDismiss, onSave }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
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
			date: new Date().toISOString(),
		};

		onSave(newEntry);
		setTitle("");
		setContent("");
	}, [title, content, onSave]);

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
						<TouchableOpacity onPress={handleSave} style={styles.button}>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onDismiss} style={styles.button}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
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
	button: {
		backgroundColor: "#6200ee",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});

export default JournalEntryModal;
