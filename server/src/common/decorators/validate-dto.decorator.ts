import {
  UsePipes,
  ValidationPipe,
  ValidationPipeOptions,
} from "@nestjs/common";

const defaultValidateOptions = {
  whitelist: true,
  validationError: {
    target: false,
    value: false,
  },
};

export const ValidateDTO = (options?: ValidationPipeOptions) =>
  UsePipes(
    new ValidationPipe({
      ...defaultValidateOptions,
      ...options,
    })
  );
