import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCartContext = () => {
  return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCartItems = localStorage.getItem("cart");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (newItems) => {
    const updatedCart = [...cart];

    newItems.forEach((newItem) => {
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.productID === newItem.productID
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update the quantity
        updatedCart[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Item does not exist, add it to the cart
        updatedCart.push(newItem);
      }
    });
    setCart(updatedCart);
  };

  const handleDeleteItem = (itemID) => {
    const updatedCart = cart.filter((item) => item.productID !== itemID);
    setCart(updatedCart);
  };

  const handleDeleteAll = () => {
    setCart([]);
  };

  const updateCartQuantity = (itemID, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productID === itemID ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDeleteAll,
        handleDeleteItem,
        updateCartQuantity,
        messages,
        setMessages,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
