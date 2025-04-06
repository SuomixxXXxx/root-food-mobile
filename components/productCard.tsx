import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageErrorEventData,
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../redux/slices/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProductCardProps } from "@/types/types";
import { useAppDispatch } from "@/hooks/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/api/store";
import { addToCart, removeFromCart } from "@/api/slices/cart";
import { IMAGE_URL } from "@/constants/constants";

const ProductCard = ({
  id,
  name,
  weight,
  price,
  quantity,
  imgURL = `${IMAGE_URL}/${id}.jpg`,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.cart);
  const existingItem = items.find((item) => item.id === id);
  const quantityItems = existingItem ? existingItem.quantity : 0;
  // const quantityItems = 0;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imgURL}}
        style={styles.cardImage}
        onError={(error) => console.log(error.nativeEvent.error)}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.weight}>{weight} г</Text>
        <Text style={styles.price}>{price} ₽</Text>

        {quantityItems > 0 ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => dispatch(removeFromCart({ id }))}
            >
              {quantityItems > 1 ? (
                <Ionicons name="remove" size={20} color="#0396BF" />
              ) : (
                <Ionicons name="trash-outline" size={20} color="#0396BF" />
              )}
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantityItems}</Text>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                if (quantityItems < quantity) {
                  dispatch(
                    addToCart({
                      id,
                      name,
                      price: price,
                      totalQuantity: quantity,
                    })
                  );
                }
              }}
              disabled={quantity === quantityItems}
            >
              <Ionicons name="add" size={20} color="#0396BF" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addButton, !quantity && styles.disabledButton]}
            onPress={() => {
              if (quantity) {
                dispatch(
                  addToCart({
                    id,
                    name,
                    price: price,
                    totalQuantity: quantity,
                  })
                );
              }
            }}
            disabled={!quantity}
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text style={styles.addButtonText}>В корзину</Text>
          </TouchableOpacity>
        )}

        <View style={styles.stockInfo}>
          {quantity > 0 ? (
            <Text style={styles.inStock}>В наличии {quantity} шт</Text>
          ) : (
            <Text style={styles.outOfStock}>Нет в наличии</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    width: 160,
    borderRadius: 16,
    margin: 8,
    shadowColor: "#7A9E9F",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  weight: {
    fontSize: 12,
    fontWeight: "600",
    color: "gray",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    padding: 4,
    alignSelf: "flex-start",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "space-between",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#0396BF",
    borderRadius: 8,
    padding: 4,
  },
  controlButton: {
    padding: 4,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0396BF",
  },
  addButton: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0396BF",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.5,
  },
  stockInfo: {
    alignItems: "center",
    marginBottom: 8,
  },
  inStock: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },
  outOfStock: {
    color: "#BF0306",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProductCard;
