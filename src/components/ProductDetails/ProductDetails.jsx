import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {

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

  var settings = {
    dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1
  }

  const [productDetails, setproductDetails] = useState(null)
  const params = useParams();
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['productDetails'],
    queryFn: ()=> getProductDetails(params.productId),
    // gcTime: 3000,
    // refetchOnMount: false,
    // staleTime: 30000,
    // refetchInterval:1000
    // enabled: false // refetch
  });

  function getProductDetails(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  }
  // console.log(data?.data.data)



  // console.log(params.productId)
  // async function getProductDetails(productId){
  //   const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
  //   setproductDetails(data)
  // }
  // useEffect(()=>{
  //   getProductDetails(params.productId);

  // },[])

  return <>

  {data?.data.data? <div className='row w-100 py-3 align-items-center'>
    <Helmet>
      <meta name="description" content="" />
      <title>{data.data.data.title}</title>
   </Helmet>
    <div className='col-md-4'>
      <Slider {...settings}>
        {[data?.data.data.imageCover, ...data?.data.data.images.filter(img => img !== data?.data.data.imageCover)]
        .map((img, index) => (
          <img key={index} src={img} alt={`product-img-${index}`} className="w-100 mb-2 rounded" />
          ))}
    </Slider>
    </div>
    <div className='col-md-8'>
      <h2 className='h5'>{data?.data.data.title}</h2>
      <p>{data?.data.data.description}</p>
      <h6 className='text-main'>{data?.data.data.category?.name}</h6>
      <h6 className='text-main'>price: {data?.data.data.price} EGP</h6>
      <div className='d-flex justify-content-between'>
        <span>rating: {data?.data.data.ratingsQuantity}</span>
        <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
      </div>
      <button onClick={()=> addProductToCart(data.data.data.id)} className='btn bg-main text-white w-100 mt-3'>Add to Cart</button>
    </div>
  </div> : ''}
  </>
    
}
