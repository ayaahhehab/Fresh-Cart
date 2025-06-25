import axios from "axios";
import { createContext, useState } from "react";

export const OrdersContext = createContext();

export default function OrdersContextProvider(props) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUserOrders(userId) {
    setLoading(true);
    
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
          console.log("Orders API response:", res.data);
        setOrders(res.data.orders);
        return res;
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        return err;
      })
      .finally(() => setLoading(false));
      
  }

  return (
    <OrdersContext.Provider value={{ orders, getUserOrders, loading }}>
      {props.children}
    </OrdersContext.Provider>
  );
}
