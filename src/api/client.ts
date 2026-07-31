import createClient from 'openapi-fetch';

import type { paths } from '@/api/generated/schema';
import type { Middleware } from 'openapi-fetch';

import { notifyAuthExpired } from '@/auth/events';

const configuredBffBaseUrl: unknown = import.meta.env.VITE_BFF_BASE_URL;
export const bffBaseUrl =
  typeof configuredBffBaseUrl === 'string' ? configuredBffBaseUrl : 'http://localhost:18082';

const matsuApiPath = (schemaPath: string): boolean =>
  schemaPath.startsWith('/api/expenses') ||
  schemaPath === '/api/payment-methods' ||
  schemaPath === '/api/categories';

const sessionMiddleware: Middleware = {
  onResponse({ response, schemaPath }) {
    if (response.status === 401 && matsuApiPath(schemaPath)) {
      notifyAuthExpired();
    }
  },
};

export const api = createClient<paths>({
  baseUrl: bffBaseUrl,
  credentials: 'include',
});

api.use(sessionMiddleware);

type ApiResult<T> =
  | {
      data: T;
      error?: never;
      response: Response;
    }
  | {
      data?: never;
      error: unknown;
      response: Response;
    };

const errorMessage = (error: unknown, response: Response): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === 'string') {
      return message;
    }
  }

  return `BFF request failed: ${response.status} ${response.statusText}`;
};

export class BffApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(response: Response, details: unknown) {
    super(errorMessage(details, response));
    this.status = response.status;
    this.details = details;
  }
}

export const requireData = <T>(result: ApiResult<T>): NonNullable<T> => {
  if ('error' in result) {
    throw new BffApiError(result.response, result.error);
  }

  if (result.data == null) {
    throw new BffApiError(result.response, { message: 'BFF returned an empty response.' });
  }

  return result.data;
};
