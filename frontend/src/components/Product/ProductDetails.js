import React, { useEffect } from 'react';
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from "react-alert"
import { clearError, getProductsDetails } from "../../actions/productAction"
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { Rating } from "@material-ui/lab"
import ReviewCard from "./ReviewCard.jsx"


const ProductDetails = ({ match }) => {
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productDetails)
    const alert = useAlert()
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }
    console.log(product);
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getProductsDetails(match.params.id))
    }, [dispatch, alert, error, match.params.id])
    console.log(product);
    return (
        <>{loading ? <Loader /> : (
            <>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                <div className="ProductDetails">
                    <div>
                        <Carousel>
                            {product.image &&
                                product.image.map((item, i) => (
                                    <img
                                        key={item.url}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                        className="CarouselImage"
                                    />
                                ))}
                        </Carousel>
                    </div>
                    <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <Rating {...options} />
                            <span>
                                {" "}
                                ({product.numOfReview} Reviews)
                            </span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                                <div className="detailsBlock-3-1-1">
                                    <button>-</button>
                                    <input readOnly type="number" />
                                    <button>+</button>
                                </div>
                                <button disabled={product.stock < 1 ? true : false}>Add to Cart</button>
                            </div>
                            <p>
                                Status:
                                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                </b>
                            </p>
                        </div>

                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className='submitReview'>Submit Review</button>
                    </div>
                </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews && product.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="noReviews">No Reviews yet</div>
                )}
            </>
        )}</>
    )
}

export default ProductDetails