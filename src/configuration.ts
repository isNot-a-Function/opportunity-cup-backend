/* eslint-disable no-magic-numbers */

export const whitelistCORS: string[] = [
  'http://localhost:5000',
  'https://nikko-develop.space',
];

export const winstonConfiguration: {
  datePattern: string
  maxFiles: string
  timestampFormat: string
} = {
  datePattern: 'YYYY-MM-DD',
  maxFiles: '7d',
  timestampFormat: 'YYYY-MM-DD hh:mm:ss.SSS A',
};

export const refreshTokenConfiguration: {
  httpOnly: boolean
  maxAge: number
  sameSite: boolean | 'strict' | 'lax' | 'none' | undefined
  secure: boolean
} = {
  httpOnly: true,
  maxAge: 60 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  secure: true,
};
