export class PasswordMatchError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Не правильный пароль';
    this.status = 400;
  }
}
