export interface ResponseError {
  code: number;
  message: string;
  exist: (condition?: number | number[]) => boolean;
  set: (code: number, message: string) => void;
  clear: () => void;
}

const DEFAULT_CODE = 0;
const DEFAULT_MESSAGE = '';

export class ResponseErrorEntity implements ResponseError {
  public code;
  public message;

  constructor(code = DEFAULT_CODE, message = DEFAULT_MESSAGE) {
    this.code = code;
    this.message = message;
  }

  exist(condition?: number | number[]) {
    if (Array.isArray(condition)) {
      return !!condition.find(c => c === this.code);
    }

    if (condition) {
      return this.code === condition;
    }

    return this.code !== DEFAULT_CODE && this.message !== DEFAULT_MESSAGE;
  }

  set(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  clear() {
    this.code = DEFAULT_CODE;
    this.message = DEFAULT_MESSAGE;
  }
}
