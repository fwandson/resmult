import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ResidenteAvatar, {
  ResidenteAvatarProps,
} from 'src/components/ResidenteAvatar';

export default {
  title: 'Components/ResidenteAvatar',
  component: ResidenteAvatar,
  argTypes: {
    idTurma: {
      description: 'Id da Turma',
    },
    idOferta: {
      description: 'Id da Oferta',
    },
    idResidente: {
      description: 'Id do Residente',
    },
    nomeResidente: {
      description: 'Nome do Residente',
    },
    photourl: {
      description: 'URL da foto do Residente',
    },
  },
} as Meta;

const Template: Story<ResidenteAvatarProps> = (args) => (
  <BrowserRouter>
    <ResidenteAvatar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  idTurma: 13,
  idOferta: 12,
  idResidente: 10,
  nomeResidente: 'E',
  photourl:
    'https://avatars.githubusercontent.com/u/1212015?s=400&u=886cb9225f7bce0e75a240523834326ebdfeb49a&v=4',
};

export const NoPhoto = Template.bind({});
NoPhoto.args = {
  idTurma: 13,
  idOferta: 12,
  idResidente: 10,
  nomeResidente: 'E',
  photourl: undefined,
};
