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

  // const [userMessages, setUserMessages] = useState(() => {
  //   // Load from local storage on initial render
  //   return JSON.parse(localStorage.getItem('messages')) || [];
  // });

  // useEffect(() => {
  //   // Save to local storage whenever messages change
  //   localStorage.setItem('messages', JSON.stringify(userMessages));
  // }, [userMessages]);

  const [userMessages, setUserMessages] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (newItems) => {
    const updatedCart = [...cart];

    newItems.forEach((newItem) => {
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, update the quantity
        updatedCart[existingItemIndex].qty += newItem.qty;
      } else {
        // Item does not exist, add it to the cart
        updatedCart.push(newItem);
      }
    });

    setCart(updatedCart);
  };


// const handleAddToCart = (imageURL,productName,unitPrice,quantity) => {
//     setCart([...cart, {imageURL,productName,unitPrice,quantity}]);
//   };

  const handleDeleteItem = (itemID) => {
    const updatedCart = cart.filter((item) => item.id !== itemID);
    setCart(updatedCart);
  };

  const handleDeleteAll = () => {
    setCart([]);
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, qty: newQuantity } : item
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
        userMessages,
        setUserMessages,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
