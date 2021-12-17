import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl'

import Portal from './core';

var locale = (navigator.languages && navigator.languages[0]) || navigator.language || (navigator as any).userLanguage || 'en-US';

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={Portal.messages[locale]}>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Portal.defaultTheme}>
        <Portal.DefaultApp />
      </ThemeProvider>
      </StyledEngineProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
