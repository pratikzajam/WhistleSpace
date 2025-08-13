import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SecretKeyProvider } from './Context/userContext.jsx'
import './index.css'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import { AdminProvider } from './Context/adminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SecretKeyProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </SecretKeyProvider>
    </BrowserRouter>
  </StrictMode>,
)
