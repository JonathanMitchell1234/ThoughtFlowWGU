import * as React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="brain" />;

const CardComponent = ({ entry, onPress, searchQuery }) => {
	console.log("Rendering Card Component for Entry:", entry);
	console.log("Entry Title:", entry.title);
	console.log("Entry Content:", entry.content);
	console.log("Image URI:", entry.imageUri); // Log image URI
	console.log("AI Response:", entry.aiResponse); // Log AI response
	console.log("Selected Moods:", entry.selectedMoods); // Log selected moods

	const date = new Date(entry.dateCreated);
	const formattedDate = date.toLocaleDateString();


	return (
		<TouchableOpacity onPress={onPress}>
			<Card style={styles.card}>
				<Card.Title title={entry.title} subtitle={<Text>{formattedDate}</Text>} left={LeftContent} />
				<Card.Content>
					{entry.imageUri && <Image source={{ uri: entry.imageUri }} style={styles.image} resizeMode="cover" />}
					<Text numberOfLines={3} ellipsizeMode="tail">
						{entry.content}
					</Text>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 10,
	},
	image: {
		width: "100%",
		height: 200,
		borderRadius: 10,
		marginBottom: 10,
	},
});

export default CardComponent;
