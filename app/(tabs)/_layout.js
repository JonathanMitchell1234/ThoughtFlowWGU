import React, { useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JournalEntryModal from "@/components/JournalEntryModal";
import HomeScreen from ".";
import { Colors } from "@/constants/Colors";

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
	const [modalVisible, setModalVisible] = useState(false);
	const [journalEntries, setJournalEntries] = useState([]);

	const toggleModal = useCallback(() => {
		setModalVisible((prev) => !prev);
	}, []);

	const handleSaveEntry = useCallback(
		(newEntry) => {
			setJournalEntries((prevEntries) => [newEntry, ...prevEntries]);
			toggleModal();
		},
		[toggleModal]
	);

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
					options={{
						title: "Add",
						tabBarIcon: ({ color, focused }) => (
							<TouchableOpacity onPress={toggleModal}>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				>
					{(props) => <HomeScreen {...props} journalEntries={journalEntries} />}
				</Tabs.Screen>
			</Tabs.Navigator>
			<JournalEntryModal visible={modalVisible} onDismiss={toggleModal} onSave={handleSaveEntry} />
		</>
	);
}
