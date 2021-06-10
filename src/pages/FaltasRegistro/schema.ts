import yup from 'src/config/yup';

const schema = yup.object().shape({
  ch: yup.array().of(
    yup.object().shape({
      pratica: yup.number().min(0, 'Nota inválida').max(10, 'Nota invalida'),
      teoricoConceitual: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida'),
      teoricoPratica: yup
        .number()
        .min(0, 'Nota inválida')
        .max(10, 'Nota invalida'),
    })
  ),
});

export default schema;
