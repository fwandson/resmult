import { TextFieldProps } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import SearchField from 'src/components/SearchField';

export default {
  title: 'Components/SearchField',
  component: SearchField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <SearchField {...args} />;

export const Default = Template.bind({});
