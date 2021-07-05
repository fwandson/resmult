import { Meta, Story } from '@storybook/react';
import GenericContent, {
  GenericContentProps,
} from 'src/components/GenericContent';

export default {
  title: 'Components/GenericContent',
  component: GenericContent,
  argTypes: {
    title: {
      description: 'Título',
    },
    helmetText: {
      description: 'Subtítulo',
    },
    letfTitleContent: {
      description: 'Conteudo que aparece ao lado direito do `Título`',
    },
    isLoading: {
      description:
        '`Boolean` para apresentar um Loading enquanto não estão carregadas todas as informações da página',
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<GenericContentProps> = (args) => (
  <GenericContent {...args}>Colocar o conteido aqui</GenericContent>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Coloque aqui seu Título',
  helmetText: 'helmetText',
  letfTitleContent: '',
  isLoading: false,
};
