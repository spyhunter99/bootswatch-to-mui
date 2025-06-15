import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createTheme,Box, ThemeProvider } from '@mui/material/styles';


const root = ReactDOM.createRoot(document.getElementById('root'));

const mytheme={
  "palette": {
    "primary": {
      "main": "#3a3f44"
    },
    "secondary": {
      "main": "#7a8288"
    },
    "error": {
      "main": "#ee5f5b"
    },
    "warning": {
      "main": "#f89406"
    },
    "info": {
      "main": "#5bc0de"
    },
    "success": {
      "main": "#62c462"
    },
    "background": {
      "default": "#272b30",
      "paper": "#0d0d0d"
    },
    "text": {
      "primary": "#aaa",
      "secondary": "#7a8288"
    }
  },
  "typography": {
    "fontFamily": "Roboto, sans-serif",
    "fontSize": 14
  },
  "shape": {
    "borderRadius": 4
  },
  "components": {
    "MuiButton": {
      "styleOverrides": {
        "root": {
          "color": "#fff",
          "&:hover": {
            "backgroundColor": "#3a3f44"
          },
          "&.MuiSecondary": {
            "color": "#7a8288"
          }
        }
      }
    }
  }
};

  const  theme = createTheme(mytheme);
 
    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
 

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App /></ThemeProvider>
  </React.StrictMode>
);

