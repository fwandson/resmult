import { Typography } from '@material-ui/core';
import { Helmet } from 'react-helmet';

const TypographyPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>TypographyPage | Sagu</title>
      </Helmet>
      <Typography variant="h1" gutterBottom>
        TypographyPage
      </Typography>
      <Typography variant="h1" gutterBottom>
        h1
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5
      </Typography>
      <Typography variant="h6" gutterBottom>
        h6
      </Typography>
      <Typography variant="overline" gutterBottom>
        overline
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        subtitle1
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        subtitle2
      </Typography>
    </div>
  );
};

export default TypographyPage;
