export class InvalidLoginError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Данные авторизации указанны неверно. Проверьте логин или почту';
    this.status = 400;
  }
}
