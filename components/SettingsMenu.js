import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, Text, View, Alert, Animated, Easing, Platform, TouchableOpacity } from "react-native";
import { Modal, Avatar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons"; 
import * as ImagePicker from "expo-image-picker"; 

const SettingsMenu = ({ visible, onDismiss }) => {
	const slideAnim = useRef(new Animated.Value(0)).current;
	const [profileImage, setProfileImage] = useState("https://example.com/profile.jpg");

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

	const handleImagePicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	const renderLinkWithDivider = (text, onPress, iconName) => (
		<View key={text} style={styles.linkContainer}>
			<TouchableOpacity onPress={onPress} style={styles.link}>
				<AntDesign name={iconName} size={24} color="black" style={styles.icon} />
				<Text style={styles.linkText}>{text}</Text>
			</TouchableOpacity>
			<View style={styles.divider} />
		</View>
	);

	return (
		<>
			<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
				<Animated.View style={containerStyle}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
							<View style={styles.avatarContainer}>
								<Avatar.Image size={80} source={{ uri: profileImage }} />
							</View>
							{renderLinkWithDivider("Profile Photo", handleImagePicker, "user")}
							{renderLinkWithDivider("FAQ", () => Alert.alert("FAQ pressed"), "link")}
							{renderLinkWithDivider("Logout", () => Alert.alert("Logout pressed"), "logout")}
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
	avatarContainer: {
		alignItems: "flex-start",
		marginBottom: 20,
	},
	linkContainer: {
		width: "100%",
		alignItems: "center",
	},
	link: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	icon: {
		marginRight: 10,
	},
	linkText: {
		fontSize: 18,
		color: "black",
		paddingVertical: 10,
	},
	divider: {
		height: 1,
		backgroundColor: "#ccc",
		marginVertical: 10,
		width: "90%", 
	},
});

export default SettingsMenu;
