import createClient from 'openapi-fetch';

import type { paths } from '@/api/generated/schema';
import type { Middleware } from 'openapi-fetch';

import { notifyAuthExpired } from '@/auth/events';

const configuredBffBaseUrl: unknown = import.meta.env.VITE_BFF_BASE_URL;
const bffBaseUrl =
  typeof configuredBffBaseUrl === 'string' ? configuredBffBaseUrl : 'http://localhost:18082';
const retryableRequests = new WeakMap<Request, Request>();
let refreshPromise: Promise<void> | null = null;

const refreshSession = async (): Promise<void> => {
  const response = await fetch(`${bffBaseUrl}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Session refresh failed.');
  }
};

const sessionRetryMiddleware: Middleware = {
  onRequest({ request, schemaPath }) {
    if (schemaPath.startsWith('/api/')) {
      retryableRequests.set(request, request.clone());
    }
  },
  async onResponse({ request, response, schemaPath }) {
    if (!schemaPath.startsWith('/api/') || response.status !== 401) {
      return;
    }

    const retryRequest = retryableRequests.get(request);

    if (!retryRequest) {
      return;
    }

    try {
      refreshPromise ??= refreshSession().finally(() => {
        refreshPromise = null;
      });

      await refreshPromise;
      return fetch(retryRequest);
    } catch {
      notifyAuthExpired();
      return response;
    }
  },
};

export const api = createClient<paths>({
  baseUrl: bffBaseUrl,
  credentials: 'include',
});

api.use(sessionRetryMiddleware);

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
