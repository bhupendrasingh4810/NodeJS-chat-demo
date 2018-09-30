module.exports = (req, res, next) => {
    res.responseHandler = (data, message = '', status = 200) => {
      if (data ||
              (typeof data == 'number' && isFinite(data)) ||
              typeof data == 'string' || data instanceof String) {
        data = data
      } else if (!Array.isArray(data)) {
        data = []
      }
  
      return {
        status,
        data,
        message
      }
    }
    next()
  }