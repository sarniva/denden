import { Text, ScrollView, Button } from "react-native";
import * as Sentry from "@sentry/react-native";

const ChatsTab = () => {
  return (
    <ScrollView className="bg-black" contentInsetAdjustmentBehavior="automatic">
      <Text className="text-white mt-10">Chat Tab</Text>
      <Button
        title="Try!"
        onPress={() => {
          console.log("you pressed the button");

          Sentry.captureException(new Error("First error"));
        }}
      />
    </ScrollView>
  );
};

export default ChatsTab;
