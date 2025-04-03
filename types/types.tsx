export type ProductCardProps = {
  categoryDTO: {
    id: number;
    name: string;
  };
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

export type CartItem = {
  id: number;
  name: string;
  price: number;
  unitPrice: number;
  quantity: number;
  totalQuantity: number;
};

export interface CartState {
  items: CartItem[];
  amount: number;
  totalPrice: number;
  status: string;
}

export type CartItemPayload = {
  id: number;
  name: string;
  price: number;
  totalQuantity: number;
};

export type RemoveFromCartPayload = {
  id: number;
};

export type AddToCartPayload = {
  id: number;
  name: string;
  price: number;
  totalQuantity: number;
};