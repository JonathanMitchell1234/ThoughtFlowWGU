import React, { useState, useCallback, useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import JournalEntryModal from "@/components/JournalEntryModal";
import HomeScreen from ".";
import { Colors } from "@/constants/Colors";
import SettingsMenu from "@/components/SettingsMenu";
import StatisticsModal from "@/components/StatisticsModal";
import { getJournalEntries } from "@/journalApi";
import LoginScreen from "@/components/LoginScreen";

const Tabs = createBottomTabNavigator();

export default function TabLayout() {
	const [journalModalVisible, setJournalModalVisible] = useState(false);
	const [settingsModalVisible, setSettingsModalVisible] = useState(false);
	const [statsModalVisible, setStatsModalVisible] = useState(false);
	const [journalEntries, setJournalEntries] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const toggleJournalModal = useCallback(() => {
		setJournalModalVisible((prev) => !prev);
	}, []);

	const toggleSettingsModal = useCallback(() => {
		setSettingsModalVisible((prev) => !prev);
	}, []);

	const toggleStatsModal = useCallback(() => {
		setStatsModalVisible((prev) => !prev);
	}, []);

	const fetchEntries = useCallback(async () => {
		try {
			const entries = await getJournalEntries();
			if (!entries || !Array.isArray(entries)) {
				throw new Error("Invalid response from getJournalEntries");
			}
			const sortedEntries = entries.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
			setJournalEntries(sortedEntries);
		} catch (error) {
			console.error("Error fetching entries:", error);
		}
	}, []);

	const handleDeleteEntry = useCallback(
		async (deletedEntryId) => {
			try {
				await fetchEntries();
			} catch (error) {
				console.error("Error handling delete entry:", error);
			}
		},
		[fetchEntries]
	);

	useEffect(() => {
		if (isLoggedIn) {
			fetchEntries();
		}
	}, [isLoggedIn, fetchEntries]);

	const handleSaveEntry = useCallback(
		async (savedEntry) => {
			await fetchEntries();
		},
		[fetchEntries]
	);

	const handleUpdateEntry = useCallback(
		async (updatedEntry) => {
			await fetchEntries();
		},
		[fetchEntries]
	);

	if (!isLoggedIn) {
		return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
	}

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
						tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color={color} />,
						tabBarButton: (props) => <TouchableOpacity {...props} onPress={toggleSettingsModal} />,
					}}
				>
					{() => null}
				</Tabs.Screen>
				<Tabs.Screen
					name="index"
					options={{
						title: "Add",
						tabBarIcon: ({ color }) => (
							<TouchableOpacity onPress={toggleJournalModal}>
								<AntDesign name="pluscircleo" size={24} color="black" />
							</TouchableOpacity>
						),
					}}
				>
					{(props) => (
						<HomeScreen
							{...props}
							journalEntries={journalEntries}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							updateEntry={handleUpdateEntry}
							deleteEntry={handleDeleteEntry}
						/>
					)}
				</Tabs.Screen>
				<Tabs.Screen
					name="stats"
					options={{
						title: "Stats",
						tabBarIcon: ({ color }) => <AntDesign name="linechart" size={24} color={color} />,
						tabBarButton: (props) => <TouchableOpacity {...props} onPress={toggleStatsModal} />,
					}}
				>
					{() => null}
				</Tabs.Screen>
			</Tabs.Navigator>
			<JournalEntryModal visible={journalModalVisible} onDismiss={toggleJournalModal} onSave={handleSaveEntry} />
			<SettingsMenu visible={settingsModalVisible} onDismiss={toggleSettingsModal} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<StatisticsModal visible={statsModalVisible} onDismiss={toggleStatsModal} journalEntries={journalEntries} />
		</>
	);
}
