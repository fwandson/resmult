import yup from 'src/config/yup';

interface GenerateSchemaFaltasParams {
  maxPratica: number;
  maxTeoricoConceitual: number;
  maxTeoricoPratica: number;
}

const generateSchemaFaltas = (params: GenerateSchemaFaltasParams) => {
  const { maxPratica, maxTeoricoConceitual, maxTeoricoPratica } = params;

  return yup.object().shape({
    ch: yup.array().of(
      yup.object().shape({
        pratica: yup
          .number()
          .min(0, 'Carga horária inválida')
          .max(maxPratica)
          .typeError('Carga horária inválida'),
        teoricoConceitual: yup
          .number()
          .min(0, 'Carga horária inválida')
          .max(maxTeoricoConceitual)
          .typeError('Carga horária inválida'),
        teoricoPratica: yup
          .number()
          .min(0, 'Carga horária inválida')
          .max(maxTeoricoPratica)
          .typeError('Carga horária inválida'),
      })
    ),
  });
};

export default generateSchemaFaltas;
