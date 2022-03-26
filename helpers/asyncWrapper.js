// Мидлвар для универсальной замены try catch в контроллерах
const asyncWrapper = controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  asyncWrapper,
};
