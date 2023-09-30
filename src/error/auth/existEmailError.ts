export class ExistEmailError extends Error {
  public status: number;

  constructor () {
    super();

    this.message = 'Данной почты не существует';
    this.status = 400;
  }
}
