import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const items = [
	{ name: "Happy", id: 1 },
	{ name: "Sad", id: 2 },
	{ name: "Angry", id: 3 },
	{ name: "Melancholy", id: 4 },
	{ name: "Tired", id: 5 },
];

export default function SelectMenu () {
	const [selectedItems, setSelectedItems] = useState([]);
	console.log("Selected:", selectedItems);

	return (
		<View style={styles.container}>
			<View>
				<SectionedMultiSelect
					items={items}
					IconRenderer={Icon}
					uniqueKey="id"
					onSelectedItemsChange={setSelectedItems}
					selectedItems={selectedItems}
					selectText="Mood"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// padding: 8,
	},
});
