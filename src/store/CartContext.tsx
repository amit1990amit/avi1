import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define the shape of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Create the context with an initial undefined value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer function to manage cart state
const cartReducer = (state: CartItem[], action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Cart Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item: CartItem) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (id: string) => dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
