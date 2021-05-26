import ScheduleIcon from '@material-ui/icons/Schedule';
import { uniqueId } from 'lodash';
import ActionsMenu from 'src/components/ActionsMenu';
import GenericContent from 'src/components/GenericContent';
import FiltrosModal, {
  FiltrosModalData,
} from 'src/components/modals/FiltrosModal';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import useFiltrosModal from 'src/hooks/useFiltrosModal';

const Actions = () => (
  <ActionsMenu
    data={[
      { label: 'Salvar', icon: <ScheduleIcon fontSize="small" /> },
      { label: 'Editar', icon: <ScheduleIcon fontSize="small" /> },
      { label: 'Deletar', icon: <ScheduleIcon fontSize="small" /> },
    ]}
  />
);

const Ofertas: React.FC = () => {
  const { filtros, setOpen, ...rest } = useFiltrosModal<FiltrosModalData>({
    turma: 0,
    periodo: 0,
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
        ]}
      />
      <FiltrosModal setOpen={setOpen} filtros={filtros} {...rest} />
    </GenericContent>
  );
};

export default Ofertas;
