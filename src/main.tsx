import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import  store, { persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <PersistGate loading={true} persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
  </React.StrictMode>
)