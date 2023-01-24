import { createContext, useContext, useEffect, useState } from "react";
import { ProductProps } from "@/interfaces/ProductProps";
import { CartItemProps } from "@/interfaces/CartItemProps";

export const CartContext = createContext<{
  cart: { [productId: number]: CartItemProps };
  addToCart: (product: ProductProps) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, quantity: number) => void;
}>({
  cart: {},
  addToCart: () => {},
  removeFromCart: () => {},
  changeQuantity: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<{ [productId: number]: CartItemProps }>({});
  useEffect(() => {
    const cartLocal = window.localStorage.getItem("cart");
    if (cartLocal) {
      setCart(JSON.parse(cartLocal));
    }
  }, []);
  const addToCart = (product: ProductProps) => {
    setCart((old) => {
      let quantity = 0;
      if (old[product.id]) {
        quantity = old[product.id].quantity;
      }
      const newCart = {
        ...old,
        [product.id]: {
          quantity: quantity + 1,
          product,
        },
      };
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const changeQuantity = (productId: number, newQuantity: number) => {
    setCart((old) => {
      const newCart = { ...old };
      newCart[productId].quantity = newQuantity;
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((old) => {
      const newCart = { ...old };
      delete newCart[productId];
      window.localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};
