const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Zod v4 uses `issues`; some older examples reference `errors`.
      const issues =
        result.error?.issues ||
        result.error?.errors ||
        [];

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: issues.map((issue) => ({
          field: issue.path?.length
            ? issue.path.join(".")
            : "body",
          message: issue.message,
        })),
      });
    }

    // Use sanitized/transformed data from Zod
    req.body = result.data;

    next();
  } catch (error) {
    console.error("Validation middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Unexpected validation error",
    });
  }
};

module.exports = validate;