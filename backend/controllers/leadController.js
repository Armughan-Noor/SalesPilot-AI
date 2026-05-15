const Lead = require("../models/Lead");
const asyncHandler = require("express-async-handler");
const sendResponse = require("../utils/response");

// Create Lead
const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    user: req.user._id,
  });

  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Lead created successfully",
    data: lead,
  });
});

// Get All Leads
const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Leads retrieved successfully",
    data: leads,
  });
});

// Get Single Lead
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!lead) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Lead not found",
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lead retrieved successfully",
    data: lead,
  });
});

// Update Lead
const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!lead) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Lead not found",
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lead updated successfully",
    data: lead,
  });
});

// Delete Lead
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!lead) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Lead not found",
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Lead deleted successfully",
  });
});

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
