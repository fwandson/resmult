import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import usePessoa from 'src/hooks/usePessoa';
import useResidentes from 'src/hooks/useResidentes';
import NAMES from 'src/routes/names';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  })
);

interface ResidenteDetailsParams {
  idTurma: string;
  idOferta: string;
  idResidente: string;
}

const ResidenteDetails: React.FC = () => {
  const {
    idTurma,
    idOferta,
    idResidente,
  } = useParams<ResidenteDetailsParams>();

  const classes = useStyles();

  const { data: residentesDataReturn, findResidente } = useResidentes({
    idOferta,
    idTurma,
  });

  const residente = findResidente({ id: Number(idResidente) });

  const { data: pessoa } = usePessoa({
    idPessoa: Number(residente?.person.id),
  });

  return (
    <GenericContent
      helmetText="Residente | Sagu"
      title="Residente"
      isLoading={!residentesDataReturn || !pessoa}
      breadcrumbsLinks={[
        { label: 'MINHAS TURMAS', href: NAMES.TURMAS },
        { label: 'RESIDENTE' },
      ]}
    >
      <Container maxWidth="md" disableGutters>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                className={classes.avatar}
                src={residente?.person.photourl}
              >
                {residente?.person.name[0]}
              </Avatar>
            }
            title={residente?.person.name}
            subheader={residente?.nucleoProfissional.descricao}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Informações
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Instituição executora:{' '}
                  {residente?.instituicaoExecutoraPerson.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Instituição formadora:{' '}
                  {residente?.instituicaoFormadoraPerson.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Email: {pessoa?.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Celular: {pessoa?.celular}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Telefone residencial: {pessoa?.telefoneResidencial}
                </Typography>
              </Grid>
              <Grid item sm={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Endereço
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Logradouro: {pessoa?.logradouro}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Número: {pessoa?.numero}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Bairro: {pessoa?.bairro}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Cep: {pessoa?.cep}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Cidade: {pessoa?.cidade.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Estado: {pessoa?.cidade.estado.nome}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      <Box m={2} />
    </GenericContent>
  );
};

export default ResidenteDetails;
