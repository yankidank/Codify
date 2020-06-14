function protectApi(req, res, next) {
  if (!res.user) {
    res.status(401).send('must be logged in to access API');
  } else {
    next();
  }
}

module.exports = protectApi;