import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogProps,
  Grid,
  Box,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

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
}

const FiltrosModal: React.FC<FiltrosModalProps> = (props) => {
  const { open, filtros, ...rest } = props;

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">Filtros</Typography>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Box m={4} />
        <Typography variant="body1" gutterBottom>
          Período de ocorrência
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
              fullWidth
              label="Início"
              value={filtros.inicio}
              onChange={() => {
                console.log('teste');
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
              fullWidth
              label="Fim"
              value={filtros.fim}
              onChange={() => {
                console.log('teste');
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
