import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { uniqueId } from 'lodash';
import ActionsMenu from 'src/components/ActionsMenu';
import GenericContent from 'src/components/GenericContent';
import FiltrosOfertasModal, {
  FiltrosOfertasModalData,
} from 'src/components/modals/FiltrosOfertasModal';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import useFiltrosOfertasModal from 'src/hooks/useFiltrosOfertasModal';

// TODO: provavelmente, essa page não é necessária
const Ofertas: React.FC = () => {
  const Actions = () => (
    <ActionsMenu
      edge="end"
      data={[
        { label: 'Salvar', icon: <ScheduleIcon fontSize="small" /> },
        { label: 'Editar', icon: <ScheduleIcon fontSize="small" /> },
        { label: 'Deletar', icon: <ScheduleIcon fontSize="small" /> },
        { label: 'Faltas', icon: <EventAvailableIcon fontSize="small" /> },
      ]}
    />
  );

  const {
    filtros,
    setOpen,
    ...rest
  } = useFiltrosOfertasModal<FiltrosOfertasModalData>({
    turma: 0,
    periodo: '',
    nucleo: 0,
    enfase: 0,
    inicio: new Date(),
    fim: new Date(),
  });

  return (
    <GenericContent
      helmetText="Ofertas | Sagu"
      title="Ofertas"
      letfTitleContent={<SearchField />}
    >
      <SimpleTable
        title="Residentes"
        onClickFilterButton={() => setOpen(true)}
        headCells={[
          {
            value: 'Nome',
            align: 'left',
          },
          {
            value: 'Idade',
            align: 'left',
          },
          {
            value: 'Sexo',
            align: 'left',
          },
          {
            value: 'Ações',
            align: 'right',
          },
        ]}
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
        ]}
      />
      <FiltrosOfertasModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default Ofertas;
