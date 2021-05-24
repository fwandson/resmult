import {
  IconButton,
  Tooltip,
  Typography,
  ToolbarProps,
} from '@material-ui/core';
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
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

export default SimpleTableToolbar;
