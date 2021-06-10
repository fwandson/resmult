import {
  Button,
  ToolbarProps,
  Tooltip,
  Typography,
  Box,
  Chip,
  Grid,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { uniqueId } from 'lodash';
import { useCallback } from 'react';
import { Container } from './styles';

export interface SimpleTableToolbarProps extends ToolbarProps {
  title: string;
  onClickFilterButton?(): void;
  chips?: string[];
}

const SimpleTableToolbar: React.FC<SimpleTableToolbarProps> = ({
  title,
  onClickFilterButton,
  chips,
  ...rest
}) => {
  const handleOnClickFilterButton = useCallback(() => {
    if (onClickFilterButton) {
      onClickFilterButton();
    }
  }, [onClickFilterButton]);

  return (
    <Container {...rest}>
      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Grid container spacing={1} component={Box} ml={1}>
          {chips?.map((chip) => (
            <Grid key={uniqueId()} item>
              <Chip label={chip} variant="outlined" color="primary" />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Tooltip title="Filtros" placement="top">
        <span>
          <Button
            color="secondary"
            startIcon={<FilterListIcon />}
            onClick={handleOnClickFilterButton}
            disabled={!onClickFilterButton}
          >
            Filtros
          </Button>
        </span>
      </Tooltip>
    </Container>
  );
};

export default SimpleTableToolbar;
