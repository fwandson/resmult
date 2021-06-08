import { Box, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { format } from 'date-fns';
import theme from 'src/theme';

export interface OfertaInfoProps {
  nome: string | undefined;
  cod: string | undefined;
  inicio: string | Date | undefined;
  fim: string | Date | undefined;
  cargaHoraria: string | number | undefined;
  periodo: string | number | undefined;
}

const OfertaInfo: React.FC<OfertaInfoProps> = (props) => {
  const { nome, cod, inicio, fim, cargaHoraria, periodo } = props;

  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      alignItems={matchesDownSm ? 'flex-start' : 'center'}
      justifyContent="space-between"
      flexDirection={matchesDownSm ? 'column' : 'row'}
      mb={4}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" color="textSecondary" noWrap>
          {cod}
        </Typography>
        <Typography variant="h6" noWrap>
          {nome}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justify={matchesDownSm ? 'flex-start' : 'flex-end'}
      >
        <Grid item>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            CH PREVISTA
          </Typography>
          <Typography>{`${cargaHoraria}h`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            PERÍODO
          </Typography>
          <Typography>{periodo}</Typography>
        </Grid>
        {inicio && (
          <Grid item>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              INÍCIO
            </Typography>
            <Typography>{format(new Date(inicio), 'dd/MM/yyyy')}</Typography>
          </Grid>
        )}
        {fim && (
          <Grid item>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              INÍCIO
            </Typography>
            <Typography>{format(new Date(fim), 'dd/MM/yyyy')}</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default OfertaInfo;
