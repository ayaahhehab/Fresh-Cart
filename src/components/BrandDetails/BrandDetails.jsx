import React, { useEffect } from "react";
import Style from './BrandDetails.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificBrand } from "../../Redux/CategoriesSlice";

export default function BrandDetails() {
  const { Id } = useParams();
  const dispatch = useDispatch();
  const { brand, loading, isError } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSpecificBrand(Id));
  }, [Id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <i className="fas fa-spinner fa-spin fa-3x text-success"></i>
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-center text-danger mt-5">Error: {isError}</h3>;
  }

  return (
    <div className=" d-flex justify-content-center align-items-center mt-5 " >
  {brand && (
    <div className="d-flex  align-items-center gap-5 text-center">
      <img
        src={brand.image}
        alt={brand.name}
        style={{
          maxWidth: '300px',
          borderRadius: '10px',
        }}
      />
      <div>
        <h2 className="mb-3">{brand.name}</h2>
        <p className="text-muted">
           {brand.createdAt}
        </p>
        <p className="text-muted">
           {brand.updatedAt}
        </p>
      </div>
    </div>
  )}
</div>

  );
}
