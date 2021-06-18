import { Typography } from '@material-ui/core';
import GenericContent from 'src/components/GenericContent';
import NAMES from 'src/routes/names';

const Settings: React.FC = () => {
  return (
    <GenericContent
      helmetText="Configurações | Sagu"
      title="Configurações"
      breadcrumbsLinks={[{ label: 'Home', href: NAMES.HOME }]}
    >
      <Typography variant="h2">
        Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi
        eu sit. Vide electram sadipscing et per. Si u mundo tá muito paradis?
        Toma um mé que o mundo vai girarzis! Praesent malesuada urna nisi, quis
        volutpat erat hendrerit non. Nam vulputate dapibus. Quem num gosta di
        mim que vai caçá sua turmis!
      </Typography>
    </GenericContent>
  );
};

export default Settings;
