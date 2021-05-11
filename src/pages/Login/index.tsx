import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import GenericInput from 'src/components/inputs/GenericInput';
import { ContainerWrapper } from './styles';
import { useForm } from 'react-hook-form';

const Login: React.FC = () => {
  const { control } = useForm();

  return (
    <>
      <Helmet>
        <title>Login | Sagu</title>
      </Helmet>
      <ContainerWrapper>
        <Container maxWidth="sm">
          <Card component="form">
            <CardContent>
              <Box marginBottom={4}>
                <Typography color="textPrimary" variant="h2">
                  Entrar
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Faça login na plataforma interna
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <GenericInput
                    control={control}
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <GenericInput
                    control={control}
                    fullWidth
                    label="Senha"
                    name="password"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Entrar
              </Button>
            </CardActions>
          </Card>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default Login;
