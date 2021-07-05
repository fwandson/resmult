import yup from 'src/config/yup';

const schema = yup.object().shape({
  chComplementar: yup.number().min(1).required().typeError('Campo inválido'),
  tipoCh: yup.string().required(),
  tipoChComplementar: yup.string().required(),
});

export default schema;
