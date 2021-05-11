import { Container, Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { ContainerWrapper, ImageWrapper } from './styles';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Sagu</title>
    </Helmet>
    <ContainerWrapper>
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: A página que você está procurando não está aqui
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Ou você tentou um caminho duvidoso ou veio aqui por engano. Seja o que
          for, tente usar a navegação
        </Typography>
        <ImageWrapper>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
          />
        </ImageWrapper>
      </Container>
    </ContainerWrapper>
  </>
);

export default NotFound;
