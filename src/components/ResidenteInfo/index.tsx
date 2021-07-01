import { Box, Typography } from '@material-ui/core';

export interface ResidenteInfoData {
  id: number;
  name: string;
  enfase: string;
}

export interface ResidenteInfoProps {
  data: ResidenteInfoData;
}

const ResidenteInfo: React.FC<ResidenteInfoProps> = (props) => {
  const { data } = props;

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{data.name}</Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" color="textSecondary">
          #{data.id}
        </Typography>
        <Box m="4px" />
        <Typography variant="body2" color="textSecondary">
          {data.enfase}
        </Typography>
      </Box>
    </Box>
  );
};

export default ResidenteInfo;
