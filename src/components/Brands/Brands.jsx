import React, { useEffect } from 'react';
import Style from './Brands.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDeferredValue } from 'react';
import { getCategories } from '../../Redux/CategoriesSlice';
import { Link } from 'react-router-dom';

export default function Brands() {

  let dispatch = useDispatch();
  let {loading, isError, categories} = useSelector((state)=> (state.categories));
  console.log(loading);
  
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  
  return <>
  {loading?
  <div className="d-flex justify-content-center w-100 py-5 align-items-center">
      <i className="fas fa-spinner fa-spin" style={{ fontSize: '4rem', color: 'green' }}></i>
  </div>
  :
  <div className='container'>
    <div className='row'>
      {categories.map((brand)=> <div className="col-md-2" key={brand._id}>
    <Link to={`/BrandDetails/${brand._id}`} className="text-decoration-none text-black">
      <div className="brand cursor-pointer">
        <img className="w-100" src={brand.image} alt={brand.name} />
      </div>
    </Link>
  </div>)}
    </div>
  </div>
  }
  </>
    
} 
