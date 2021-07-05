import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Link,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link as LinkRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputCPF from 'src/components/inputs/InputCPF';
import Logo from 'src/components/Logo';
import { useLoading } from 'src/context/LoadingContext';
import resources from 'src/resources';
import NAMES from 'src/routes/names';
import { Container, ContainerWrapper } from '../Login/styles';
import schema from './schema';

interface RecuperarSenhaData {
  cpf: string;
}

const RecuperarSenha: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();

  const { recuperarSenha } = resources;

  const { control, handleSubmit } = useForm<RecuperarSenhaData>({
    defaultValues: {
      cpf: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(async (formaData: RecuperarSenhaData) => {
    try {
      showLoading();

      console.log(formaData);

      const cpf = formaData.cpf.replace(/[^0-9]/g, '');

      const { data } = await recuperarSenha.enviarEmail({
        cpf,
      });

      if (data.sucesso) {
        toast.success(
          'As instruções de recuperação de senha foram enviadas para o e-mail cadastrado no sistema'
        );
      } else {
        toast.error(`Mensagem: ${data.messagem}`);
      }
    } catch (error) {
      toast.error(error.response.data.mensagem);
    } finally {
      hideLoading();
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Recuperar Senha | Sagu</title>
      </Helmet>
      <ContainerWrapper>
        <Container maxWidth="sm">
          <Logo />
          <Card
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            elevation={0}
          >
            <CardContent>
              <Box marginBottom={4}>
                <Typography color="textPrimary" variant="h2">
                  Recuperar senha
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Por favor, preencha seu CPF. Se sua conta for encontrada, um
                  email será enviado para seu endereço de e-mail com instruçoes
                  sobre como recuperar sua senha.
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
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    color="primary"
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Link component={LinkRouter} variant="subtitle1" to={NAMES.LOGIN}>
            Página de login
          </Link>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default RecuperarSenha;
