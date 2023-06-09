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
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface FiltrosOfertasModalData {
  periodo: string | undefined;
  inicio: MaterialUiPickersDate | undefined;
  fim: MaterialUiPickersDate | undefined;
}

export interface FiltrosOfertasModalProps extends DialogProps {
  filtros: FiltrosOfertasModalData;
  handleOnChange(name: keyof FiltrosOfertasModalData, value: any): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// TODO: usar o react hook forms aqui para
// criar o component de fild de data
const FiltrosOfertasModal: React.FC<FiltrosOfertasModalProps> = (props) => {
  const { open, filtros, handleOnChange, setOpen, ...rest } = props;

  const [values, setValues] = useState<FiltrosOfertasModalData>(filtros);

  const handleLimparFiltros = useCallback(() => {
    setValues({
      periodo: '',
      inicio: undefined,
      fim: undefined,
    });
  }, []);

  const handleAplicarFiltros = useCallback(() => {
    handleOnChange('periodo', values.periodo);
    handleOnChange('inicio', values.inicio);
    handleOnChange('fim', values.fim);
    setOpen(false);
  }, [values]);

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Filtros</Typography>
          <IconButton onClick={() => setOpen(false)} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Período"
              fullWidth
              variant="outlined"
              name="periodo"
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  periodo: e.target.value,
                }))
              }
              value={values.periodo}
              defaultValue=""
            >
              <MenuItem value="" disabled>
                Escolha
              </MenuItem>
              <MenuItem value="P1">Primeiro Ano</MenuItem>
              <MenuItem value="P2">Segundo Ano</MenuItem>
              <MenuItem value="P3">Terceiro Ano</MenuItem>
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
              value={values.inicio}
              onChange={(date) =>
                setValues((old) => ({
                  ...old,
                  inicio: date,
                }))
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              name="fim"
              disableToolbar
              format="dd/MM/yyyy"
              fullWidth
              label="Fim"
              value={values.fim}
              onChange={(date) =>
                setValues((old) => ({
                  ...old,
                  fim: date,
                }))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <Box m={2} />
      <DialogActions>
        <Grid container justify="space-between">
          <Button onClick={() => handleLimparFiltros()}>Limpar</Button>
          <Button
            color="secondary"
            startIcon={<CheckIcon />}
            onClick={() => handleAplicarFiltros()}
          >
            Aplicar filtros
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default FiltrosOfertasModal;
