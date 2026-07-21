import { api, requireData } from '@/api/client';
export { notifyAuthExpired } from '@/auth/events';

export const login = async (email: string, password: string): Promise<void> => {
  requireData(
    await api.POST('/auth/login', {
      body: { email, password },
    })
  );
};

export const register = async (email: string, password: string): Promise<void> => {
  requireData(
    await api.POST('/auth/register', {
      body: { email, password },
    })
  );
};

export const refreshSession = async (): Promise<void> => {
  requireData(await api.POST('/auth/refresh'));
};

export const logout = async (): Promise<void> => {
  requireData(await api.POST('/auth/logout'));
};

export const getSession = async () => requireData(await api.GET('/auth/session'));
