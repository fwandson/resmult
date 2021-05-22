import { Box, Typography } from '@material-ui/core';
import { AlertCircle as AlertCircleIcon } from 'react-feather';

interface EmptyContentAlertProps {
  title: string;
  subTitle: string;
}

const EmptyContentAlert: React.FC<EmptyContentAlertProps> = ({
  title,
  subTitle,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={406}
      textAlign="center"
    >
      <AlertCircleIcon size={66.67} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" color="textSecondary">
        {subTitle}
      </Typography>
    </Box>
  );
};

export default EmptyContentAlert;
