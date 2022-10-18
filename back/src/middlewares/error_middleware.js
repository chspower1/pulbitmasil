function errorMiddleware(error, req, res, next) {
  res.status(404).send(error.message);
}

export { errorMiddleware };
