class CustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = 'CustomError';
    this.errorCode = errorCode;
  }
}

export default CustomError;
