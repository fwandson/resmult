import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { reduce } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import CHComplementarCardInfo from 'src/components/CHComplementarCardInfo';
import { GetResidentesNames } from 'src/resources/turmas/types';

export interface ViewCHComplementarModalProps extends DialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  residente: GetResidentesNames.Residente | undefined;
}

export interface ViewCHComplementarModalFormData {
  chComplementar: number;
  tipoCh: number;
  tipoChComplementar: number;
  descricao: string;
}

const ViewCHComplementarModal: React.FC<ViewCHComplementarModalProps> = (
  props
) => {
  const { open, setOpen, residente, ...rest } = props;

  const totalCHComplementates = reduce(
    residente?.cargahorariacomplementar,
    (sum, elem) => sum + Number(elem.cargaHoraria),
    0
  );

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">Cargas horárias complementares</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography gutterBottom>
            Residente: {residente?.person.name}
          </Typography>
          <Typography gutterBottom>
            Carga horária pendente: {residente?.cargahorariapendente} horas
          </Typography>
        </Box>
        {residente?.cargahorariacomplementar.length === 0 && (
          <Typography color="secondary" align="center" paragraph>
            Sem cargas horárias complemetares cadastradas
          </Typography>
        )}
        {residente?.cargahorariacomplementar.map((elem) => (
          <CHComplementarCardInfo
            key={elem.id}
            data={{
              id: elem.id,
              cargaHoraria: Number(elem.cargaHoraria),
              tipoCargaHoraria: elem.tipoCargaHoraria,
              tipoCargaHorariaComplementar:
                elem.tipoCargaHorariaComplementar.descricao,
              justificativa: elem.justificativa,
            }}
          />
        ))}
        <Box mt={2} mb={2}>
          <Typography>
            Total de horas de CH complementares: {totalCHComplementates} horas
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCHComplementarModal;
