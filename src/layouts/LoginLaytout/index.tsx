import { Hidden } from '@material-ui/core';
import { Container, Content, ImgWrapper } from './sytles';

const LoginLaytout: React.FC = ({ children }) => {
  return (
    <Container>
      <Hidden smDown>
        <ImgWrapper>
          <img alt="Under development" src="/static/images/medicine.svg" />
        </ImgWrapper>
      </Hidden>
      <Content>{children}</Content>
    </Container>
  );
};

export default LoginLaytout;
