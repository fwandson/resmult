import { Grid, InputAdornment, MenuItem } from '@material-ui/core';
import GenericInput from 'src/components/inputs/GenericInput';
import { GetNames as GetNamesTiposCh } from 'src/resources/tiposCargaHoraria/types';
import { GetNames as GetNamesTiposChComplementar } from 'src/resources/tiposCargaHorariaComplementar/types';

interface CHComplementarCardInfoFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  tiposCH: GetNamesTiposCh.Return[] | undefined;
  tiposCHComplementar: GetNamesTiposChComplementar.Return[] | undefined;
}

const CHComplementarCardInfoForm: React.FC<CHComplementarCardInfoFormProps> = (
  props
) => {
  const { control, tiposCH, tiposCHComplementar } = props;

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <GenericInput
            variant="outlined"
            label="Tipo CH complementar"
            select
            fullWidth
            control={control}
            name="tipoChComplementar"
          >
            {tiposCHComplementar?.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.descricao}
              </MenuItem>
            ))}
          </GenericInput>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <GenericInput
            variant="outlined"
            label="Tipo CH"
            select
            fullWidth
            control={control}
            name="tipoCh"
          >
            {tiposCH?.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.descricao}
              </MenuItem>
            ))}
          </GenericInput>
        </Grid>
        <Grid item xs={12}>
          <GenericInput
            variant="outlined"
            label="Carga horária complementar"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">horas</InputAdornment>
              ),
            }}
            fullWidth
            control={control}
            name="chComplementar"
          />
        </Grid>
        <Grid item xs={12}>
          <GenericInput
            variant="outlined"
            label="Descrição"
            fullWidth
            multiline
            rows={3}
            control={control}
            name="descricao"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CHComplementarCardInfoForm;
