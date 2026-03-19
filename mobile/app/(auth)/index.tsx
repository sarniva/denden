import {
  View,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "@/hooks/useSocialAuth";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedOrb } from "@/components/AnimatedOrb";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");
const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();
  const isAuthLoading = Boolean(loadingStrategy);

  return (
    <View className="flex-1 bg-surface-dark pt-safe">
      {/*TODO: animated orbs */}
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <AnimatedOrb
          colors={["#F4A261", "#E76F51"]}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />
        <AnimatedOrb
          colors={["#E76F51", "#F4A261"]}
          size={250}
          initialX={width - 100}
          initialY={height * 0.3}
          duration={5000}
        />
        <AnimatedOrb
          colors={["#FFD7BA", "#F4A261"]}
          size={200}
          initialX={width * 0.3}
          initialY={height * 0.6}
          duration={3500}
        />
        <AnimatedOrb
          colors={["#F4B183", "#E76F51"]}
          size={180}
          initialX={-50}
          initialY={height * 0.75}
          duration={4500}
        />

        <BlurView
          intensity={70}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </View>
      <SafeAreaView className="flex-1">
        {/* Top Section - Branding  */}
        <View className="items-center pt-10">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100, marginVertical: -20 }}
            contentFit="contain"
          />
          <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase">
            Denden
          </Text>
        </View>
        {/* Center Section - Hero Image */}
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{ width: width - 48, height: height * 0.3 }}
            contentFit="contain"
          />
          {/* Headline */}
          <View className="mt-6 items-center">
            <Text className="text-5xl font-bold text-foreground text-center font-serif">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary font-mono">
              Seamlessly
            </Text>
          </View>
          {/*Auth Components */}
          <View className="flex-row gap-4 mt-10">
            {/*Google btn */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
              disabled={isAuthLoading}
              onPress={() => {
                console.log("you pressed google btn");
                if (isAuthLoading) return;
                handleSocialAuth("oauth_google");
              }}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{ width: 19, height: 20 }}
                    contentFit="contain"
                  />
                  <Text className="text-gray-900 font-semibold text-sm">
                    Google
                  </Text>
                </>
              )}
            </Pressable>
            {/*Apple btn */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl active:scale-[0.97]"
              disabled={isAuthLoading}
              onPress={() => {
                console.log("you pressed ios btn");
                if (isAuthLoading) return;
                handleSocialAuth("oauth_apple");
              }}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                  <Text className="text-foreground font-semibold text-sm">
                    Apple
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
