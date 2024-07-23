import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="brain" />;

// const styles = StyleSheet.create({
// 	// Step 2: Create a style
// 	cardStyle: {
// 		width: "100%",
// 		alignSelf: "center",
// 	},
// });

const CardComponent = () => (
	<Card>
		<Card.Title title="Example Entry..." left={LeftContent} />
		<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
	</Card>
);



export default CardComponent;
