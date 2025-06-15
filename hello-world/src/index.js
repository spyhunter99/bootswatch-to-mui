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
    },
    "MuiTable": {
      "styleOverrides": {
        "root": {
          "backgroundColor": "#272b30",
          "color": "initial",
          "borderColor": "rgba(0, 0, 0, 0.6)"
        }
      }
    },
    "MuiTableCell": {
      "styleOverrides": {
        "root": {
          "borderColor": "rgba(0, 0, 0, 0.6)"
        }
      }
    },
    "MuiTableHead": {
      "styleOverrides": {
        "root": {
          "backgroundColor": "#272b30",
          "color": "initial"
        }
      }
    },
    "MuiTableRow": {
      "styleOverrides": {
        "root": {
          "&:hover": {
            "backgroundColor": "rgba(255, 255, 255, 0.08)"
          },
          "&.Mui-selected": {
            "backgroundColor": "#007bff"
          }
        }
      }
    },
    "MuiTableBody": {
      "styleOverrides": {
        "root": {
          "backgroundColor": "transparent"
        }
      }
    },
    "MuiTextField": {
      "styleOverrides": {
        "root": {
          "backgroundColor": "#fff",
          "color": "#272b30",
          "borderColor": "rgba(0, 0, 0, 0.6)",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              "borderColor": "rgba(0, 0, 0, 0.6)"
            },
            "&:hover fieldset": {
              "borderColor": "#80bdff"
            },
            "&.Mui-focused fieldset": {
              "borderColor": "#80bdff"
            },
            "& .MuiInputLabel-root": {
              "top": "10px"
            },
            "& .MuiInputBase-input": {
              "color": "#272b30"
            }
          },
          "& .MuiInputLabel-root": {
            "color": "#7a8288",
            "&.Mui-focused": {
              "color": "#3a3f44"
            }
          },
          "& .MuiInputBase-input": {
            "color": "#272b30"
          },
          "& .MuiInputBase-input::placeholder": {
            "color": "#6c757d"
          },
          "& input:disabled": {
            "backgroundColor": "#ccc",
            "color": "#7a8288"
          }
        }
      }
    },
    "MuiInputLabel": {
      "styleOverrides": {
        "root": {
          "color": "#7a8288",
          "&.Mui-focused": {
            "color": "#3a3f44"
          }
        }
      }
    },
    "MuiSelect": {
      "styleOverrides": {
        "root": {
          "backgroundColor": "#fff",
          "color": "#272b30",
          "borderColor": "rgba(0, 0, 0, 0.6)",
          "&:hover": {
            "borderColor": "#80bdff"
          },
          "&.Mui-focused": {
            "borderColor": "#80bdff"
          },
          "& .MuiFormLabel-root": {
            "top": "20px"
          }
        }
      }
    },
    "MuiInputBase": {
      "styleOverrides": {
        "root": {
          "paddingLeft": "10px"
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

