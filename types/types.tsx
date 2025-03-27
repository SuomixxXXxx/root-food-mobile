export type ProductCardProps = {
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