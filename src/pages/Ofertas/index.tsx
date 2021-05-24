import { IconButton, Tooltip } from '@material-ui/core';
import AirplayIcon from '@material-ui/icons/Airplay';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { uniqueId } from 'lodash';
import GenericContent from 'src/components/GenericContent';
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
    <GenericContent helmetText="Ofertas | Sagu" title="Ofertas">
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
    </GenericContent>
  );
};

export default Ofertas;
