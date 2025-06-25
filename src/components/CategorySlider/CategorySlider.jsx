import React, { useState } from 'react';
import Style from './CategorySlider.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['CategorySlider'],
    queryFn: getCategorySlider,
  });


  function getCategorySlider() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  console.log(data?.data.data)

  return <>
  {data?.data.data? 
  <div className='py-5'>
    <Slider {...settings}>
      {data.data.data.map((category)=> <img style={{objectFit:'cover'}} height={200} key={category.id} src={category.image} className='w-100' />)}
    </Slider> 
  </div>
  :''}
  </>
    
}
