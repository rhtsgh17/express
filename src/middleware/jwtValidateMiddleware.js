const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtValidateMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const bearerHeader = token.split(" ");
  const trueToken = bearerHeader[1];
  // if(!token) return res.sendStatus(401)
  console.log(token);
  if (!token)
    return res.sendStatus(401).json({
      msg: "unathorizated",
    });

  jwt.verify(trueToken, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: "fail",
        err: err,
      });
    } else {
      req.id = decoded.id;
      req.nama = decoded.nama;
      req.email = decoded.email;
      req.role = decoded.role;
      next();
    }
  });
};

module.exports = {jwtValidateMiddleware};