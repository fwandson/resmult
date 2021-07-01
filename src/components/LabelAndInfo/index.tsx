import { Box, Typography, TypographyProps } from '@material-ui/core';

export interface LabelAndInfoProps extends TypographyProps {
  label: string;
  info: string;
}

const LabelAndInfo: React.FC<LabelAndInfoProps> = (props) => {
  const { label, info, color } = props;
  return (
    <Box display="flex">
      <Box mr={1}>
        <Typography variant="body1" color={color}>{`${label}:`}</Typography>
      </Box>

      <Typography variant="body2" color={color}>
        {info}
      </Typography>
    </Box>
  );
};

export default LabelAndInfo;
