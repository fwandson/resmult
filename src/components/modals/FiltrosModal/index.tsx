/* eslint-disable @typescript-eslint/no-explicit-any */
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
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Dispatch, SetStateAction } from 'react';

export interface FiltrosModalData {
  turma: number;
  periodo: number;
  nucleo: number;
  enfase: number;
  inicio: Date;
  fim: Date;
}

interface FiltrosModalProps extends DialogProps {
  filtros: FiltrosModalData;
  handleOnChange(name: string, value: any): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// TODO: mudar o nome desse component para FiltrosOfertasModal
const FiltrosModal: React.FC<FiltrosModalProps> = (props) => {
  const { open, filtros, handleOnChange, setOpen, ...rest } = props;

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">Filtros</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Turma"
              fullWidth
              variant="outlined"
              name="turma"
              onChange={(e) => {
                handleOnChange('turma', e.target.value);
              }}
              value={filtros.turma}
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Período"
              fullWidth
              variant="outlined"
              name="periodo"
              onChange={(e) => {
                handleOnChange('periodo', e.target.value);
              }}
              value={filtros.periodo}
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Núcleos profissionais"
              fullWidth
              variant="outlined"
              name="nucleo"
              onChange={(e) => {
                handleOnChange('nucleo', e.target.value);
              }}
              value={filtros.nucleo}
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Ênfases"
              fullWidth
              variant="outlined"
              name="enfase"
              onChange={(e) => {
                handleOnChange('enfase', e.target.value);
              }}
              value={filtros.enfase}
            >
              <MenuItem value={1}>Ten</MenuItem>
              <MenuItem value={2}>Twenty</MenuItem>
              <MenuItem value={3}>Thirty</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Box m={4} />
        <Typography variant="body1" gutterBottom>
          Período de ocorrência
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              name="inicio"
              disableToolbar
              format="dd/MM/yyyy"
              fullWidth
              label="Início"
              value={filtros.inicio}
              onChange={(date) => {
                handleOnChange('inicio', date);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              name="fim"
              disableToolbar
              format="dd/MM/yyyy"
              fullWidth
              label="Fim"
              value={filtros.fim}
              onChange={(date) => {
                handleOnChange('fim', date);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Box m={2} />
      <DialogActions>
        <Grid container justify="space-between">
          <Button>Limpar</Button>
          <Button color="secondary" startIcon={<CheckIcon />}>
            Aplicar filtros
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default FiltrosModal;
