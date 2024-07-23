import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Text, TouchableOpacity, Platform } from "react-native";
import { Modal } from "react-native-paper";



const JournalEntryModal = ({ visible, onDismiss }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSave = () => {
		// Handle saving the journal entry
		console.log("Title:", title);
		console.log("Content:", content);
		onDismiss();
	};

	const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 10 };

	return (
		<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
			<KeyboardAvoidingView behavior="padding">
				<ScrollView>
					<Text style={styles.modalTitle}>Journal Entry</Text>
					<TextInput placeholder="Title" value={title} onChangeText={(text) => setTitle(text)} style={styles.input} />
					<TextInput
						placeholder="Content"
						value={content}
						onChangeText={(text) => setContent(text)}
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
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalTitle: {
		fontSize: 24,
		marginBottom: 20,
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
		height: 450,
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
