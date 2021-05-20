import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  Typography,
} from '@material-ui/core';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import GenericInput from 'src/components/inputs/GenericInput';
import InputCPF from 'src/components/inputs/InputCPF';
import Logo from 'src/components/Logo';
import { useAuth } from 'src/context/AuthContext';
import { useLoading } from 'src/context/LoadingContext';
import NAMES from 'src/routes/names';
import schema from './schema';
import { Container, ContainerWrapper } from './styles';
import PersonIcon from '@material-ui/icons/Person';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
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
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom={4}>
              <Typography color="textSecondary" variant="h2">
                Meu acesso
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary">
                Utilize suas credenciais do SAGU
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputCPF
                  control={control}
                  fullWidth
                  label="CPF"
                  name="cpf"
                  variant="outlined"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
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
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EnhancedEncryptionIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disableElevation
                >
                  Entrar agora
                </Button>
              </Grid>
            </Grid>
          </form>
          <Link variant="subtitle1">Esqueci minha senha</Link>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default Login;
