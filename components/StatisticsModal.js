import React, { useEffect, useRef } from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	TextInput,
	Text,
	View,
	Alert,
	Animated,
	Easing,
	Image,
	Button,
	Platform,
	TouchableOpacity,
} from "react-native";
import { Modal, IconButton } from "react-native-paper";

const StatisticsModal = ({ visible, onDismiss }) => {
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
		<>
			<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
				<Animated.View style={containerStyle}>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <Text style={styles.modalTitle}>Statistics</Text>
                            <View style={styles.iconRow}>
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
	linkText: {
		fontSize: 18,
		color: "black",
		paddingVertical: 10,
	},
	divider: {
		height: 1,
		backgroundColor: "#ccc",
		marginVertical: 10,
		width: "80%",
	},
});

export default StatisticsModal;
