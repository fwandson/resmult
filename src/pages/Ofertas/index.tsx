import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import GenericTable, { HeadCell } from 'src/components/GenericTable';

const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const Ofertas: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Ofertas | Sagu</title>
      </Helmet>
      <Typography variant="h1" gutterBottom>
        Ofertas
      </Typography>
      <GenericTable title="Teste" headCells={headCells} />
    </div>
  );
};

export default Ofertas;
