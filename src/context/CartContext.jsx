import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

function getSavedCart() {
  try {
    const savedCart = localStorage.getItem("shopEaseCart");

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart);
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getSavedCart);

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
      );

      console.log("Cart saved:", cart);
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cart]);

  // ============================================
  // ADD TO CART
  // ============================================

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // ============================================
  // REMOVE PRODUCT
  // ============================================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ============================================
  // INCREASE
  // ============================================

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ============================================
  // DECREASE
  // ============================================

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ============================================
  // CLEAR CART
  // ============================================

  const clearCart = () => {
    setCart([]);
  };

  // ============================================
  // CART COUNT
  // ============================================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ============================================
  // CART TOTAL
  // ============================================

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity * 85,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}