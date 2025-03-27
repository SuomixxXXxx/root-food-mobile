import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0396BF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          marginHorizontal: 20, 
          borderRadius: 20,
          height: 70,
          elevation: 10,
          shadowColor: "black",
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 70,
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -4,
          marginBottom: 4,
        },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: "Каталог",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "restaurant" : "restaurant-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Корзина",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="userInfo"
        options={{
          title: "Войти",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
