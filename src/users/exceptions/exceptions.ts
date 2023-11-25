interface IException {
  message: string;
  error: string;
  statusCode: number;
}

export class ConflictException implements IException {
  message: 'User already exists';
  statusCode: 409;
  error: 'Conflict';
}
