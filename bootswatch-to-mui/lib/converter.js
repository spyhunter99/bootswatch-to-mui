import fs from 'fs';
import tinycolor from 'tinycolor2';

// Function to resolve color value references and expressions like lighten, darken, rgba
function resolveColorExpression(value, variableMap) {
  if (value && typeof value === 'string') {
    // Step 1: Resolve SCSS variable references
    if (value.startsWith('$')) {
      const variableName = value.slice(1).trim(); // Remove the dollar sign
      if (variableMap[variableName]) {
        value = variableMap[variableName]; // Resolve to actual value from the map
      } else {
        console.warn(`Warning: Variable ${variableName} not found in map`);
      }
    }

    // Step 2: Handle SCSS color functions like lighten, darken, rgba

    // Handle `lighten($color, 10%)`, `darken($color, 10%)`, `rgba($color, 0.5)`
    value = value.replace(/(lighten|darken|rgba)\(([^)]+),\s*(\d?\.?\d+)%?\)/g, (match, fn, color, percentage) => {
      // Resolve color first
      const resolvedColor = resolveColorExpression(color.trim(), variableMap);
      if (fn === 'lighten') {
        return tinycolor(resolvedColor).lighten(Number(percentage)).toHexString();
      } else if (fn === 'darken') {
        return tinycolor(resolvedColor).darken(Number(percentage)).toHexString();
      } else if (fn === 'rgba') {
        return tinycolor(resolvedColor).setAlpha(Number(percentage)).toRgbString();
      }
      return match; // In case of an unknown function
    });

    return value;
  }
  return value;
}

// Function to parse and clean the extracted SCSS variables
function extractVariables(scssContent) {
  const variableRegex = /\$([\w-]+):\s*([^;]+);/g;
  const variables = {};
  let match;

  // Extract all variables from the SCSS content
  while ((match = variableRegex.exec(scssContent))) {
    const [, name, value] = match;
    // Remove `!default` and trim spaces
    variables[name] = value.replace(/!default/g, '').trim();
  }

  return variables;
}

// Function to map extracted variables to the MUI theme structure
export function mapToMuiTheme(bootstrapVars) {
  const theme = {
    palette: {
      primary: { main: resolveColorExpression(bootstrapVars['primary'], bootstrapVars) || '#2c3e50' },
      secondary: { main: resolveColorExpression(bootstrapVars['secondary'], bootstrapVars) || '#18bc9c' },
      error: { main: resolveColorExpression(bootstrapVars['danger'], bootstrapVars) || '#dc3545' },
      warning: { main: resolveColorExpression(bootstrapVars['warning'], bootstrapVars) || '#ffc107' },
      info: { main: resolveColorExpression(bootstrapVars['info'], bootstrapVars) || '#17a2b8' },
      success: { main: resolveColorExpression(bootstrapVars['success'], bootstrapVars) || '#28a745' },
      background: {
        default: resolveColorExpression(bootstrapVars['body-bg'], bootstrapVars) || '#f8f9fa',
        paper: resolveColorExpression(bootstrapVars['card-bg'], bootstrapVars) || '#ffffff',
      },
      text: {
        primary: resolveColorExpression(bootstrapVars['body-color'], bootstrapVars) || '#212529',
        secondary: resolveColorExpression(bootstrapVars['gray-600'], bootstrapVars) || '#6c757d',
      }
    },
    typography: {
      fontFamily: bootstrapVars['font-family-base']?.replace(/['"]/g, '') || 'Roboto, sans-serif',
      fontSize: parseInt(bootstrapVars['font-size-base']) || 14,
    },
    shape: {
      borderRadius: parseInt(bootstrapVars['border-radius']) || 4,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: resolveColorExpression(bootstrapVars['white'], bootstrapVars) || '#fff', // Set button text color
            '&:hover': {
              backgroundColor: resolveColorExpression(bootstrapVars['primary'], bootstrapVars) || '#007bff', // primary hover
            },
            '&.MuiSecondary': {
              color: resolveColorExpression(bootstrapVars['gray-600'], bootstrapVars) || '#6c757d', // secondary button color
            },
          },
        },
      }
    }
  };

  return theme;
}

// Main function to convert a SCSS file to MUI theme format
export function convertTheme(filePath) {
  const scss = fs.readFileSync(filePath, 'utf-8');
  const vars = extractVariables(scss);

  // Debug: Log raw SCSS variables after cleaning up
  console.log('Extracted SCSS variables:', vars);

  return mapToMuiTheme(vars);
}
