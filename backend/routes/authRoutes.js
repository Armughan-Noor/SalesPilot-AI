const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");

const {
  register,
  login,
} = require("../controllers/authController");

router.post("/register", protect, authorize("admin"), validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;