import yup from 'src/config/yup';

const schema = yup.object().shape({
  notas: yup.array().of(
    yup.object().shape({
      teorica: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida')
        .typeError('Nota inválida'),
      final: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida')
        .typeError('Nota inválida'),
    })
  ),
});

export default schema;
