import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./pagination";
import {
  fetchProducts,
  setSearchTerm,
  setCurrentPage,
  clearFilters,
} from "../features/slice";
import { debounce } from "lodash";
// import "./ProductsList.css";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items,
    status,
    error,
    currentPage,
    totalProducts,
    productsPerPage,
    filters,
  } = useSelector((state) => state.products);

  // Fetch products when page, productsPerPage, or search term changes
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit: productsPerPage, // Use productsPerPage from state
        searchTerm: filters.title,
      })
    );
  }, [dispatch, currentPage, productsPerPage, filters.title]);

  // Debounced search handler
  const handleSearch = debounce((e) => {
    dispatch(setSearchTerm(e.target.value));
    dispatch(setCurrentPage(1)); // Reset to the first page when searching
  }, 500);

  // Clear filters
  const handleClearFilter = () => {
    dispatch(clearFilters());
    dispatch(setCurrentPage(1)); // Reset to the first page when clearing filters
  };

  // Handle product click navigation
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <div className='alert alert-danger text-center'>
        <h3>Error</h3>
        <p>{error}</p>
        <button
          className='btn btn-primary'
          onClick={() =>
            dispatch(fetchProducts({ page: 1, limit: productsPerPage }))
          }
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1>Products</h1>
      <div className='d-flex justify-content-between mb-4'>
        <input
          type='text'
          className='form-control w-50'
          placeholder='Search Products'
          value={filters.title || ""}
          onChange={(e) => {
            e.persist(); // Ensure the event is not pooled
            handleSearch(e);
          }}
        />
        <button className='btn btn-secondary' onClick={handleClearFilter}>
          Clear Filters
        </button>
      </div>

      <div className='row'>
        {items.map((product) => (
          <div key={product.id} className='col-md-4 mb-4'>
            <div
              className='card h-100 cursor-pointer'
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.title}
                className='card-img-top'
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>{product.description}</p>
                <p className='card-text'>
                  <strong>Price:</strong> ${product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalProducts}
        itemsPerPage={productsPerPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
      />
    </div>
  );
}

export default ProductsList;
