import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SearchField from 'src/components/SearchField';
import TurmaInfo from 'src/components/TurmaInfo';
import useResidentes from 'src/hooks/useResidentes';
import { SaveButton } from './styles';

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

      <Card>
        <Grid container component={CardContent} spacing={2}>
          <Grid item xs={1}>
            <Typography variant="body1">Foto</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">Residente</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body1">Prática (375 Horas)</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              Teórico-conceitual (ead+presencial) (340 Horas)
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              Teórico-prática (campo+núcleo) (334 Horas)
            </Typography>
          </Grid>

          {residentesData?.residentes.map((residente) => (
            <>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={1}>
                <Avatar>X</Avatar>
              </Grid>
              <Grid
                container
                item
                xs={3}
                justify="space-between"
                direction="column"
              >
                <Grid item>
                  <Typography>{residente.person.name}</Typography>
                </Grid>
                <Grid item>
                  <Button>Gerar Relatório</Button>
                </Grid>
              </Grid>
              <Grid item xs={2} justify="space-between">
                <TextField fullWidth variant="outlined" />
                <Box m={1} />
                <Button fullWidth startIcon={<AddIcon />}>
                  Observação
                </Button>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth variant="outlined" />
                <Box m={1} />
                <Button fullWidth startIcon={<AddIcon />}>
                  Observação
                </Button>
              </Grid>
              <Grid item xs={3}>
                <TextField fullWidth variant="outlined" />
                <Box m={1} />
                <Button fullWidth startIcon={<AddIcon />}>
                  Observação
                </Button>
              </Grid>
            </>
          ))}
        </Grid>
      </Card>
      <Box m={2} />
      <SaveButton variant="extended" color="secondary">
        <CheckIcon />
        Salvar
      </SaveButton>
    </GenericContent>
  );
};

export default FaltasRegistro;
