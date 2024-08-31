import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const AvatarButton = () => (
	<View style={styles.container}>
		<Avatar.Text size={44} label="XD" />
	</View>
);

const styles = StyleSheet.create({
	container: {
        display: "flex",
		position: "static",
		top: 0,
		right: 0,
		margin: "6.5%",
        zIndex: 999,
        marginBottom: -90,
	},
});

export default AvatarButton;
