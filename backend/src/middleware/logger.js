// Extra logger middleware stub for candidate to enhance
export default (req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
};
