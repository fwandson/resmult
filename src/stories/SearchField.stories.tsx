import { TextFieldProps } from '@material-ui/core';
import { Box, Typography } from '@material-ui/core/';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import SearchField from 'src/components/SearchField';
import CONSTANTS from 'src/config';
import { useDebounce } from 'use-debounce/lib';

export default {
  title: 'Components/SearchField',
  component: SearchField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box>
      <SearchField
        {...args}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Typography>Value: {searchValue}</Typography>
    </Box>
  );
};

const TemplateDebaunced: Story<TextFieldProps> = (args) => {
  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebaunced] = useDebounce(
    searchValue,
    CONSTANTS.DEBOUNCE_TIME
  );

  return (
    <Box>
      <SearchField
        {...args}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Typography>Value Debaunced: {searchValueDebaunced}</Typography>
    </Box>
  );
};

export const Default = Template.bind({});

export const Debaunced = TemplateDebaunced.bind({});
