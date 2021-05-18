import {
  IconButton,
  Tooltip,
  Typography,
  ToolbarProps,
} from '@material-ui/core';
import { Filter as FilterIcon } from 'react-feather';
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
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Tooltip>
    </Container>
  );
};

export default SimpleTableToolbar;
