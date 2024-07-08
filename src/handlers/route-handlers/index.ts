import { ResponseHandler } from "../../types/router-types";

export const handleResponse: ResponseHandler = ({ res, status, json }) => {
  const success = status >= 200 && status <= 299 ? true : false;
  res.status(status).json({
    success,
    data: json ? { ...json } : null,
  });
};
