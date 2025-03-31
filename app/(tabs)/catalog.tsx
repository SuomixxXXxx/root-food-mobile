import { fetchCategories } from "@/api/slices/categories";
import { fetchDishItems } from "@/api/slices/dishItem";
import { RootState } from "@/api/store";
import ProductCard from "@/components/productCard";
import { useAppDispatch } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";

export default function CatalogScreen() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const categories = useSelector(
    (state: RootState) => state.categories?.categories?.data || []
  );
  const dishItems = useSelector(
    (state: RootState) => state.dishItems?.dishItems?.data || []
  );
  const status = useSelector(
    (state: RootState) => state.dishItems?.dishItems?.status || "PENDING"
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await dispatch(fetchCategories());
      await dispatch(fetchDishItems());
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch]);

  if (isLoading || status === "PENDING") {
    return <ActivityIndicator size="large" />;
  }

  if (!categories.length || !dishItems.length) {
    return <Text>Нет доступных категорий или блюд</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id.toString()}
        renderItem={({ item: category }) => {
          const categoryProducts = dishItems.filter(
            (dish) => dish.categoryDTO.id === category.id
          );
          return (
            <View key={category.id} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              {categoryProducts.length > 0 ? (
                <FlatList
                  data={categoryProducts}
                  keyExtractor={(dish) => dish.id.toString()}
                  renderItem={({ item }) => <ProductCard {...item} />}
                  numColumns={2}
                  contentContainerStyle={styles.list}
                />
              ) : (
                <Text style={styles.noProducts}>Нет доступных товаров</Text>
              )}
            </View>
          );
        }}
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
  categoryContainer: {},
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingVertical: 10,
    textTransform: "capitalize",
  },
  noProducts: {
    fontSize: 14,
    color: "gray",
  },
});
