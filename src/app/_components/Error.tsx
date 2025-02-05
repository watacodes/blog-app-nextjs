"use client";

import { CustomError } from "../_types/CustomError";

type Props = {
  error: CustomError;
};

const ErrorComponent: React.FC<Props> = ({ error }) => {
  return (
    <div>
      Oops, something wrong happened! - {error.code}: {error.message}
    </div>
  );
};

export default ErrorComponent;
