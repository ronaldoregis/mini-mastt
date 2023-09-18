import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { IncomeStatementsResponse } from '@/types';

const IncomeStatementsTable = (props: IncomeStatementsResponse) => {
  const { quarterlyReports } = props.data;
  const [filterValue, setFilterValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = quarterlyReports.filter(item => Number(item.grossProfit) > filterValue)
  const totalGrossProfit = filteredData.reduce((accumulator, currentValue) => accumulator + Number(currentValue.grossProfit), 0);
  const rows = filteredData;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage],
  );

  return (
    <>
      <div>
        <span>Minimum Gross Profit: </span>
        <input
          type="number"
          value={filterValue}
          onChange={(e) => setFilterValue(Number(e.target.value))}
        />
      </div>
    
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <Toolbar>Income Statement</Toolbar>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='small'
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Fiscal Date Ending</TableCell>
                  <TableCell align="right">Gross Profit</TableCell>
                  <TableCell align="right">Total Revenue</TableCell>
                  <TableCell align="right">Income Before Tax</TableCell>
                  <TableCell align="right">Operating Expenses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.fiscalDateEnding}</TableCell>
                      <TableCell align="right">{row.grossProfit}</TableCell>
                      <TableCell align="right">{row.totalRevenue}</TableCell>
                      <TableCell align="right">{row.incomeBeforeTax}</TableCell>
                      <TableCell align="right">{row.operatingExpenses}</TableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <div>Total Gross Profit: {totalGrossProfit}</div>
    </>
  );
}

export default IncomeStatementsTable