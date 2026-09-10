import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

const getSavedWishlist = () => {
  try {
    const saved = localStorage.getItem("shopEaseWishlist");

    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("Error loading wishlist:", error);
    return [];
  }
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getSavedWishlist);

  useEffect(() => {
    localStorage.setItem(
      "shopEaseWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentWishlist, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}