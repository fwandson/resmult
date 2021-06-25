import yup from 'src/config/yup';

const schema = yup.object().shape({
  chComplementar: yup.number().min(0).required().typeError('Campo inválido'),
});

export default schema;
