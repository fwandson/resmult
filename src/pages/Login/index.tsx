import { yupResolver } from '@hookform/resolvers/yup';
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
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import GenericInput from 'src/components/inputs/GenericInput';
import InputCPF from 'src/components/inputs/InputCPF';
import { useAuth } from 'src/context/AuthContext';
import { useLoading } from 'src/context/LoadingContext';
import NAMES from 'src/routes/names';
import schema from './schema';
import { ContainerWrapper } from './styles';

interface LoginFromData {
  cpf: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();

  const { showLoading, hideLoading } = useLoading();

  const { signIn } = useAuth();

  const { control, handleSubmit } = useForm<LoginFromData>({
    defaultValues: {
      cpf: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (formaData: LoginFromData) => {
    try {
      showLoading();

      // removendo caracteres não algarismos
      const username = formaData.cpf.replace(/[^0-9]/g, '');

      await signIn({
        username,
        password: formaData.password,
      });

      history.push(NAMES.DASHBOARD);
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('CPF ou Senha inválidos');
      } else {
        // TODO: pensar em alguma forma de trabalhar o tratamento dos erros
        toast.error('Algo de inesperado aconteceu...');
      }
    } finally {
      hideLoading();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Login | Sagu</title>
      </Helmet>
      <ContainerWrapper>
        <Container maxWidth="sm">
          <Card component="form" onSubmit={handleSubmit(onSubmit)}>
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
                  <InputCPF
                    control={control}
                    fullWidth
                    label="CPF"
                    name="cpf"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <GenericInput
                    control={control}
                    fullWidth
                    label="Senha"
                    name="password"
                    type="password"
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
