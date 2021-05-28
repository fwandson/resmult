import { Meta, Story } from '@storybook/react';
import GenericContent, {
  GenericContentProps,
} from 'src/components/GenericContent';

export default {
  title: 'Components/GenericContent',
  component: GenericContent,
} as Meta;

const Template: Story<GenericContentProps> = (args) => (
  <GenericContent {...args}>Colocar o conteido aqui</GenericContent>
);

export const Default = Template.bind({});
Default.args = {
  title: 'title',
  helmetText: 'helmetText',
  letfTitleContent: '',
};
