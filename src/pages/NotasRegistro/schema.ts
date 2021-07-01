import yup from 'src/config/yup';

//necessário colocar validação para número na string para poder mandar null para o endpoint
const schema = yup.object().shape({
  residentes: yup.array().of(
    yup.object().shape({
      notas: yup.object().shape({
        atividadeDeProduto: yup
          .string()
          .test({
            name: 'inNumberOrNull',
            test: (value) => {
              if (!value) return true;
              return !!Number(value) || Number(value) === 0;
            },
          })
          .test({
            name: 'max',
            test: (value) => Number(value) <= 10,
          })
          .test({
            name: 'min',
            test: (value) => Number(value) >= 0,
          })
          .nullable(true)
          .transform((_, val) => (val === val ? val : null)), // necessário
        avaliacaoDeDesempenho: yup
          .string()
          .test({
            name: 'inNumberOrNull',
            test: (value) => {
              if (!value) return true;
              return !!Number(value) || Number(value) === 0;
            },
          })
          .test({
            name: 'max',
            test: (value) => Number(value) <= 10,
          })
          .test({
            name: 'min',
            test: (value) => Number(value) >= 0,
          })
          .nullable(true)
          .transform((_, val) => (val === val ? val : null)), // necessário
      }),
    })
  ),
});

export default schema;
