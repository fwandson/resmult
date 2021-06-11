import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import { ChangeEvent, ReactNode, useState } from 'react';
import SimpleTableToolbar from './SimpleTableToolbar';

type RowElement = string | number | ReactNode;

export interface SimpleTableProps {
  title: string;
  headCells: {
    value: RowElement;
    align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  }[];
  rows: RowElement[][];
  hideTablePagination?: boolean;
  onClickFilterButton?(): void;
  chips?: Array<{
    value: string | number | Date;
    label: string;
  }>;
}

// Ainda em fase de testes
const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const {
    headCells,
    rows,
    title,
    hideTablePagination,
    onClickFilterButton,
    chips,
  } = props;

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <SimpleTableToolbar
        title={title}
        onClickFilterButton={onClickFilterButton}
        disableGutters
        chips={chips}
      />
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map((cell) => (
              <TableCell key={uniqueId()} align={cell.align}>
                {cell.value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(
              page * rowsPerPage,
              hideTablePagination
                ? rows.length
                : page * rowsPerPage + rowsPerPage
            )
            .map((row, i) => (
              <TableRow key={i} hover>
                {row.map((cell, j) => (
                  <TableCell key={j} align={headCells[j].align}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={headCells.length} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!hideTablePagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Linhas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
};

export default SimpleTable;
