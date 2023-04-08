export interface CommonResponseBody {
  errorCode?: string | number;
  message?: any;
  payload?: any;
  status?: string;
}

export const createResponse = (body?: CommonResponseBody): any => ({
  errorCode: null,
  message: null,
  payload: null,
  status: null,
  ...body,
});

export const response = {
  ok: (body?: CommonResponseBody) => createResponse({ ...body, status: 'OK' }),
  error: (body?: CommonResponseBody) => createResponse({ ...body, status: 'ERROR' }),
};
