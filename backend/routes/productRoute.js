const router = require("express").Router();
const {
  getALlProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createUpdateReviewProduct,
  getProductReview,
  deleteReviews,
} = require("../controller/projuctController");
const { isAuthenticated, authorisedRoles } = require("../middleware/auth");

router.route("/products").get(getALlProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticated, authorisedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorisedRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorisedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/product/review").put(isAuthenticated, createUpdateReviewProduct);

router
  .route("/reviews")
  .get(getProductReview)
  .delete(isAuthenticated, deleteReviews);

module.exports = router;
