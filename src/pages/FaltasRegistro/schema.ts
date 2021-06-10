import yup from 'src/config/yup';

const schema = yup.object().shape({
  ch: yup.array().of(
    yup.object().shape({
      pratica: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida')
        .typeError('Nota inválida'),
      teoricoConceitual: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida')
        .typeError('Nota inválida'),
      teoricoPratica: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida')
        .typeError('Nota inválida'),
    })
  ),
});

export default schema;
