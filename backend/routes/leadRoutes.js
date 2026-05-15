const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");

const {
  createLeadSchema,
  updateLeadSchema,
} = require("../validations/leadValidation");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

router.use(protect);

router
  .route("/")
  .post(validate(createLeadSchema), createLead)
  .get(getLeads);

router
  .route("/:id")
  .get(getLeadById)
  .put(validate(updateLeadSchema), updateLead)
  .delete(deleteLead);

module.exports = router;