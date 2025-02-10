export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const END_POINT = {
  NAVER_LOGIN: '/oauth2/authorization/naver',
  LOGOUT: '/logout',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
