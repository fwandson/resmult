import CheckIcon from '@material-ui/icons/Check';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import TurmaInfo from 'src/components/TurmaInfo';
import { SaveButton } from './styles';

interface FaltasRegistro {
  idTurma: string;
  idOferta: string;
}

const FaltasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<FaltasRegistro>();

  return (
    <GenericContent
      helmetText="Registro de faltas | Sagu"
      title="Registro de faltas"
      letfTitleContent={<SearchField />}
    >
      <TurmaInfo
        cod="T2HOSPITALAR"
        nome="Turma || - Hospitalar"
        inicio="20/20/2020"
        fim="20/20/2020"
        cargaHoraria={1000}
        periodo="Segundo Pedíodo"
      />

      <SimpleTable
        title="Residentes"
        headCells={[
          'Foto',
          'Residente',
          'Prática (375 Horas)',
          'Teórico-conceitual (ead+presencial) (340 Horas)',
          'Teórico-prática (campo+núcleo) (334 Horas)',
        ]}
        rows={[
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
          ['Ericson', 33, 'M', '', ''],
        ]}
      />

      <SaveButton variant="extended" color="secondary">
        <CheckIcon />
        Salvar
      </SaveButton>
    </GenericContent>
  );
};

export default FaltasRegistro;
