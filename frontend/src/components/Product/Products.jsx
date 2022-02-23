import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings]);

  let count = filteredProductsCount;
  // console.log(productCount);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Catagories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => setRatings(newRating)}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
