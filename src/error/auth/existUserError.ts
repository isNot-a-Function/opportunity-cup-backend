export class ExistUserError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Пользователь с таким логином или почтой уже существует';
    this.status = 400;
  }
}
