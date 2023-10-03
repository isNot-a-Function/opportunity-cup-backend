export const SERVER_TYPE = process.env.SERVER_TYPE;
export const HASH_COIN = Number(process.env.HASH_COIN) || 7;
export const SERVICE_NAME = process.env.SERVICE_NAME || 'opportunity-cup-backend';
export const SERVER_HOST = process.env.SERVER_HOST || '127.0.0.1';
export const SERVER_PORT = process.env.SERVER_PORT || '5100';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'COOKIE_OC_SECRET';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH';
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS';

export const SWIZE_AWS_BUCKET = process.env.SWIZE_AWS_BUCKET as string;
export const SWIZE_AWS_ACCESS_KEY = process.env.SWIZE_AWS_ACCESS_KEY as string;
export const SWIZE_AWS_SECRET_KEY = process.env.SWIZE_AWS_SECRET_KEY as string;
export const SWIZE_AWS_REGION = process.env.SWIZE_AWS_REGION as string;
export const SWIZE_SIGNED_URL_EXPIRES = process.env.SWIZE_SIGNED_URL_EXPIRES as string;
