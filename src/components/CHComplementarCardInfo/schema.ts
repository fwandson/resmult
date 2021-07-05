import yup from 'src/config/yup';

const schema = yup.object().shape({
  chComplementar: yup.number().min(1).required().typeError('Campo inválido'),
});

export default schema;
