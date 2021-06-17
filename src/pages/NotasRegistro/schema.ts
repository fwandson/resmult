import yup from 'src/config/yup';

const schema = yup.object().shape({
  residentes: yup.array().of(
    yup.object().shape({
      notas: yup.object().shape({
        teorica: yup
          .number()
          .min(0)
          .max(10)
          .nullable(true)
          .transform((_, val) => (val === val ? val : null)), // necessário 
        final: yup
          .number()
          .min(0)
          .max(10)
          .nullable(true)
          .transform((_, val) => (val === val ? val : null)), // necessário 
      }),
    })
  ),
});

export default schema;
