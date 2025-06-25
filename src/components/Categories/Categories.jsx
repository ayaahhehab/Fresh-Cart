import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Style from './Categories.module.css'; // ✅ CSS Module import

export default function CategoriesPage() {
  const getCategories = async () => {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <div className="text-center mt-5 text-secondary fs-4">Loading categories...</div>;
  }

  if (isError) {
    return <div className="text-danger text-center mt-4 fs-5">Error: {error.message}</div>;
  }

  return (
    <div className="container py-5">
      <h2 className={Style.heading}>Explore Categories</h2>
      <div className="row g-4">
        {data.map((category) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={category._id}>
            <Link to={`/categoryDetails/${category._id}`} className="text-decoration-none">
              <div className={Style.card}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={Style.cardImage}
                />
                <div className={Style.cardBody}>
                  <h5 className={Style.cardTitle}>{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
