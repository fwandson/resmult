import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | Sagu</title>
      </Helmet>
      <Typography variant="h1">Dashboard</Typography>
      <Typography variant="h2">
        Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi
        eu sit. Vide electram sadipscing et per. Si u mundo tá muito paradis?
        Toma um mé que o mundo vai girarzis! Praesent malesuada urna nisi, quis
        volutpat erat hendrerit non. Nam vulputate dapibus. Quem num gosta di
        mim que vai caçá sua turmis!
      </Typography>
    </div>
  );
};

export default Dashboard;
