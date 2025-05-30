import React, { useState } from "react";
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
import {
  removeFromCart,
  addToCart,
  clearCart,
  orderCreate,
} from "@/api/slices/cart";
import { IMAGE_URL } from "@/constants/constants";
import { CartItem } from "@/types/types";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useRouter } from "expo-router";
import { selectIsAuth } from "@/api/slices/auth";

const { width } = Dimensions.get("window");

const CartScreen = (
  {
    //  navigation
  }
) => {
  const router = useRouter();
  const { items, amount, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const [open, setOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const handleClose = async () => {
    setOpen(false);
    setOrderMessage("");
    dispatch(clearCart());
  };

  const handlePurchase = async () => {
    if (!isAuth) {
      setOpen(true);
      setOrderMessage("Пожалуйста, авторизуйтесь для оформления заказа");
      return;
    }

    if (items.length === 0) {
      setOpen(true);
      setOrderMessage("Корзина пуста");
      return;
    }

    const orderContentDTOs = items.map((item) => ({
      dishItemDTO: { id: item.id },
      quantity: item.quantity,
    }));

    try {
      console.log("Отправка заказа:", { orderContentDTOs }); 

      const action = await dispatch(orderCreate({ orderContentDTOs }));

      if (orderCreate.fulfilled.match(action)) {
        setOrderMessage(`Заказ #${action.payload.id} успешно оформлен!`);
        setOpen(true);
        dispatch(clearCart());
      } else {
        throw new Error((action.payload as string) || "Неизвестная ошибка");
      }
    } catch (error: any) {
      console.error("Ошибка заказа:", error);
      setOrderMessage(
        error.response?.data?.message ||
          error.message ||
          "Ошибка при оформлении заказа. Пожалуйста, попробуйте снова."
      );
      setOpen(true);
    }
  };

  if (amount === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Корзина ждет пока её наполнят...</Text>
        <TouchableOpacity
          style={styles.catalogButton}
          onPress={() => router.push("/(tabs)/catalog")}
        >
          <Text style={styles.buttonText}>В каталог</Text>
        </TouchableOpacity>
        {orderMessage ? (
          <Text style={styles.orderMessage}>{orderMessage}</Text>
        ) : null}
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
              <Icon name="remove" size={20} color="#0396BF" />
            ) : (
              <Icon name="trash-outline" size={20} color="#0396BF" />
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
              size={20}
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
        <TouchableOpacity style={styles.payButton} onPress={handlePurchase}>
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
    fontWeight: "500",
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
    shadowColor: "#7A9E9F",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
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
    fontWeight: "500",
    color: "gray",
  },
  controlsContainer: {
    alignItems: "flex-end",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#0396BF",
    borderRadius: 8,
    padding: 4,
    width: 120,
  },
  controlButton: {
    padding: 4,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0396BF",
    marginHorizontal: 16,
  },
  totalItemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
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
    fontWeight: "500",
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
    fontWeight: "500",
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
  orderMessage: {
    marginTop: 20,
    color: "#2E7D32",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default CartScreen;
