const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(`🚀CHECK > err:`, err);
  res.status(500).json({ msg: "There was an error" });
};

export default errorHandlerMiddleware;
