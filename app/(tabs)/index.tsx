import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { fetchDishItemsByCategory } from "@/api/slices/dishItem";
import { fetchCategories } from "@/api/slices/categories";
import ProductCard from "@/components/productCard";
import CardCategory from "@/components/cardCategory";
// import BakeCategory from "@/assets/images;
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { RootState } from "@/api/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { ScrollView } from "react-native";

const screenWidth = Dimensions.get("window").width;

const categoryLogo = require("../../assets/images/BakeCategory.png");
export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const dishItems = useAppSelector(
    (state: RootState) => state.dishItems?.dishItems?.data || []
  );
  const categories = useAppSelector(
    (state: RootState) => state.categories?.categories?.data || []
  );

  useEffect(() => {
    dispatch(fetchDishItemsByCategory(2));
    dispatch(fetchCategories() as any);
  }, [dispatch]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/home.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.sectionTitle}>Каталог</Text>
      <SwiperFlatList
        showPagination={false}
        paginationStyleItem={styles.paginationDot}
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <CardCategory id={item.id} name={item.name} image={categoryLogo} />
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Популярные товары</Text>
      <SwiperFlatList
        showPagination={false}
        paginationStyleItem={styles.paginationDot}
        data={dishItems}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <ProductCard {...item} />
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    backgroundColor: "#F0F8FF",
  },

  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 300,
    height: 160,
    aspectRatio: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  slide: {
    width: screenWidth * 0.6,
    paddingHorizontal: 10,
    marginLeft: -15,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
  },
});
