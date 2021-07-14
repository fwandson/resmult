import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import { uniqueId } from 'lodash';
import { ReactNode } from 'react';

export type RowElement = string | number;

export type CellElement = string | number | ReactNode;

export type Order = 'asc' | 'desc';

export interface SimpleTableHeadData {
  id: string;
  value: CellElement;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  sorted?: boolean;
}

export interface SimpleTableHeadProps {
  data: SimpleTableHeadData[];
  order: Order;
  orderBy: string;
  onRequestSort: (property: string) => void;
}

const SimpleTableHead: React.FC<SimpleTableHeadProps> = (props) => {
  const { data, order, orderBy, onRequestSort } = props;

  return (
    <TableHead>
      <TableRow>
        {data.map((cell) => (
          <TableCell key={uniqueId()} align={cell.align}>
            {cell.sorted ? (
              <TableSortLabel
                active={orderBy === cell.id}
                direction={order}
                onClick={() => onRequestSort(cell.id)}
              >
                <Typography variant="body1">{cell.value}</Typography>
              </TableSortLabel>
            ) : (
              <Typography variant="body1">{cell.value}</Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default SimpleTableHead;
