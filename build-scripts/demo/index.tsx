import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import Portal from './core';

declare module '*.png'

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Portal.defaultTheme}>
        <Portal.DefaultApp />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
