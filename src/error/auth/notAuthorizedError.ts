export class NotAuthorizedError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Ошибка аутентификации';
    this.status = 401;
  }
}
