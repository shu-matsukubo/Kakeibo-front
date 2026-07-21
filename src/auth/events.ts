export const AUTH_EXPIRED_EVENT = 'matsu:auth-expired';

export const notifyAuthExpired = (): void => {
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};
