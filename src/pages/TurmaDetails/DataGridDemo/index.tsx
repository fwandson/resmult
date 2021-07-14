/* eslint-disable react/display-name */
import { Typography, Box } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from '@material-ui/data-grid';

interface Teste {
  nome: string;
  idade: number;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, align: 'center' },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,

    renderCell: (params) => <Typography>Teste{params.value}</Typography>,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
  {
    field: 'teste',
    headerName: 'Teste',
    type: 'object',
    width: 250,
    editable: false,
    renderCell: (params) => {
      const { value } = params;

      if (!value) return;

      return (
        <Box>
          <Typography>{(value as Teste).idade}</Typography>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
    teste: { name: 'Ericson', idade: 33 },
  },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
];
const DataGridDemo: React.FC = () => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
    />
  );
};

export default DataGridDemo;
