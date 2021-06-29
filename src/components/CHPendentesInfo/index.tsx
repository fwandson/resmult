import { Box } from '@material-ui/core';
import LabelAndInfo from '../LabelAndInfo';
export interface CHPendentesInfoData {
  teoricoPratica: string | number | undefined;
  teoricoConceitual: string | number | undefined;
  pratica: string | number | undefined;
}

export interface CHPendentesInfoProps {
  data: CHPendentesInfoData;
}

const CHPendentesInfo: React.FC<CHPendentesInfoProps> = (props) => {
  const {
    data: { pratica, teoricoConceitual, teoricoPratica },
  } = props;

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <LabelAndInfo label="Teórico-prática" info={`${teoricoPratica} h`} />
      <LabelAndInfo
        label="Teórico-conceitual"
        info={`${teoricoConceitual} h`}
      />
      <LabelAndInfo label="Prática" info={`${pratica} h`} />
    </Box>
  );
};

export default CHPendentesInfo;
