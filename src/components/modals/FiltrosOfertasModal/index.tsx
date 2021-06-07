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
import { uniqueId } from 'lodash';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import useTurmas from 'src/hooks/useTurmas';

export interface FiltrosOfertasModalData {
  turma: number | undefined;
  periodo: number | undefined;
  nucleo: number | undefined;
  enfase: number | undefined;
  inicio: string | undefined;
  fim: string | undefined;
}

export interface FiltrosOfertasModalProps extends DialogProps {
  filtros: FiltrosOfertasModalData;
  handleOnChange(name: keyof FiltrosOfertasModalData, value: any): void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FiltrosOfertasModal: React.FC<FiltrosOfertasModalProps> = (props) => {
  const { open, filtros, handleOnChange, setOpen, ...rest } = props;

  const { data: turmasDataReturn } = useTurmas();

  const [values, setValues] = useState<FiltrosOfertasModalData>(filtros);

  const handleLimparFiltros = useCallback(() => {
    handleOnChange('turma', 0);
    handleOnChange('periodo', 0);
    handleOnChange('nucleo', 0);
    handleOnChange('enfase', 0);
    handleOnChange('inicio', undefined);
    handleOnChange('fim', undefined);
  }, []);

  const handleAplicarFiltros = useCallback(() => {
    handleOnChange('turma', values.turma);
    handleOnChange('periodo', values.periodo);
    handleOnChange('nucleo', values.nucleo);
    handleOnChange('enfase', values.enfase);
    handleOnChange('inicio', values.inicio);
    handleOnChange('fim', values.fim);
    setOpen(false);
  }, []);

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
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  turma: Number(e.target.value),
                }))
              }
              value={values.turma}
              defaultValue={0}
            >
              <MenuItem value={0} disabled>
                Escolha
              </MenuItem>
              {turmasDataReturn?.turmas.map((turma) => (
                <MenuItem key={uniqueId()} value={turma.id}>
                  {turma.descricao}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Período"
              fullWidth
              variant="outlined"
              name="periodo"
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  periodo: Number(e.target.value),
                }))
              }
              value={values.periodo}
              defaultValue={0}
            >
              <MenuItem value={0} disabled>
                Escolha
              </MenuItem>
              <MenuItem value={1}>Primeiro Ano</MenuItem>
              <MenuItem value={2}>Segundo Ano</MenuItem>
              <MenuItem value={3}>Terceiro Ano</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Núcleos profissionais"
              fullWidth
              variant="outlined"
              name="nucleo"
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  nucleo: Number(e.target.value),
                }))
              }
              value={values.nucleo}
              defaultValue={0}
            >
              <MenuItem value={0} disabled>
                Escolha
              </MenuItem>
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
              onChange={(e) =>
                setValues((old) => ({
                  ...old,
                  enfase: Number(e.target.value),
                }))
              }
              value={values.enfase}
              defaultValue={0}
            >
              <MenuItem value={0} disabled>
                Escolha
              </MenuItem>
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
              value={values.inicio}
              onChange={(date) =>
                setValues((old) => ({
                  ...old,
                  inicio: String(date),
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
                  fim: String(date),
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
