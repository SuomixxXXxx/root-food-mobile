import ProductCard from "@/components/productCard";
import { View, Text, StyleSheet, FlatList } from "react-native";

const products: ProductCardProps[] = [
  {
    id: 1,
    name: "Пепперони",
    weight: 560,
    price: 699,
    totalQuantity: 5,
    imgURL: "https://picsum.photos/200/300?random=1",
  },
  {
    id: 2,
    name: "Маргарита",
    weight: 480,
    price: 599,
    totalQuantity: 3,
    imgURL: "https://picsum.photos/200/300?random=2",
  },
  {
    id: 3,
    name: "Гавайская",
    weight: 520,
    price: 649,
    totalQuantity: 0,
    imgURL: "https://picsum.photos/200/300?random=3",
  },
  {
    id: 4,
    name: "Четыре сыра",
    weight: 600,
    price: 749,
    totalQuantity: 7,
    imgURL: "https://picsum.photos/200/300?random=4",
  },
  {
    id: 5,
    name: "Вегетарианская",
    weight: 530,
    price: 679,
    totalQuantity: 2,
    imgURL: "https://picsum.photos/200/300?random=5",
  },
  {
    id: 6,
    name: "Карбонара",
    weight: 580,
    price: 729,
    totalQuantity: 4,
    imgURL: "https://picsum.photos/200/300?random=6",
  },
  {
    id: 7,
    name: "С морепродуктами",
    weight: 610,
    price: 799,
    totalQuantity: 1,
    imgURL: "https://picsum.photos/200/300?random=7",
  },
  {
    id: 8,
    name: "Барбекю",
    weight: 590,
    price: 699,
    totalQuantity: 0,
    imgURL: "https://picsum.photos/200/300?random=8",
  },
];
export default function CatalogScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
  },
  list: {
    paddingTop: 40,
    paddingBottom: 90,
  },
});
