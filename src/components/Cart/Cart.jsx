import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null)
  const {getLoggedUserCart, removeCartItem, updateCartItem,numOfCartItems, setNumOfCartItems} = useContext(CartContext);

  async function getCart() {
    const {data} = await getLoggedUserCart();
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems);
    // console.log(data);
  }
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getCart(); // ✅ load on app start if logged in
    }
  }, []);
  
  async function handleUpdate(productId, count) {
    const {data} = await updateCartItem(productId, count);
    setCartDetails(data);
    // console.log(data);
  }
  async function handleRemove(productId) {
  const response = await removeCartItem(productId);
  if (response?.data?.status === 'success') {
    getCart(); // Refresh cart after removal
  }
}
  useEffect(()=>{
    getCart();
  },[])
  return <>
  {cartDetails? <div className='w-75 mx-auto p-3 my-2 bg-main-light '>
    <h3>Shopping Cart</h3>
    <h4 className='h6 text-main fw-bolder' style={{color: 'green' }}>Cart Items : {cartDetails.numOfCartItems}</h4>
    <h4 className='h6 text-main fw-bolder mb-4' style={{ color: 'green' }}>totalCartPrice : {cartDetails.data.totalCartPrice} EGP</h4>
    {cartDetails.data.products.map((product)=> <div key={product.product.id} className='row border-bottom py-2'>
      <div className='col-md-1'>
        <img className='w-100' src={product.product.imageCover} alt=''/>
      </div>
      <div className='col-md-11'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h3 className='h6' style={{color: 'green' }}>{product.product.title.split(' ').slice(0,3).join(' ')}</h3>
            <h6>Price: {product.price} EGP</h6>
            <button className='btn p-0' onClick={() => handleRemove(product.product.id)}><i className='text-danger font-sm fas fa-trash-can'></i> Remove</button>

          </div>
          <div>
            <button onClick={()=>handleUpdate(product.product.id, product.count + 1)} className='btn border-main p-1'style={{borderColor: 'green' }}>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={()=>handleUpdate(product.product.id, product.count - 1)} className='btn border-main p-1'style={{borderColor: 'green' }}>-</button>
          </div>
        </div>
      </div>
    </div>)}
    <div className='d-flex justify-content-center align-items-center'>
    <Link to="/address" className='btn m-3 bg-main w-25 text-white'>Online Payment</Link>
    <Link className='btn m-3 bg-main w-25 text-white'>Cash on Delivery</Link>
    </div>
      </div> : 
  <div className="d-flex justify-content-center w-100 py-5 align-items-center">
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '4rem', color: 'green' }}></i>
  </div> }
  
  </>
    
}
