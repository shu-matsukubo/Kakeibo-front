import { api, bffBaseUrl, requireData } from '@/api/client';
export { notifyAuthExpired } from '@/auth/events';

export const beginLogin = (): void => {
  window.location.assign(`${bffBaseUrl}/auth/login`);
};

export const beginToolboxLogin = (): void => {
  window.location.assign(`${bffBaseUrl}/auth/toolbox/login`);
};

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

export const loginToArcade = async (email: string, password: string): Promise<void> => {
  requireData(
    await api.POST('/auth/arcade/login', {
      body: { email, password },
    })
  );
};

export const registerWithArcade = async (email: string, password: string): Promise<void> => {
  requireData(
    await api.POST('/auth/arcade/register', {
      body: { email, password },
    })
  );
};

export const disconnectArcade = async () => requireData(await api.POST('/auth/arcade/disconnect'));

export const refreshSession = async (): Promise<void> => {
  requireData(await api.POST('/auth/refresh'));
};

export const logout = async (): Promise<void> => {
  requireData(await api.POST('/auth/logout'));
};

export const getSession = async () => requireData(await api.GET('/auth/session'));
