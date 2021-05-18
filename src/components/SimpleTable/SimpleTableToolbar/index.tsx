import { IconButton, Tooltip, Typography } from '@material-ui/core';
import { Filter as FilterIcon } from 'react-feather';
import { Container } from './styles';

interface SimpleTableToolbarProps {
  title: string;
}

const SimpleTableToolbar: React.FC<SimpleTableToolbarProps> = ({ title }) => {
  return (
    <Container>
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
