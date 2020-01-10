import { getError } from './getError';

export class ApiError extends Error {
  statusCode: number;
  statusName: string;
  constructor(message: string, statusCode?: number, statusName?: string) {
    super(message);
    const error = getError(statusCode || 400);
    this.statusName = statusName || error.statusName;
    this.statusCode = statusCode || error.statusCode;
  }
}