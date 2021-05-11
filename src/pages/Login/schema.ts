import yup from 'src/config/yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default schema;
