import yup from 'src/config/yup';

interface GenerateSchemaFaltasParams {
  maxPratica: number;
  maxTeoricoConceitual: number;
  maxTeoricoPratica: number;
}

const generateSchemaFaltas = (params: GenerateSchemaFaltasParams) => {
  const { maxPratica, maxTeoricoConceitual, maxTeoricoPratica } = params;

  return yup.object().shape({
    residentes: yup.array().of(
      yup.object().shape({
        pratica: yup.object().shape({
          falta: yup
            .number()
            .min(0, 'Carga horária inválida')
            .max(maxPratica)
            .typeError('Carga horária inválida'),
          obs: yup.string().max(255),
        }),
        teoricoConceitual: yup.object().shape({
          falta: yup
            .number()
            .min(0, 'Carga horária inválida')
            .max(maxTeoricoConceitual)
            .typeError('Carga horária inválida'),
          obs: yup.string().max(255),
        }),
        teoricoPratica: yup.object().shape({
          falta: yup
            .number()
            .min(0, 'Carga horária inválida')
            .max(maxTeoricoPratica)
            .typeError('Carga horária inválida'),
          obs: yup.string().max(255),
        }),
      })
    ),
  });
};

export default generateSchemaFaltas;
