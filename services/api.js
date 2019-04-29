module.exports = function api(middleware) {

  async function apiMiddleware(req, res, next) {
    try {
      const data = await middleware(req, res, next)
      res.json(data)
    } catch(error) {
      next(error)
    }
  }

  apiMiddleware.api = middleware

  return apiMiddleware
}