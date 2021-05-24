import { IconButton, Tooltip, Typography } from '@material-ui/core';
import AirplayIcon from '@material-ui/icons/Airplay';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { uniqueId } from 'lodash';
import { Helmet } from 'react-helmet';
import SimpleTable from 'src/components/SimpleTable';

const Actions = () => (
  <>
    <Tooltip title="title" arrow>
      <IconButton>
        <AirplayIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <ChatBubbleIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <ScheduleIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    <Tooltip title="title" arrow>
      <IconButton>
        <CalendarTodayIcon fontSize="small" />
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
