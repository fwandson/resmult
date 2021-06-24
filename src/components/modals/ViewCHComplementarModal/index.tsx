import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Dispatch, SetStateAction } from 'react';
import { GetResidentesNames } from 'src/resources/turmas/types';
import { reduce } from 'lodash';

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
        {residente?.cargahorariacomplementar.map((elem) => (
          <Box mb={2} key={elem.id}>
            <Typography>#ID: {elem.id}</Typography>
            <Typography>
              Quantidade de horas: {elem.cargaHoraria} horas
            </Typography>
            <Typography>
              Tipo CH coomplementar:{' '}
              {elem.tipoCargaHorariaComplementar.descricao}
            </Typography>
            <Typography>Tipo da CH: {elem.tipoCargaHoraria}</Typography>
          </Box>
        ))}
        <Typography>
          Total de horas de CH complementares: {totalCHComplementates} horas
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between">
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            startIcon={<CheckIcon />}
          >
            Confirmar
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ViewCHComplementarModal;
