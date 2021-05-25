import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';
import SimpleTable from 'src/components/SimpleTable';
import { useApiWithSwr } from 'src/hooks/useApiWithSwr';
import { GetOfertasNames } from 'src/resources/turmas/types';

interface TurmaDetailsParams {
  id: string;
}

//TODO: acho que seria legal aqui colocar um Card para mostrar as informações da turma
const TurmaDetails: React.FC = () => {
  const { id } = useParams<TurmaDetailsParams>();

  const { data: ofertasReturnData } = useApiWithSwr<GetOfertasNames.Return>({
    url: `/residencia-multiprofissional/supervisores/turma/${id}/ofertas`,
  });

  const handleRows = () => {
    if (ofertasReturnData) {
      return ofertasReturnData.ofertasModulos.map((oferta) => [
        oferta.nome,
        oferta.semestre,
        oferta.modulo.nome,
        `${oferta.cargahoraria} horas`,
      ]);
    }
    return [];
  };

  return (
    <GenericContent helmetText="Ofertas | Sagu" title={`Turma ${id}`}>
      <SimpleTable
        title={'Ofertas'}
        headCells={['Nome', 'Semestre', 'Módulo', 'Carga horaria']}
        rows={handleRows()}
      />
      {/* <pre>{JSON.stringify(ofertasReturnData, null, 2)}</pre> */}
    </GenericContent>
  );
};

export default TurmaDetails;
