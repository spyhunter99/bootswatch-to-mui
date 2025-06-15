import fs from 'fs';
import tinycolor from 'tinycolor2'; // A library to handle color manipulations

// Function to resolve color value references and expressions like lighten, darken, rgba
function resolveColorExpression(value, variableMap) {
  if (value && typeof value === 'string') {
    // Step 1: Handle SCSS color functions like lighten, darken, rgba
    value = value.replace(/lighten\(([^)]+),\s*(\d+)%\)/g, (match, color, percentage) => {
      const resolvedColor = resolveColorExpression(color, variableMap); // Resolve color first
      return tinycolor(resolvedColor).lighten(Number(percentage)).toHexString();
    });

    value = value.replace(/darken\(([^)]+),\s*(\d+)%\)/g, (match, color, percentage) => {
      const resolvedColor = resolveColorExpression(color, variableMap); // Resolve color first
      return tinycolor(resolvedColor).darken(Number(percentage)).toHexString();
    });

    value = value.replace(/rgba\(([^)]+),\s*(\d?\.?\d+)\)/g, (match, color, alpha) => {
      const resolvedColor = resolveColorExpression(color, variableMap); // Resolve color first
      return tinycolor(resolvedColor).setAlpha(Number(alpha)).toRgbString();
    });

    // Step 2: Resolve SCSS variable references
    if (value.startsWith('$')) {
      const variableName = value.slice(1).trim();
      value = variableMap[variableName] || value; // Resolve or return original value
    }

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
      }
    },
    typography: {
      fontFamily: bootstrapVars['font-family-base']?.replace(/['"]/g, '') || 'Roboto, sans-serif',
      fontSize: parseInt(bootstrapVars['font-size-base']) || 14,
    },
    shape: {
      borderRadius: parseInt(bootstrapVars['border-radius']) || 4,
    },
  };

  return theme;
}

// Main function to convert a SCSS file to MUI theme format
export function convertTheme(filePath) {
  const scss = fs.readFileSync(filePath, 'utf-8');
  const vars = extractVariables(scss);

  // Debug: Log raw SCSS variables after cleaning up
  console.log('Extracted Variables:', vars);

  return mapToMuiTheme(vars);
}
