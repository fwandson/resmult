/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TablePagination, // FIXME: Ver se isso é realmente necessário
  TableRow,
} from '@material-ui/core';
import { sortBy } from 'lodash';
import { useState } from 'react';
import SimpleTableHead, {
  CellElement,
  Order,
  SimpleTableHeadData,
} from './SimpleTableHead';
import SimpleTableToolbar from './SimpleTableToolbar';

export interface SimpleTableProps {
  title: string;
  headCells: SimpleTableHeadData[];
  rows: CellElement[][];
  hideTablePagination?: boolean;
  onClickFilterButton?(): void;
  chips?: Array<{
    value: string | number | Date;
    label: string;
  }>;
  initialOrderBy: string;
}

const SimpleTable: React.FC<SimpleTableProps> = (props) => {
  const {
    headCells,
    rows,
    title,
    hideTablePagination,
    onClickFilterButton,
    chips,
    initialOrderBy,
  } = props;

  // Estou enviando momentaneamente para pode atualizar o serviço.
  // FIXME: Resolver isso depois.

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [order, setOrder] = useState<Order>('asc');

  const [orderBy, setOrderBy] = useState(initialOrderBy);

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');

    setOrderBy(property);
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
        <SimpleTableHead
          data={headCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {sortBy(rows, orderBy)
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
      {/* {!hideTablePagination && (
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
      )} */}
    </TableContainer>
  );
};

export default SimpleTable;
