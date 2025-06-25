import React, { useContext } from 'react';
import Style from './Address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function Address() {
  let{onlinePayment, cartId} = useContext(CartContext);

  async function handleAddressSubmit(values){
    let res = await onlinePayment(cartId,`http://localhost:3000`, values); 
    console.log(res?.data.session.url);
    window.location.href = res?.data.session.url
    
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit: handleAddressSubmit
  })
  return <>
  <div className='container'>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='details'>Details: </label>
      <input type='text' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-2' name='details' id='details'/>
      
      <label htmlFor='phone'>Phone: </label>
      <input type='tel' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-2' name='phone' id='phone'/>
      
      <label htmlFor='city'>City: </label>
      <input type='text' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-2' name='city' id='city'/>

      <button type='submit' className='btn bg-main text-white'>Pay Now</button>
    </form>
  </div>

  </>
    
}
