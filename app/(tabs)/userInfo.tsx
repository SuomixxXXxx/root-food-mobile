import { View, Text, StyleSheet } from "react-native";

export default function UserInfoScreen() {
  return (
    <View style={styles.container}>
      <Text>UserInfo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
