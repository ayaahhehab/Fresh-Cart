import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  const userToken = localStorage.getItem('userToken');
  const headers = {
    token: userToken
  };

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setNumOfCartItems(response?.data?.numOfCartItems);
        setCartId(response?.data?.data?._id);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching cart", error);
        return error;
      });
  }

  function addToCart(id) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id },
        { headers }
      )
      .then((response) =>response)
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers })
        .then((response) =>response)
        .catch((error) => error);
  }

  function updateCartItem(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count }, { headers })
        .then((response) =>response)
        .catch((error) => error);
  }

  function onlinePayment(cartId, url, values){
    return axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` ,
        {
            shippingAddress: values
        }, { headers })
        .then((response)=> response)
        .catch((error)=> error)

}

  // ✅ Fetch cart data once when the user is logged in
  useEffect(() => {
    if (userToken) {
      getLoggedUserCart();
    }
  }, [userToken]);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        cartId,
        addToCart,
        onlinePayment,
        getLoggedUserCart,
        removeCartItem,
        updateCartItem
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
