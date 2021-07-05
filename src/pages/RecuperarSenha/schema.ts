import yup from 'src/config/yup';

const schema = yup.object().shape({
  cpf: yup.string().required().length(14),
});

export default schema;
