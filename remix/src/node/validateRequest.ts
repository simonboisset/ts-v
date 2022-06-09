import { json } from '@remix-run/node';
import { Schema } from '@ts-v/core';
import { getRequestData } from '../data/getRequestData';

export const validateRequest = async <T>(request: Request, schema: Schema<T>) => {
  const formData = await getRequestData(request);
  const { data, errors } = schema(formData);
  if (errors) {
    throw json({ errors }, { status: 400 });
  }
  return data;
};
