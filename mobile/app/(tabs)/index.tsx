import { Text, ScrollView, Button } from "react-native";
import * as Sentry from "@sentry/react-native";
const ChatsTab = () => {
  return (
    <ScrollView className="bg-black" contentInsetAdjustmentBehavior="automatic">
      <Text className="text-white mt-10">Chat Tab</Text>
      {__DEV__ && (
        <Button
          title="Try Sentry"
          onPress={() => {
            Sentry.captureMessage("Sentry test event from ChatsTab");
          }}
        />
      )}
    </ScrollView>
  );
};

export default ChatsTab;
