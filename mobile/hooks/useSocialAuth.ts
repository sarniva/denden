import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

function useAuthSocial() {
  const [loadingStratergy, setLoadingStratergy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setLoadingStratergy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log("Error in social auth", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again`,
      );
    } finally {
      setLoadingStratergy(null);
    }
  };
  return {
    handleSocialAuth,
    loadingStratergy,
  };
}

export default useAuthSocial;
