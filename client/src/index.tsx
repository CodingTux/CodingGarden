import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme.js";
import 'reactjs-popup/dist/index.css';
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
