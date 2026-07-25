import { LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';

import type { FormEvent } from 'react';

import { login, register } from '@/auth/session';
import { Button } from '@/components/common/Button';
import './login.css';

interface Props {
  onAuthenticated: () => void;
}

type Mode = 'login' | 'register';

export const LoginPage = ({ onAuthenticated }: Props) => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }

      onAuthenticated();
    } catch {
      setError(
        isRegister
          ? '登録に失敗しました。メールアドレスとパスワードを確認してください。'
          : 'ログインに失敗しました。メールアドレスとパスワードを確認してください。'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-panel__header">
          <h1 id="auth-title">Kakeibo</h1>
          <div className="auth-mode" role="tablist" aria-label="認証モード">
            <button
              type="button"
              className={mode === 'login' ? 'is-active' : ''}
              onClick={() => setMode('login')}
              role="tab"
              aria-selected={mode === 'login'}
            >
              ログイン
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'is-active' : ''}
              onClick={() => setMode('register')}
              role="tab"
              aria-selected={mode === 'register'}
            >
              登録
            </button>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            メールアドレス
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            パスワード
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              minLength={8}
              required
            />
          </label>

          {error && <p className="auth-form__error">{error}</p>}

          <Button
            type="submit"
            loading={loading}
            leftIcon={isRegister ? <UserPlus size={18} /> : <LogIn size={18} />}
          >
            {isRegister ? '登録して開始' : 'ログイン'}
          </Button>
        </form>
      </section>
    </main>
  );
};
