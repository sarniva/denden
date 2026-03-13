import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>Hello</Text>
      <Text className="text-red-500 text-3xl bg-black">okay1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color:"red",
    fontSize:40
  }
})
