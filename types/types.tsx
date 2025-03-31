export type ProductCardProps = {
  categoryDTO:{
    id: number;
    name: string;
  }
  id: number;
  name: string;
  weight: number;
  price: number;
  quantity: number;
  imgURL: string;
};

export interface DishItemsState {
  dishItems: {
    data: ProductCardProps[] | null;
    status: string;
  };
}

export type CategoryProps = {
  id: number;
  name: string;
};
export interface CategoriesState {
  categories: {
    data: CategoryProps[] | null;
    status: string;
  };
}
