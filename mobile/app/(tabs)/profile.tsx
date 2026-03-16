import { useAuth } from "@clerk/expo";
import { Text, ScrollView, Pressable } from "react-native";

const ProfileTab = () => {
  const {signOut} = useAuth();
  return (
    <ScrollView className="bg-black" contentInsetAdjustmentBehavior="automatic">
      <Text className="text-white mt-10">Profile Tab</Text>
      <Pressable onPress={()=>signOut()} className="mt-4 bg-red-600 px-4 py-2" ><Text>Sign Out</Text></Pressable>
    </ScrollView>
  );
};

export default ProfileTab;
