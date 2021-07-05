import { Box, Typography, Grid } from '@material-ui/core';
import LabelAndInfo from '../LabelAndInfo';
export interface CHPendentesInfoData {
  teoricoPratica: string | number | undefined;
  teoricoConceitual: string | number | undefined;
  pratica: string | number | undefined;
}

export interface CHPendentesInfoProps {
  data: CHPendentesInfoData;
  inline?: boolean;
}

const CHPendentesInfo: React.FC<CHPendentesInfoProps> = (props) => {
  const {
    data: { pratica, teoricoConceitual, teoricoPratica },
    inline,
  } = props;

  return (
    <Grid container direction={inline ? 'row' : 'column'}>
      <Grid item>
        <LabelAndInfo
          label="Teórico-prática"
          info={`${teoricoPratica} h`}
          color={Number(teoricoPratica) <= 0 ? 'textSecondary' : 'secondary'}
        />
      </Grid>
      {inline && (
        <Grid item>
          <Box ml={1} mr={1}>
            <Typography variant="body1" color="textSecondary">
              |
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item>
        <LabelAndInfo
          label="Teórico-conceitual"
          info={`${teoricoConceitual} h`}
          color={Number(teoricoConceitual) <= 0 ? 'textSecondary' : 'secondary'}
        />
      </Grid>
      {inline && (
        <Grid item>
          <Box ml={1} mr={1}>
            <Typography variant="body1" color="textSecondary">
              |
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item>
        <LabelAndInfo
          label="Prática"
          info={`${pratica} h`}
          color={Number(pratica) <= 0 ? 'textSecondary' : 'secondary'}
        />
      </Grid>
    </Grid>
  );
};

export default CHPendentesInfo;
