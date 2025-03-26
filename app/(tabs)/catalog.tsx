import { View, Text, StyleSheet } from "react-native";

export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <Text>Catalog</Text>
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
