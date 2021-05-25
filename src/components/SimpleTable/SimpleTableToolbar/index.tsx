import { Button, ToolbarProps, Tooltip, Typography } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Container } from './styles';

interface SimpleTableToolbarProps extends ToolbarProps {
  title: string;
}

const SimpleTableToolbar: React.FC<SimpleTableToolbarProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Typography variant="h4" component="div">
        <strong>{title}</strong>
      </Typography>
      <Tooltip title="Filter list">
        <Button color="secondary" startIcon={<FilterListIcon />}>
          Filtros
        </Button>
      </Tooltip>
    </Container>
  );
};

export default SimpleTableToolbar;
