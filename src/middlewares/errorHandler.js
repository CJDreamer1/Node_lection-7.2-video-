import { isHttpError } from "http-errors";

function errorHandler(error, _req, res, _next) {
  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }
  //_req написано замість req, бо цей параметр нам не потрібен, але без нього не підгрузиться другий - res, а він нам потрібен
  //нижнє підкреслення перед _next потрібно просто жоб не матюкався ESLINT
  res.status(500).send({
    status: 500,
    message: "Internal server error",
  });
}
export { errorHandler };
