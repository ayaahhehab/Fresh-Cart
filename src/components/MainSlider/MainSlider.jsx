import React from 'react';
import Style from './MainSlider.module.css';
import slide1 from '../../Assets/images/slider-image-1.jpeg';
import slide2 from '../../Assets/images/slider-image-2.jpeg';
import slide3 from '../../Assets/images/slider-image-3.jpeg';
import slide4 from '../../Assets/images/slide4.png';
import slide5 from '../../Assets/images/slide5.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
  <div className='row gx-0'>
    <div className='col-md-9'>
      <Slider {...settings}>
        <img height={400} className='w-100' src={slide1} alt='slide 1'/>
        <img height={400} className='w-100' src={slide2} alt='slide 2'/>
        <img height={400} className='w-100' src={slide3} alt='slide 3'/>
      </Slider>
    </div>
    <div className='col-md-3'>
      <img className='w-100' src={slide4} alt='slide 4'/>
      <img className='w-100' src={slide5} alt='slide 4'/>
    </div>
  </div>
  
  </>
    
}
