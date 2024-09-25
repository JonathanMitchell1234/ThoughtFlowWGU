import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleSignIn = () => {
	const [request, response, promptAsync] = Google.useAuthRequest({
		expoClientId: "390648558615-tjeo8e1om30u86ducfk424gieiphtepe.apps.googleusercontent.com",
		// iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
		androidClientId: "390648558615-pb2vq1vh65ls57f5jlutlj2sjnducdfj.apps.googleusercontent.com",
		webClientId: "390648558615-79g68n4nhlfu8ffopnsnejiea7ba8un6.apps.googleusercontent.com",
		redirectUri: "https://auth.expo.io/dreadcatcleo/test",
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
			console.log(authentication);
		}
	}, [response]);

	return { request, promptAsync };
};
