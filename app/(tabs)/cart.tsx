import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { RootState } from "@/api/store";
import { removeFromCart, addToCart, clearCart } from "@/api/slices/cart";
import { IMAGE_URL } from "@/constants/constants";
import { CartItem } from "@/types/types";
import { useAppDispatch } from "@/hooks/hooks";

const { width } = Dimensions.get("window");

const CartScreen = (
  {
    //  navigation
  }
) => {
  const { items, amount, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();
  // const existingItem = items.find((item) => item.id === id);
  // const quantityItems = existingItem ? existingItem.quantity : 0;

  if (amount === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Корзина ждет пока её наполнят...</Text>
        <TouchableOpacity
          style={styles.catalogButton}
          // onPress={() => navigation.navigate('Category')}
        >
          <Text style={styles.buttonText}>В каталог</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: `${IMAGE_URL}/${item.id}.jpg` }}
        style={styles.itemImage}
        // defaultSource={require("../assets/placeholder.png")}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.unitPrice} ₽/шт</Text>
      </View>
      <View style={styles.controlsContainer}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            onPress={() => dispatch(removeFromCart({ id: item.id }))}
            style={styles.controlButton}
          >
            {item.quantity > 1 ? (
              <Icon name="remove" size={24} color="#0396BF" />
            ) : (
              <Icon name="trash-outline" size={24} color="#0396BF" />
            )}
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.unitPrice,
                  totalQuantity: item.totalQuantity,
                })
              )
            }
            style={styles.controlButton}
            disabled={item.quantity >= item.totalQuantity}
          >
            <Icon
              name="add"
              size={24}
              color={
                item.quantity >= item.totalQuantity ? "#CCCCCC" : "#0396BF"
              }
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.totalItemPrice}>{item.price} ₽</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Корзина</Text>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => dispatch(clearCart())}
        >
          <Text style={styles.clearButtonText}>Очистить корзину</Text>
          <Icon name="trash-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Оплата</Text>
        <Text style={styles.paymentMethod}>Сбербанк</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Итого:</Text>
          <Text style={styles.totalPrice}>{totalPrice} ₽</Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
          // onPress={handlePurchase}
        >
          <Text style={styles.payButtonText}>Оплатить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  catalogButton: {
    backgroundColor: "#0396BF",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  clearButtonText: {
    color: "#666",
    fontSize: 16,
    marginRight: 8,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  controlsContainer: {
    alignItems: "flex-end",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0396BF",
    borderRadius: 8,
    marginBottom: 8,
    width: 120,
    justifyContent: "space-between",
  },
  controlButton: {
    padding: 8,
    width: 40,
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0396BF",
    marginHorizontal: 12,
  },
  totalItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  paymentContainer: {
    paddingBottom: 100,
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  paymentMethod: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    color: "#333",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  payButton: {
    backgroundColor: "#0396BF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CartScreen;
