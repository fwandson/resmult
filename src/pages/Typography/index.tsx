import { Typography, Divider } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { Helmet } from 'react-helmet';

const textBase =
  'Mussum Ipsum, cacilds vidis litro abertis. Interagi no mé, cursus quis, vehicula ac nisi. Atirei o pau no gatis, per gatis num morreus. ';

const variants: Variant[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'overline',
  'subtitle1',
  'subtitle2',
];

const TypographyPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>TypographyPage | Sagu</title>
      </Helmet>
      <Typography variant="h1" gutterBottom>
        TypographyPage
      </Typography>
      {variants.map((varitant, index) => (
        <>
          <Typography key={varitant} variant={varitant} >
            {varitant}: {textBase}
          </Typography>
          {index !== variants.length && <Divider />}
        </>
      ))}
    </div>
  );
};

export default TypographyPage;
