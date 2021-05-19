import yup from 'src/config/yup';

const schema = yup.object().shape({
  cpf: yup.string().required(),
  password: yup.string().required(),
});

export default schema;
