import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JournalEntryModal from "@/components/JournalEntryModal"; // Adjust the import path as necessary
import HomeScreen from "."; // Replace with your actual screen component
import { Colors } from "@/constants/Colors"; // Adjust the import path as necessary

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
	const [modalVisible, setModalVisible] = useState(false);

	// Method to toggle the modal visibility
	const toggleModal = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<>
			<Tabs.Navigator
				screenOptions={{
					tabBarActiveTintColor: Colors["light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					component={HomeScreen}
					options={{
						title: "Add",
						tabBarIcon: ({ color, focused }) => (
							<TouchableOpacity onPress={toggleModal}>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				/>
			</Tabs.Navigator>
			<JournalEntryModal visible={modalVisible} onDismiss={toggleModal} />
		</>
	);
}
