import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { CssBaseline, createTheme,Box, ThemeProvider } from '@mui/material/styles';
function App() {

  
function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


  return (
    
    <div className="App">
      <h1>Hello World!</h1>
      <Button variant="contained" color="primary">
            Click Me
          </Button>
          <Button variant="contained" color="secondary">
            Click Me
          </Button>
          <Button variant="contained" color="info">
            Click Me
          </Button>
          <Button variant="contained" color="success">
            Click Me
          </Button>
          <Button variant="contained" color="warning">
            Click Me
          </Button>
          <Button variant="contained" color="error">
            Click Me
          </Button>
          normal text
          <Checkbox>test</Checkbox>
          <Paper style={{ height: 400, width: '100%' }}>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table"
        hover={true}
      >
        <TableHead>
          <TableRow className='primary'>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover={true}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Paper>
    </div>
 
  );
}
export default App;