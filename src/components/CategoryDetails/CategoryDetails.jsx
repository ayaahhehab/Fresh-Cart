import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function CategoryDetails() {
  const { id } = useParams(); // Get category ID from URL

  const getCategoryDetails = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categoryDetails', id],
    queryFn: getCategoryDetails,
  });

  if (isLoading) return <div className="text-center mt-5 text-secondary">Loading category...</div>;
  if (isError) return <div className="text-danger text-center mt-4">Error: {error.message}</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 font-weight-bold">Category Details</h2>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <img
              src={data.image}
              alt={data.name}
              className="card-img-top img-fluid w-100"
              style={{ height: '350px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h4 className="card-title text-dark">{data.name}</h4>
              <p className="card-text text-muted">ID: {data._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
