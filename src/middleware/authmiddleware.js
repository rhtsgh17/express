function authMiddleware(req, res, next) {
    // let token = req.header
    console.log("middleware telah di panggil");
    console.log("header", req.headers);
  
    if (req?.headers?.authorization === "123") {
      next();
    } else {
      return res.status(401).json({
        status: "fail",
        msg: "Token tdk Di temukan",
      });
    }
  };
  
  
  
  
  
  module.exports = authMiddleware;