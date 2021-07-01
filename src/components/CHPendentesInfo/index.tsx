import { Box, Typography } from '@material-ui/core';
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
    <Box
      display="flex"
      flexDirection={inline ? 'rown' : 'column'}
      alignItems="flex-start"
    >
      <LabelAndInfo
        label="Teórico-prática"
        info={`${teoricoPratica} h`}
        color={Number(teoricoPratica) <= 0 ? 'textSecondary' : 'secondary'}
      />
      {inline && (
        <Box ml={1} mr={1}>
          <Typography variant="body1" color="textSecondary">
            |
          </Typography>
        </Box>
      )}
      <LabelAndInfo
        label="Teórico-conceitual"
        info={`${teoricoConceitual} h`}
        color={Number(teoricoConceitual) <= 0 ? 'textSecondary' : 'secondary'}
      />
      {inline && (
        <Box ml={1} mr={1}>
          <Typography variant="body1" color="textSecondary">
            |
          </Typography>
        </Box>
      )}
      <LabelAndInfo
        label="Prática"
        info={`${pratica} h`}
        color={Number(pratica) <= 0 ? 'textSecondary' : 'secondary'}
      />
    </Box>
  );
};

export default CHPendentesInfo;
