import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  // Calculate total items in the cart
  const totalItems = cart?.reduce((acc: any, item: any) => acc + item.quantity, 0);
  const handleCartClick = () => {
  }
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🛍 MyShop
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <div onClick={handleCartClick} className="cart-link">
            🛒 Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
