import { fetchDishItems } from "@/api/slices/dishItem";
import { RootState } from "@/api/store";
import ProductCard from "@/components/productCard";
import { useAppDispatch } from "@/hooks/hooks";
import { ProductCardProps } from "@/types/types";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { STATUS } from "@/constants/constants";
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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selectDishItems = (state: RootState) => state.dishItems.dishItems.data;
  const memoizedSelector = createSelector(
    [selectDishItems],
    (data) => data || []
  );

  const categoryDishes = useSelector(memoizedSelector);
  useEffect(() => {
    setIsLoading(true);
    try {
      dispatch(fetchDishItems());
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);
  console.log(categoryDishes);
  const transformedData = categoryDishes.map(item => ({
    ...item,
    imgURL: item.imgURL || 'https://picsum.photos/200/300'
  }));
  const status = useSelector((state: RootState) => state.dishItems.dishItems.status);
  if (status === STATUS.PENDING) {
    return <ActivityIndicator size="large" />;
  }
  if (!categoryDishes?.length && status === STATUS.FULFILLED) {
    return <Text >Нет доступных блюд</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={transformedData}
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
