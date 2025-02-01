import React from "react";
import { useCart } from "../store/CartContext";


const AddProductButton = ({ product }: any) => {
  const { addToCart } = useCart();

    return (
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    );
};

export default AddProductButton;
