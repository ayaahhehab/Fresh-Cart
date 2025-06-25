import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
export default function Products() {

  const { addToCart, getLoggedUserCart, setNumOfCartItems } = useContext(CartContext);

  async function addProductToCart(id) {
    const response = await addToCart(id);

      if (response.data.status === 'success') {
        toast.success('Product successfully added');
        const { data } = await getLoggedUserCart();
        setNumOfCartItems(data.numOfCartItems);
      } else {
        toast.error('Something went wrong');
      }
  }

  const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false); 
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts,
    // gcTime: 3000,
    // refetchOnMount: false,
    // staleTime: 30000,
    // refetchInterval:1000
    // enabled: false // refetch
  });


  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }
  // console.log(data?.data.data)



  // async function getFeaturedProducts() {
  //   setIsLoading(true);
  //   const{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   setProducts(data.data);
  //   console.log(data.data)
  //   setIsLoading(false);
    
  // }
  // useEffect(()=>{
  //   getFeaturedProducts();
  // },[])

  return <>
  {isLoading?
    <div className="d-flex justify-content-center w-100 py-5 align-items-center">
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '4rem', color: 'green' }}></i>
    </div>:
    <div className='container py-2'>
      {/* <button onClick={refetch} className='btn bg-main text-white w-50 d-flex align-items-center justify-content-center m-auto '>get products</button> */}
    <div className='row'>
       {/* mmkn nktb products.map lw est5dmna async await & useEffect bdl mn usequery */}
      {data?.data.data.map((product) =>
      <div key={product.id} className='col-md-2'>
        <div className='product cursor-pointer pt-3 px-2'>
            <Link to={`/productdetails/${product.id}`}>

          <img className='w-100' src={product.imageCover} alt={product.title}/>
          <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
          <h3 className='h6'>{product.title.split(" ").slice(0,2).join(' ')}</h3>
          <div className='d-flex justify-content-between mt-3'>
            <span>{product.price} EGP</span>
            <span><i className='fas fa-star rating-color'></i>  {product.ratingsAverage}</span>
          </div>
          </Link>
          <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>add to cart</button>
        </div>
        
        
        
      </div>)}
    </div>
  </div>
  }
  
  </>
    
}
