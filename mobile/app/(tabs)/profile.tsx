import { useAuth } from "@clerk/expo";
import { Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 bg-black"
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text className="text-white ">Profile Tab</Text>
        <Pressable
          onPress={() => signOut()}
          className="mt-4 bg-red-600 px-4 py-2"
        >
          <Text>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;
