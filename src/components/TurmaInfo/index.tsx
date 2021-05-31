import { Box, Typography } from '@material-ui/core';

export interface TurmaInfoProps {
  nome: string;
  cod: string;
  inicio: string;
  fim: string;
  cargaHoraria?: number;
  periodo?: string;
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
      <Box display="flex">
        {cargaHoraria && (
          <Box display="flex" flexDirection="column" mr={1}>
            <Typography variant="body2" color="textSecondary">
              CH PREVISTA
            </Typography>
            <Typography>{cargaHoraria}</Typography>
          </Box>
        )}
        {periodo && (
          <Box display="flex" flexDirection="column" mr={1}>
            <Typography variant="body2" color="textSecondary">
              PERÍODO
            </Typography>
            <Typography>{periodo}</Typography>
          </Box>
        )}

        <Box display="flex" flexDirection="column" mr={1}>
          <Typography variant="body2" color="textSecondary">
            INÍCIO
          </Typography>
          <Typography>{inicio}</Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="body2" color="textSecondary">
            FIM
          </Typography>
          <Typography>{fim}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TurmaInfo;
