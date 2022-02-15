import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(getProducts(keyword));
  }, [dispatch, error, alert, keyword]);
  console.log(productCount);
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
        </>
      )}
    </>
  );
};

export default Products;
