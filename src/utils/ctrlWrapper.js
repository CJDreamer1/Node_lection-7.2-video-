function ctrlWrapper(controller) {
  return async (req, res, next) => {
    try {
      awaitcontroller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
export { ctrlWrapper };
