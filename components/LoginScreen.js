// import React, { useEffect, useState } from "react";
// import { Button, Text, View } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// export default function LoginScreen({ onLoginSuccess }) {
// 	const [userInfo, setUserInfo] = useState(null);

// 	// Use different client IDs for iOS, Android, and web
// 	const [request, response, promptAsync] = Google.useAuthRequest({
// 		expoClientId: "YOUR_WEB_CLIENT_ID", // Replace with your web client ID
// 		iosClientId: "YOUR_IOS_CLIENT_ID", // Replace with your iOS client ID
// 		androidClientId: "YOUR_ANDROID_CLIENT_ID", // Replace with your Android client ID
// 	});

// 	useEffect(() => {
// 		if (response?.type === "success") {
// 			const { authentication } = response;
// 			getUserInfo(authentication.accessToken);
// 			onLoginSuccess(); // Notify HomeScreen that login was successful
// 		}
// 	}, [response]);

// 	const getUserInfo = async (token) => {
// 		if (!token) return;
// 		try {
// 			const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
// 				headers: { Authorization: `Bearer ${token}` },
// 			});
// 			const user = await response.json();
// 			setUserInfo(user);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// 			<Button
// 				disabled={!request}
// 				title="Login with Google"
// 				onPress={() => {
// 					promptAsync();
// 				}}
// 			/>
// 			{userInfo && <Text>Welcome, {userInfo.name}</Text>}
// 		</View>
// 	);
// }
