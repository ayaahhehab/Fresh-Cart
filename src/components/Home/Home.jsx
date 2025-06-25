import React from 'react';
import Style from './Home.module.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import useNetwork from '../../Hooks/useNetwork';

export default function Home() {
  const x = useNetwork();

  return <>
  <Helmet>
      <meta name="description" content="" />
      <title>fresh cart</title>
   </Helmet>
   {/* {x} */}
  <MainSlider/>
  <CategorySlider/>
  <FeaturedProducts/>
  </>
    
}
