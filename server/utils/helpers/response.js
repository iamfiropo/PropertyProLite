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
}

export default Response;
