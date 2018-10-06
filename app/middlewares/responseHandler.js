'use strict'
module.exports = (req, res, next) => {
  res.responseHandler = (data, message = [], status = 200) => {
    if ((Object.keys(data).length && typeof data === 'object') || (typeof data === 'number' && isFinite(data)) || typeof data === 'string' || data instanceof String) {
      data = [data]
    } else if (Array.isArray(data)) {
    } else {
      data = []
    }

    if (typeof message === 'string' || message instanceof String) {
      message = [message]
    }

    return {
      status,
      data,
      message
    }
  }
  next()
}