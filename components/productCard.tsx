import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../redux/slices/cart";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProductCardProps } from "@/types/types";


const ProductCard = ({ id, name, weight, price, totalQuantity, imgURL } : ProductCardProps) => {
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.cart);
//   const existingItem = items.find((item) => item.id === id);
  const quantity = 0;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imgURL }}
        style={styles.cardImage}
        onError={() => console.log("Image load error")}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.weight}>{weight} г</Text>
        <Text style={styles.price}>{price} ₽</Text>

        {quantity > 0 ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.controlButton}
            //   onPress={() =>
            //     dispatch(removeFromCart({ id, name, quantity, price }))
            //   }
            >
              {quantity > 1 ? (
                <Ionicons name="remove" size={24} color="#0396BF" />
              ) : (
                <Ionicons name="trash-outline" size={24} color="#0396BF" />
              )}
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.controlButton}
            //   onPress={() => {
            //     if (quantity < totalQuantity) {
            //       dispatch(addToCart({ id, name, quantity: 1, price }));
            //     }
            //   }}
              disabled={quantity === totalQuantity}
            >
              <Ionicons name="add" size={24} color="#0396BF" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.addButton, !totalQuantity && styles.disabledButton]}
            // onPress={() => {
            //   if (totalQuantity) {
            //     dispatch(
            //       addToCart({ id, name, quantity: 1, price, totalQuantity })
            //     );
            //   }
            // }}
            disabled={!totalQuantity}
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text style={styles.addButtonText}>В корзину</Text>
          </TouchableOpacity>
        )}

        <View style={styles.stockInfo}>
          {totalQuantity > 0 ? (
            <Text style={styles.inStock}>В наличии {totalQuantity} шт</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    marginBottom: 4,
  },
  weight: {
    fontSize: 12,
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
    justifyContent: "space-between",
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#0396BF",
    borderRadius: 8,
    padding: 8,
  },
  controlButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0396BF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0396BF",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
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
  },
  outOfStock: {
    color: "#dc2626",
    fontSize: 12,
  },
});

export default ProductCard;
