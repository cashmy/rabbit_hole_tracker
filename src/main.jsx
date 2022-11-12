import React from 'react'
import ReactDOM from 'react-dom/client'

import { StyledEngineProvider } from '@mui/joy/styles';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
