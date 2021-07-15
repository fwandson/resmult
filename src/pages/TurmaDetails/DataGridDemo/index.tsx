import { Typography, Box } from '@material-ui/core';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridCellParams,
} from '@material-ui/data-grid';

interface Teste {
  nome: string;
  idade: number;
}

const renderCellTeste = (params: GridCellParams) => {
  const { idade, nome } = params.value as Teste;

  return (
    <Box display="flex">
      <Typography>{idade}</Typography>
      <Typography>{nome}</Typography>
    </Box>
  );
};

const renderCellFirstName = (params: GridCellParams) => {
  return <Typography>{params.value}</Typography>;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, align: 'left' },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
    renderCell: renderCellFirstName,
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
    renderCell: renderCellTeste,
  },
];

const rows = [
  {
    id: 1,
    lastName: 'Snow',
    firstName: 'Jon',
    age: 35,
    teste: { nome: 'Ericson', idade: 33 },
  },
  {
    id: 2,
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
    teste: { nome: 'Ericson', idade: 33 },
  },
  {
    id: 3,
    lastName: 'Lannister',
    firstName: 'Cersei',
    age: 42,
    teste: { nome: 'Ericson', idade: 33 },
  },
];

const DataGridDemo: React.FC = () => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      disableSelectionOnClick
    />
  );
};

export default DataGridDemo;
