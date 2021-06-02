import { Box, Typography, Grid } from '@material-ui/core';

export interface TurmaInfoProps {
  nome?: string;
  cod?: string;
  inicio?: string;
  fim?: string;
  cargaHoraria?: string | number;
  periodo?: string | number;
}

const TurmaInfo: React.FC<TurmaInfoProps> = (props) => {
  const { nome, cod, inicio, fim, cargaHoraria, periodo } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={4}
    >
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" color="textSecondary">
          {cod}
        </Typography>
        <Typography variant="h6">{nome}</Typography>
      </Box>

      <Grid container spacing={2} justify="flex-end">
        {cargaHoraria && (
          <Grid item>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              CH PREVISTA
            </Typography>
            <Typography>{cargaHoraria}</Typography>
          </Grid>
        )}
        {periodo && (
          <Grid item>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              PERÍODO
            </Typography>
            <Typography>{periodo}</Typography>
          </Grid>
        )}
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
