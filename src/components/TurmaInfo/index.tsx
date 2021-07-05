import { Box, Typography, Grid, useMediaQuery } from '@material-ui/core';
import theme from 'src/theme';

export interface TurmaInfoProps {
  id: number | undefined;
  nome: string | undefined;
  cod: string | undefined;
  inicio: string | Date | undefined;
  fim: string | Date | undefined;
}

const TurmaInfo: React.FC<TurmaInfoProps> = (props) => {
  const { id, nome, cod, inicio, fim } = props;

  const matchesDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      alignItems={matchesDownSm ? 'flex-start' : 'center'}
      justifyContent="space-between"
      flexDirection={matchesDownSm ? 'column' : 'row'}
      mb={4}
    >
      <Box display="flex" flexDirection="column" minWidth={350}>
        <Typography variant="body2" color="textSecondary">
          {cod}
        </Typography>
        <Typography variant="h6">
          #{id} - {nome}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justify={matchesDownSm ? 'flex-start' : 'flex-end'}
      >
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

export default TurmaInfo;
