export type ProductCardProps = {
  quantity: number;
  id: number;
  name: string;
  weight: number;
  price: number;
  totalQuantity: number;
  imgURL: string;
};

export interface DishItemsState {
  dishItems: {
    data: ProductCardProps[] | null;
    status: string;
  };
}