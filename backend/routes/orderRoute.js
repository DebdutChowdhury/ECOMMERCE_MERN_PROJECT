const router = require("express").Router();
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrder,
  deleteOrder,
  updateOrders,
} = require("../controller/orderController");
const { isAuthenticated, authorisedRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticated, newOrder);

router.route("/order/:id").get(isAuthenticated, getSingleOrder);

router.route("/orders/me").get(isAuthenticated, myOrder);

router
  .route("/admin/orders/all")
  .get(isAuthenticated, authorisedRoles("admin"), getAllOrder);

router
  .route("/admin/orders/:id")
  .delete(isAuthenticated, authorisedRoles("admin"), deleteOrder)
  .put(isAuthenticated, authorisedRoles("admin"), updateOrders);

module.exports = router;
