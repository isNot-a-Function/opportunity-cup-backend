export class InvalidRefreshTokenError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Токен не прошел проверку';
    this.status = 400;
  }
}
