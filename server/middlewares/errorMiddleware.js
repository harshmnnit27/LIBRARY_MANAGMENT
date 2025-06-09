class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const login = (req, res, next) => {}; // placeholder

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  // MongoDB duplicate‑key error
  if (err.code === 11000) {
    err = new ErrorHandler("Duplicate field value entered", 400);
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("JSON Web Token is invalid. Try again.", 400);
  }

  // Expired JWT                      ↓↓↓ corrected
  if (err.name === "TokenExpiredError") {                // <<<
    err = new ErrorHandler("JSON Web Token has expired. Try again.", 400); // <<<
  }

  // Wrong Mongo ObjectId             ↓↓↓ corrected
  if (err.name === "CastError") {                        // <<<
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400); // <<<
  }

  const errorMessage = err.errors
    ? Object.values(err.errors).map(e => e.message).join(" ")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
