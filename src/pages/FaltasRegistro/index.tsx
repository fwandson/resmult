import { Avatar, Box, Button, TextField, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import SimpleTable from 'src/components/SimpleTable';
import TurmaInfo from 'src/components/TurmaInfo';
import useResidentes from 'src/hooks/useResidentes';
import { SaveButton } from './styles';
import AddIcon from '@material-ui/icons/Add';

interface FaltasRegistroParams {
  idTurma: string;
  idOferta: string;
}

const FaltasRegistro: React.FC = () => {
  const { idTurma, idOferta } = useParams<FaltasRegistroParams>();

  const { data: residentesData } = useResidentes({
    idTurma: Number(idTurma),
    idOferta: Number(idOferta),
  });

  const handleRows = () => {
    if (residentesData) {
      return residentesData.residentes.map((residente) => [
        <Box key="fotos" display="flex" flexDirection="column">
          <Avatar>X</Avatar>
        </Box>,
        <Box
          key="residents"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="body1">{residente.person.name}</Typography>
          <Button>Gerar Relatório</Button>
        </Box>,
        <Box key="praticas" display="flex" flexDirection="column">
          <TextField variant="outlined" />
          <Button startIcon={<AddIcon />}>Observação</Button>
        </Box>,
        <Box key="conceitual" display="flex" flexDirection="column">
          <TextField variant="outlined" />
          <Button startIcon={<AddIcon />}>Observação</Button>
        </Box>,
        <Box key="pratica" display="flex" flexDirection="column">
          <TextField variant="outlined" />
          <Button startIcon={<AddIcon />}>Observação</Button>
        </Box>,
      ]);
    }
    return [];
  };

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
        rows={handleRows()}
      />

      {/* <pre>{JSON.stringify(residentesData, null, 2)}</pre> */}
      <SaveButton variant="extended" color="secondary">
        <CheckIcon />
        Salvar
      </SaveButton>
    </GenericContent>
  );
};

export default FaltasRegistro;
