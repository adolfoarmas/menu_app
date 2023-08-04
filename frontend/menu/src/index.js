import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import reportWebVitals from './reportWebVitals';
import { IndexWrapper } from './styles/css';
import App from './App';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
    en: {
      translation: require('./translations/en.json')
    },

    es: {
      translation: require('./translations/es.json')
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <IndexWrapper>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </IndexWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

