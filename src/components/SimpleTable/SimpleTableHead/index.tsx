import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import { ReactNode } from 'react';

export type RowElement = string | number | ReactNode;

export type Order = 'asc' | 'desc';

export interface SimpleTableHeadData {
  id: string;
  value: RowElement;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  sorted?: boolean;
}

export interface SimpleTableHeadProps {
  data: SimpleTableHeadData[];
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const SimpleTableHead: React.FC<SimpleTableHeadProps> = (props) => {
  const { data, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {data.map((cell) =>
          cell.sorted ? (
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.value}
              {orderBy === cell.value ? (
                <span>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          ) : (
            <TableCell key={uniqueId()} align={cell.align}>
              {cell.value}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default SimpleTableHead;
