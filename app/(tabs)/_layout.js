import React, { useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JournalEntryModal from "@/components/JournalEntryModal";
import HomeScreen from ".";
import { Colors } from "@/constants/Colors";
import SettingsMenu from "@/components/SettingsMenu";


const Tabs = createBottomTabNavigator();

export default function TabLayout() {
	const [journalModalVisible, setJournalModalVisible] = useState(false);
	const [settingsModalVisible, setSettingsModalVisible] = useState(false);
	const [journalEntries, setJournalEntries] = useState([]);

	const toggleJournalModal = useCallback(() => {
		setJournalModalVisible((prev) => !prev);
	}, []);

	const toggleSettingsModal = useCallback(() => {
		setSettingsModalVisible((prev) => !prev);
	}, []);

	const handleSaveEntry = useCallback(
		(newEntry) => {
			setJournalEntries((prevEntries) => [newEntry, ...prevEntries]);
			toggleJournalModal();
		},
		[toggleJournalModal]
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
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color, focused }) => <AntDesign name="setting" size={24} color={color} />,
						tabBarButton: (props) => <TouchableOpacity {...props} onPress={toggleSettingsModal} />,
					}}
				>
					{() => null}
				</Tabs.Screen>
				<Tabs.Screen
					name="index"
					options={{
						title: "Add",
						tabBarIcon: ({ color, focused }) => (
							<TouchableOpacity onPress={toggleJournalModal}>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				>
					{(props) => <HomeScreen {...props} journalEntries={journalEntries} />}
				</Tabs.Screen>
				<Tabs.Screen
					name="stats"
					options={{
						title: "Stats",
						tabBarIcon: ({ color, focused }) => <AntDesign name="linechart" size={24} color={color} />,
					}}
				>
					{(props) => <StatsScreen {...props} />}
				</Tabs.Screen>
			</Tabs.Navigator>
			<JournalEntryModal visible={journalModalVisible} onDismiss={toggleJournalModal} onSave={handleSaveEntry} />
			<SettingsMenu visible={settingsModalVisible} onDismiss={toggleSettingsModal} />
		</>
	);
}
