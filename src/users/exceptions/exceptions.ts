export interface IException {
  message: string;
  error: string;
  statusCode: number;
}

// export class ConflictException implements IException {
//   message: 'User already exists';
//   statusCode: 409;
//   error: 'Conflict';
// }

// export class InternalErrorException implements IException {
//   message: 'Some error occurred while processing your request';
//   statusCode: 500;
//   error: 'Internal Server Error';
// }
