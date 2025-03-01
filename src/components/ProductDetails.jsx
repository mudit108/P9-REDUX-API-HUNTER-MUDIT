import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { fetchProductsById } from "../features/slice";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsById(productId));
  }, [dispatch, productId]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className='alert alert-danger text-center'>
        <h3>Error</h3>
        <p>{error}</p>
        <button className='btn btn-primary' onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!currentProduct) {
    return null;
  }

  return (
    <div className='container mt-4'>
      <button className='btn btn-secondary mb-4' onClick={() => navigate(-1)}>
        Back
      </button>
      <div className='card'>
        <img
          src={currentPost.image}
          alt={currentPost.title}
          className='card-img-top'
          style={{ height: "300px", objectFit: "contain" }}
        />
        <div className='card-body'>
          <h1 className='card-title'>{currentPost.title}</h1>
          <p className='card-text'>{currentPost.description}</p>
          <p className='card-text'>
            <strong>Price:</strong> ${currentPost.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
