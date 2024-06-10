import errors from '../lib/error-codes.js';

export default function errorHandler(err, req, res, next) {
  console.log("========d=d=d=d=d=")
  res.status(errors.INTERNAL.status).json({ error: err.message });
}
