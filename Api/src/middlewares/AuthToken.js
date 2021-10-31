const JWT = require("jsonwebtoken");
const { AUTH_SECRET } = process.env;

module.exports = function (req, res, next) {
  if (req.path.slice(0, 7) === "/client") {
    return next();
  }

  if (!req.headers.authorization && req.path.slice(0, 7) !== "/client") {
    res.status(404).send({ message: "No tienes permisos" });
  } else
    JWT.verify(
      req.headers.authorization.split(" ")[1],
      AUTH_SECRET,
      function (error, decoded) {
        error
          ? res.status(404).send({ message: "No tienes permisos" })
          : !decoded.IsAdmin
          ? res.status(404).send({ message: "No tienes permisos" })
          : next();
      }
    );
};
