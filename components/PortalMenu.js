import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Portal, Dialog, Paragraph, Menu, Provider } from "react-native-paper";

const PortalMenu = () => {
	const [visible, setVisible] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);

	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	const openMenu = () => setMenuVisible(true);
	const closeMenu = () => setMenuVisible(false);

	return (
		<Provider>
			<View style={styles.container}>
				<Button mode="contained" onPress={showDialog}>
					Open Portal
				</Button>
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog}>
						<Dialog.Title>Menu</Dialog.Title>
						<Dialog.Content>
							<Menu visible={menuVisible} onDismiss={closeMenu} anchor={<Button onPress={openMenu}>Show Menu</Button>}>
								<Menu.Item onPress={() => {}} title="Option 1" />
								<Menu.Item onPress={() => {}} title="Option 2" />
								<Menu.Item onPress={() => {}} title="Option 3" />
							</Menu>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={hideDialog}>Done</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		</Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default PortalMenu;
