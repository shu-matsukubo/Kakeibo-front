import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

import './App.css';
import { AUTH_EXPIRED_EVENT } from './auth/events';
import { getSession, logout } from './auth/session';
import { Button } from './components/common/Button';
import { IconSample } from './components/icons';
import { LoginPage } from './pages/auth/LoginPage';
import CreateIndex from './pages/expenses/CreateIndex';
import SummaryIndex from './pages/expenses/SummaryIndex';

import './styles/utilities/index.css';
import './styles/index.css';
function App() {
  const [page, setPage] = useState<'summary' | 'create'>('summary');
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const handleExpired = () => {
      setAuthenticated(false);
      setPage('summary');
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);

    getSession()
      .then(session => {
        setAuthenticated(session.authenticated);
      })
      .catch(() => {
        setAuthenticated(false);
      })
      .finally(() => {
        setCheckingSession(false);
      });

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
    };
  }, []);

  const handleLogout = async () => {
    await logout().catch(() => undefined);
    setAuthenticated(false);
    setPage('summary');
  };

  if (checkingSession) {
    return null;
  }

  if (!authenticated) {
    return <LoginPage onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="app-toolbar">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          leftIcon={<LogOut size={16} />}
        >
          ログアウト
        </Button>
      </div>

      {page === 'summary' && <SummaryIndex />}
      {page === 'create' && <CreateIndex onBack={() => setPage('summary')} />}

      {page === 'summary' && (
        <>
          <Button onClick={() => setPage('create')} leftIcon={<IconSample />}>
            追加
          </Button>
        </>
      )}
    </div>
  );
}

export default App;
