import { Divider, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import GenericContent from 'src/components/GenericContent';

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
    <GenericContent helmetText="Typography | Sagu" title="Typography">
      {variants.map((varitant, index) => (
        <div key={index}>
          <Typography variant={varitant}>
            {varitant}: {textBase}
          </Typography>
          {index !== variants.length - 1 && <Divider />}
        </div>
      ))}
    </GenericContent>
  );
};

export default TypographyPage;
