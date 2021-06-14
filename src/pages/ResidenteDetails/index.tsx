import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  createStyles,
  Theme,
  makeStyles,
} from '@material-ui/core';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import useResidentes from 'src/hooks/useResidentes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
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

  const { data, findResidente } = useResidentes({
    idOferta,
    idTurma,
  });

  const residente = findResidente({ id: Number(idResidente) });

  return (
    <GenericContent
      helmetText="Residente | Sagu"
      title="Residente"
      isLoading={!data}
    >
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar
              className={classes.large}
              src={`/static/images/avatars/avatar_${
                (Number(idResidente) % 11) + 1
              }.png`}
            >
              {idResidente}
            </Avatar>
            <Box ml={2}>
              <Typography variant="h2">{residente?.person.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {residente?.nucleoProfissional.descricao}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Instituição executora:{' '}
              {residente?.instituicaoExecutoraPerson.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Instituição formadora:{' '}
              {residente?.instituicaoFormadoraPerson.name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </GenericContent>
  );
};

export default ResidenteDetails;
