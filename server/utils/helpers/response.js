class Response {
  static handleError(statusCode, error, res) {
    res.status(statusCode).json({
      status: statusCode,
      error,
    });
  }

  static handleSuccess(statusCode, message, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  }

  static handleDelete(statusCode, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      data,
    });
  }
}

export default Response;
