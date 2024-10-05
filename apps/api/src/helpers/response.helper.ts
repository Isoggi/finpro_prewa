export const responseHandler = (
  message: any,
  data: any,
  success: boolean = true,
) => {
  return {
    message,
    data,
    success,
  };
};

export class ErrorHandler extends Error {
  statusCode: number = 500;
  constructor(message: any, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}
