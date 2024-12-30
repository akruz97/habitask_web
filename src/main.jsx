import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <StrictMode>
      <BrowserRouter>
        <App />
      <ToastContainer />
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
