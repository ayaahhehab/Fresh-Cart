import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function OrdersPage() {
  const userId = '6407cf6f515bdcf347c09f17';

  const fetchOrders = async () => {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
    );
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userOrders', userId],
    queryFn: fetchOrders,
  });

  if (isLoading) {
    return <div className="text-center mt-5 text-secondary">Loading orders...</div>;
  }

  if (isError) {
    return <div className="text-danger text-center mt-4">Error: {error.message}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 font-weight-bold">Your Orders</h2>
      <div className="row">
        {data?.map((order) => (
          <div className="col-md-6 mb-4" key={order.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Order #{order.id}</h5>
                <p className="card-text">
                  <strong>Total Price:</strong> {order.totalOrderPrice} EGP
                </p>
                <p className="card-text">
                  <strong>Payment Method:</strong> {order.paymentMethodType}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{' '}
                  <span className={order.isDelivered ? 'text-success' : 'text-warning'}>
                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </p>
                <p className="card-text">
                  <strong>Date:</strong>{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <hr />
                <p className="mb-0 text-muted small">
                  <strong>Shipping:</strong>{' '}
                  {order.shippingAddress?.details}, {order.shippingAddress?.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
