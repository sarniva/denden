import { useSSO } from "@clerk/expo";
import { useState, useRef } from "react";
import { Alert } from "react-native";

function useAuthSocial() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const inFlightRef = useRef(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    // if (loadingStrategy) return; //guards against concurrent flows
    if(inFlightRef.current) return;
    inFlightRef.current = true;
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Auth state will automatically update, root layout will re-render
      }
    } catch (error) {
      console.log("Error in social auth", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again`,
      );
    } finally {
      inFlightRef.current = false;
      setLoadingStrategy(null);
    }
  };
  return {
    handleSocialAuth,
    loadingStrategy,
  };
}

export default useAuthSocial;
