import { Box, Typography, Grid, useMediaQuery } from '@material-ui/core';
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
          <Typography>{cargaHoraria}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            PERÍODO
          </Typography>
          <Typography>{periodo}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            INÍCIO
          </Typography>
          <Typography>{inicio}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            FIM
          </Typography>
          <Typography>{fim}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OfertaInfo;
