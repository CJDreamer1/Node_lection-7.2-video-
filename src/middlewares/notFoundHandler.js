function notFoundHandler(_req, res) {
  //_req написано замість req, бо цей параметр нам не потрібен, але без нього не підгрузиться другий - res, а він нам потрібен
  res.status(404).send({ status: 404, message: "Route not found" });
}

export { notFoundHandler };
