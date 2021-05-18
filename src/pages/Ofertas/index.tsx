import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { uniqueId } from 'lodash';
import {
  Airplay as AirplayIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Command as CommandIcon,
} from 'react-feather';
import { Helmet } from 'react-helmet';
import SimpleTable from 'src/components/SimpleTable';

const Actions = () => (
  <>
    <Tooltip title="title" arrow>
      <IconButton>
        <AirplayIcon size={14} />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <CommandIcon size={14} />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <ClockIcon size={14} />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <CalendarIcon size={14} />
      </IconButton>
    </Tooltip>
  </>
);

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
        title="Residentes"
        headCells={['Nome', 'Idade', 'Sexo', 'Ações']}
        rows={[
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
          ['Ericson', 33, 'M', <Actions key={uniqueId()} />],
        ]}
      />
    </div>
  );
};

export default Ofertas;
