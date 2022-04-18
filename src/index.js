import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TopBar from './components/TopBar';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <TopBar />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes />
    </BrowserRouter>
  </React.StrictMode>
);
