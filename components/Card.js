import * as React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="brain" />;

const CardComponent = ({ entry }) => (
	<Card style={styles.card}>
		<Card.Title title={entry.title} subtitle={new Date(entry.date).toLocaleDateString()} left={LeftContent} />
		<Card.Content>
			<Text numberOfLines={3} ellipsizeMode="tail">
				{entry.content}
			</Text>
		</Card.Content>
	</Card>
);

const styles = StyleSheet.create({
	card: {
		marginBottom: 10,
	},
});

export default CardComponent;
