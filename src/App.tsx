import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { usePosStore } from './stores/posStore';

function App() {
  const { setCurrentUser } = usePosStore();

  useEffect(() => {
    // Initialize with a default user for demo purposes
    // In a real app, this would be handled by authentication
    setCurrentUser({
      id: '1',
      name: 'Admin User',
      email: 'admin@pos.com',
      role: 'admin',
    });
  }, [setCurrentUser]);

  return (
    <ErrorBoundary>
      <div className="App">
        <MainLayout />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;