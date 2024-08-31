import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const SearchBar = ({ onChangeText, value }) => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} placeholder="Search..." onChangeText={onChangeText} value={value} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// padding: 10,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 12,
		paddingLeft: 10,
	},
});

export default SearchBar;
