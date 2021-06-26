import { Typography } from '@material-ui/core';

interface CHPendentesInfoData {
  teoricoPratica: string | number;
  teoricoConceitual: string | number;
  pratica: string | number;
}

interface CHPendentesInfoProps {
  data: CHPendentesInfoData;
}

const CHPendentesInfo: React.FC<CHPendentesInfoProps> = (props) => {
  const {
    data: { pratica, teoricoConceitual, teoricoPratica },
  } = props;

  return (
    <>
      <Typography>TEÓRICO-PRÁTICA: {teoricoPratica} horas</Typography>
      <Typography>TEÓRICO-CONCEITUAL: {teoricoConceitual} horas</Typography>
      <Typography>PRÁTICA: {pratica} horas</Typography>
    </>
  );
};

export default CHPendentesInfo;
