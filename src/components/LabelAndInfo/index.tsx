import { Box, Typography } from '@material-ui/core';

export interface LabelAndInfoProps {
  label: string;
  info: string;
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error';
}

const LabelAndInfo: React.FC<LabelAndInfoProps> = (props) => {
  const { label, info, color } = props;
  return (
    <Box display="flex">
      <Box mr={1}>
        <Typography
          noWrap
          variant="body1"
          color={color}
        >{`${label}:`}</Typography>
      </Box>
      <Typography noWrap variant="body2" color={color}>
        {info}
      </Typography>
    </Box>
  );
};

export default LabelAndInfo;
