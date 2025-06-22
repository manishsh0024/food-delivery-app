import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const url = import.meta.env.VITE_API_URL;
  console.log(url)
  const [token, setToken] = useState("");

  const [food_list, setFoodList] = useState([]);

  const increaseCount = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        `${url}/api/cart/addquantity`,
        {
          productId: itemId,
          action: "increase",
        },
        { headers: { token } }
      );
    }
  };

  const decreaseCount = async (itemId) => {
    setCartItem((prev) => {
      const updated = {
        ...prev,
        [itemId]: (prev[itemId] || 0) - 1,
      };
      if (updated[itemId] <= 0) {
        delete updated[itemId];
      }
      return updated;
    });
    if (token) {
      await axios.post(
        `${url}/api/cart/addquantity`,
        {
          productId: itemId,
          action: "decrease",
        },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { productId: itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const food_list_WithDetails = food_list.filter(
    (item) => cartItem[item._id] > 0
  );

  const totalAmount = food_list_WithDetails.reduce((total, item) => {
    return total + item.price * cartItem[item._id];
  }, 0);



  const fetchFoodList = useCallback(async () => {
    const res = await axios.get(`${url}/api/food/list`);
    setFoodList(res.data.data);
  }, [url]);

  const loadCartData = useCallback(async (token) => {
    try {
      const res = await axios.post(
        `${url}/api/cart/items`,
        {},
        { headers: { token } }
      );
      if (res.data.success && res.data.cart) {
        setCartItem(res.data.cart);
      } else {
        setCartItem({});
        console.error("Failed to load cart data:", res.data.message);
      }
    } catch (err) {
      console.error("Error loading cart:", err);
      setCartItem({});
    }
  }, [url]);

useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      await loadCartData(tokenFromStorage);
    }
  }
  loadData();
}, [fetchFoodList, loadCartData]);


  const contextValue = {
    food_list,
    increaseCount,
    decreaseCount,
    cartItem,
    setCartItem,
    removeFromCart,
    food_list_WithDetails,
    totalAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
