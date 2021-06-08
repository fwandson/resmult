import { Button, ToolbarProps, Tooltip, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useCallback } from 'react';
import { Container } from './styles';

export interface SimpleTableToolbarProps extends ToolbarProps {
  title: string;
  onClickFilterButton?(): void;
}

const SimpleTableToolbar: React.FC<SimpleTableToolbarProps> = ({
  title,
  onClickFilterButton,
  ...rest
}) => {
  const handleOnClickFilterButton = useCallback(() => {
    if (onClickFilterButton) {
      onClickFilterButton();
    }
  }, [onClickFilterButton]);

  return (
    <Container {...rest}>
      <Typography variant="h4" component="div">
        {title}
      </Typography>
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
