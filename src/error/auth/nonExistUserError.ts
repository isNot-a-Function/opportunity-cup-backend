export class NonExistUserError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Пользователя с таким логином или почтой не существует';
    this.status = 401;
  }
}
