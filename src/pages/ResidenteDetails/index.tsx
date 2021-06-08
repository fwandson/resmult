import { Typography, Card, CardContent, Avatar } from '@material-ui/core';
import { useParams } from 'react-router';
import GenericContent from 'src/components/GenericContent';

interface ResidenteDetailsParams {
  id: string;
}

const ResidenteDetails: React.FC = () => {
  const { id } = useParams<ResidenteDetailsParams>();

  return (
    <GenericContent
      helmetText="Residente | Sagu"
      title="Residente"
      isLoading={false}
    >
      <Card>
        <CardContent>
          <Avatar
            src={`/static/images/avatars/avatar_${(Number(id) % 11) + 1}.png`}
          >
            {id}
          </Avatar>
          <Typography>{id}</Typography>
          <Typography variant="body2" color="textSecondary">
            TODO: falta fazer aqui uma rota para buscar as informações de um
            residente.
          </Typography>
        </CardContent>
      </Card>
    </GenericContent>
  );
};

export default ResidenteDetails;
