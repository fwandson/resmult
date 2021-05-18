import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import SimpleTable from 'src/components/SimpleTable';

interface TurmaDetailsParams {
  id: string;
}

//TODO: acho que seria legal aqui colocar um Card para mostrar as informações da turma
const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  return (
    <div>
      <Helmet>
        <title>Turma | Sagu</title>
      </Helmet>
      <Typography variant="h1" gutterBottom>
        Turma
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Informações da Turma
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Informações da Turma
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Informações da Turma
      </Typography>
      <SimpleTable
        title={`Ofertas da Turma ${id}`}
        headCells={['Nome aluno', 'Idade', 'Sexo']}
        rows={[
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
          ['Ericson', 33, 'M'],
        ]}
      />
    </div>
  );
};

export default TurmaDetails;
