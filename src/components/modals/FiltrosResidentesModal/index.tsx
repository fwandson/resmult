/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  TextField,
  IconButton,
  Typography,
  DialogContent,
  Grid,
  MenuItem,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { uniqueId } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export interface FiltrosResidentesModalData {
  enfase: string | undefined;
}

export interface FiltrosResidentesModalProps extends DialogProps {
  filtros: FiltrosResidentesModalData;
  handleOnChange(name: keyof FiltrosResidentesModalData, value: any): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  enfases?: {
    id: number;
    descricao: string;
    abreviatura: string;
  }[];
}
const FiltrosResidentesModal: React.FC<FiltrosResidentesModalProps> = (
  props
) => {
  const { open, setOpen, handleOnChange, filtros, enfases, ...rest } = props;

  const [values, setValues] = useState<FiltrosResidentesModalData>(filtros);

  const handleLimparFiltros = useCallback(() => {
    setValues({
      enfase: '',
    });
  }, []);

  const handleAplicarFiltros = useCallback(() => {
    handleOnChange('enfase', values.enfase);
    setOpen(false);
  }, [values]);

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
          <Grid item xs={12}>
            <TextField
              select
              label="Ênfase"
              fullWidth
              variant="outlined"
              name="enfase"
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  enfase: String(e.target.value),
                }))
              }
              value={values.enfase}
              defaultValue={0}
            >
              <MenuItem value="" disabled>
                Escolha
              </MenuItem>
              {enfases?.map((enfase) => (
                <MenuItem key={uniqueId()} value={enfase.id}>
                  {enfase.descricao}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
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

export default FiltrosResidentesModal;
