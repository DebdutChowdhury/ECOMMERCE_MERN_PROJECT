const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controller/userController");
const { isAuthenticated, authorisedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updatePassword);

router.route("/me/update").put(isAuthenticated, updateProile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorisedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorisedRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorisedRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorisedRoles("admin"), deleteUser);

module.exports = router;
