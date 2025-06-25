import React, { useContext, useEffect, useState } from 'react';
import Style from './FeaturedProducts.module.css';
import Products from '../Products/Products';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function FeaturedProducts() {

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
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
    // gcTime: 3000,
    // refetchOnMount: false,
    // staleTime: 30000,
    // refetchInterval:1000
    // enabled: false // refetch
  });


  function getFeaturedProducts() {
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
    <div className="container py-4">
  <h2 className="text-center mb-4 text-main fw-bold">Featured Products</h2>
  <div className="row g-4">
    {data?.data.data.map((product) => (
      <div key={product.id} className="col-md-4 col-lg-3">
        <div className={`${Style.productCard} p-3 h-100 d-flex flex-column justify-content-between`}>
  <Link to={`/productdetails/${product.id}`} className="text-decoration-none text-dark">
    <div className={Style.imageContainer}>
      <img className={`${Style.productImage} w-100 mb-3 rounded`} src={product.imageCover} alt={product.title} />
    </div>
    <span className="text-main fw-semibold small d-block mb-1">{product.category.name}</span>
    <h3 className="h6 fw-bold">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
    <div className="d-flex justify-content-between align-items-center mt-2">
      <span className="fw-semibold">{product.price} EGP</span>
      <span className="text-warning"><i className="fas fa-star"></i> {product.ratingsAverage}</span>
    </div>
  </Link>
  <button
    onClick={() => addProductToCart(product.id)}
    className="btn btn-sm mt-3 text-white w-100"
    style={{ backgroundColor: '#0aad0a' }}
  >
    Add to Cart
  </button>
</div>

      </div>
    ))}
  </div>
</div>

  }
  
  </>
    
}
