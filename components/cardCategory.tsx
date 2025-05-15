import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Props = {
  id: number;
  name: string;
  image: any; 
};

const CardCategory = ({ id, name, image }: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // navigation.navigate("Category", { categoryId: id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 120,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 5,
    elevation: 3,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  imageStyle: {
    resizeMode: "cover",
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CardCategory;
