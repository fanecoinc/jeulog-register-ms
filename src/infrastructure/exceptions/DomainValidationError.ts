export class DomainValidationError extends Error {
  public readonly code: string;

  constructor(message: string, code: string = 'DomainValidationError') {
    super(message);
    this.name = 'DomainValidationError';
    this.code = code;
  }
}
