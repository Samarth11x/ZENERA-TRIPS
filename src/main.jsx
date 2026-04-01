import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Style Imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/theme.css'
import './index.css'

// Context Providers
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { TripProvider } from './context/TripContext'
import { UIProvider } from './context/UIContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UIProvider>
      <AuthProvider>
        <TripProvider>
          <BookingProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
          </BookingProvider>
        </TripProvider>
      </AuthProvider>
    </UIProvider>
  </React.StrictMode>,
)
