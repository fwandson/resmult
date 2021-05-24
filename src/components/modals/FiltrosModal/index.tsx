import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  DialogProps,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface FiltrosModalData {
  turma: number;
  periodo: number;
  nucleo: number;
  enfase: number;
}

interface FiltrosModalProps extends DialogProps {
  filtros: FiltrosModalData;
}

const FiltrosModal: React.FC<FiltrosModalProps> = (props) => {
  const { open, filtros, ...rest } = props;

  return (
    <Dialog open={open} {...rest} fullWidth>
      <DialogTitle>Filtros</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined" label="teste">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select fullWidth variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Typography gutterBottom>Período de ocorrência</Typography>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value="10/10/2021"
          onChange={() => {
            console.log('teste');
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary">Limpar</Button>
        <Button>Aplicar filtros</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltrosModal;
