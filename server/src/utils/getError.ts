const { errorType } = require('../constants')

interface ErrorType { 
  statusCode: number;
  statusName: string;
}

export const getError = (errorCode): ErrorType => {
  const error = Object.keys(errorType).find(key => key['statusCode'] === errorCode);
  return errorType[error] || {};
}