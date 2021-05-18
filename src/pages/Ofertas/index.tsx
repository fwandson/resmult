import { Typography } from '@material-ui/core';
import { uniqueId } from 'lodash';
import { Airplay } from 'react-feather';
import { Helmet } from 'react-helmet';
import SimpleTable from 'src/components/SimpleTable';

const Ofertas: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Ofertas | Sagu</title>
      </Helmet>
      <Typography variant="h1" gutterBottom>
        Ofertas
      </Typography>
      <SimpleTable
        title="Testando"
        headCells={['Nome', 'Idade', 'Sexo', 'Ações']}
        rows={[
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
          ['Ericson', 33, 'M', <Airplay size={14} key={uniqueId()} />],
        ]}
      />
    </div>
  );
};

export default Ofertas;
