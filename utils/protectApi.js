function protectApi(req, res, next) {
  if (!req.user) {
    res.status(401).send('Log in to access API');
  } else {
    next();
  }
}

module.exports = protectApi;
