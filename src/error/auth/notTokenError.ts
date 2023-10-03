export class NotTokenError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Ошибка аутентификации';
    this.status = 402;
  }
}
