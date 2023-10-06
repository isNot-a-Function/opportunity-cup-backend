export interface IGetUser {
  userId: string
}

export interface IAddLogo {
  logo: string
}

export interface IGetUserBalance {
  page?: string
}

export interface IUpdateUser {
  name?: string | null;
  family?: string | null;
}
