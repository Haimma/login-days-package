const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, "secret_this_should_be_loneger_login-days-package");
    req.userData = {email: decodeToken.email, userId: decodeToken.userId };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Auth failed!" });
  }
};
