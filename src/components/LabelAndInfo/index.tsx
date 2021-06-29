import { Box, Typography } from '@material-ui/core';

export interface LabelAndInfoProps {
  label: string;
  info: string;
}

const LabelAndInfo: React.FC<LabelAndInfoProps> = (props) => {
  const { label, info } = props;
  return (
    <Box display="flex">
      <Box mr={1}>
        <Typography
          variant="body1"
          color="textSecondary"
        >{`${label}:`}</Typography>
      </Box>

      <Typography variant="body2" color="textSecondary">
        {info}
      </Typography>
    </Box>
  );
};

export default LabelAndInfo;
