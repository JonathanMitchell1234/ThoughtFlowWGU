import React from "react";
import { View, Button } from "react-native";
import { useGoogleSignIn } from "./GoogleSignInConfig";

const GoogleSignInButton = () => {
	const { request, promptAsync } = useGoogleSignIn();

	return (
		<View>
			<Button
				title="Sign in with Google"
				disabled={!request}
				onPress={() => {
					promptAsync();
				}}
			/>
		</View>
	);
};

export default GoogleSignInButton;
