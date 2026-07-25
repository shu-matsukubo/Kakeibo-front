import { LogIn } from 'lucide-react';

import { beginLogin } from '@/auth/session';
import { Button } from '@/components/common/Button';
import './login.css';

export const LoginPage = () => (
  <main className="auth-page">
    <section className="auth-panel" aria-labelledby="auth-title">
      <div className="auth-panel__header">
        <p className="auth-panel__eyebrow">matsu</p>
        <h1 id="auth-title">ログインが必要です</h1>
        <p>matsuアカウントの認証画面へ移動します。</p>
      </div>

      <Button type="button" onClick={beginLogin} leftIcon={<LogIn size={18} />}>
        ログイン・新規登録
      </Button>
    </section>
  </main>
);
