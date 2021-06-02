import { IconButton, IconButtonProps, Tooltip } from '@material-ui/core';
import { Container } from './styles';

export interface CustonIconButtonProps extends IconButtonProps {
  tooltipTitle: string;
}

const CustonIconButton: React.FC<CustonIconButtonProps> = (props) => {
  const { children, tooltipTitle, ...rest } = props;

  return (
    <Container>
      <Tooltip title={tooltipTitle} placement="top">
        <IconButton {...rest}>{children}</IconButton>
      </Tooltip>
    </Container>
  );
};

export default CustonIconButton;
