class ApiError {
  constructor(statusCode, reasonPhrase, message, data) {
    this.statusCode = statusCode;
    this.reasonPhrase = reasonPhrase;
    this.message = message;
    this.data = data;
  }
}

export { ApiError };
