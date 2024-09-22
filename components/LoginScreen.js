import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from "react-native";
import { TextInput, Button, Text, Surface, useTheme } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { Video } from "expo-av";


const { width, height } = Dimensions.get("window");
const LoginScreen = ({ onLogin }) => {
	const auth = getAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [error, setError] = useState("");
	const { colors } = useTheme();

	const sendTokenToBackend = async (idToken) => {
		try {
			const response = await axios.post("http://192.168.1.161:8080/api/auth/login", {
				token: idToken,
			});
			console.log("Backend response:", response.data);
		} catch (error) {
			console.error("Error sending token to backend:", error);
			setError("Failed to authenticate with backend");
		}
	};

	const handleLogin = async () => {
		setError("");
		try {
			let userCredential;
			if (isRegistering) {
				userCredential = await createUserWithEmailAndPassword(auth, email, password);
				console.log("User registered:", userCredential.user);
			} else {
				userCredential = await signInWithEmailAndPassword(auth, email, password);
				console.log("User signed in:", userCredential.user);
			}

			const idToken = await userCredential.user.getIdToken();
			await sendTokenToBackend(idToken);

			if (onLogin) onLogin();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<Video
				source={require("../assets/images/testvideo.mp4")} // Replace with your video file path
				style={styles.backgroundVideo}
				resizeMode="cover"
				shouldPlay
				isLooping
				isMuted
			/>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
				<ScrollView contentContainerStyle={styles.scrollView}>
					<Surface style={styles.surface}>
						<Text style={styles.title}>Welcome to Journalized.AI</Text>
						<Text style={styles.subtitle}>{isRegistering ? "Create an account" : "Sign in to your account"}</Text>

						{error ? <Text style={styles.errorText}>{error}</Text> : null}

						<TextInput
							label="Email"
							value={email}
							onChangeText={setEmail}
							mode="outlined"
							keyboardType="email-address"
							autoCapitalize="none"
							style={styles.input}
						/>
						<TextInput
							label="Password"
							value={password}
							onChangeText={setPassword}
							mode="outlined"
							secureTextEntry
							style={styles.input}
						/>

						<Button
							mode="contained"
							onPress={handleLogin}
							contentStyle={styles.buttonContent}
							labelStyle={styles.buttonLabel}
							style={styles.button}
						>
							{isRegistering ? "Register" : "Login"}
						</Button>

						<Button mode="text" onPress={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
							{isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
						</Button>
					</Surface>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundVideo: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		width,
		height,
	},
	content: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	scrollView: {
		flexGrow: 1,
		justifyContent: "center",
		padding: 20,
	},
	surface: {
		padding: 20,
		elevation: 4,
		borderRadius: 8,
		backgroundColor: "rgba(255, 255, 255, 0.9)",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
		textAlign: "center",
		color: "black",
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		color: "#666",
	},
	input: {
		marginBottom: 12,
		backgroundColor: "white",
	},
	button: {
		marginTop: 16,
		marginBottom: 8,
	},
	toggleButton: {
		marginTop: 8,
	},
	errorText: {
		color: "red",
		marginBottom: 12,
		textAlign: "center",
	},
	buttonContent: {
		paddingHorizontal: 16, 
		paddingVertical: 3, 
	},
	buttonLabel: {
		fontSize: 16, 
	},
});

export default LoginScreen;
