import { addToCart, getCartProducts } from "./cartProducts.procedures";
import { createCart } from "./carts.procedures";
import { createCategory, getCategories } from "./categories.procedures";
import { create, getAll } from "./products.procedures";

export const procedures = {
  products: {
    getAll,
    create,
  },
  carts: {
    createCart,
  },
  cartProducts: {
    getCartProducts,
    addToCart,
  },
  categories: {
    getCategories,
    createCategory,
  },
};
