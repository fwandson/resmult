import { Box, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export interface EmptyContentAlertProps {
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
      <ErrorOutlineIcon fontSize="large" />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" color="textSecondary">
        {subTitle}
      </Typography>
    </Box>
  );
};

export default EmptyContentAlert;
