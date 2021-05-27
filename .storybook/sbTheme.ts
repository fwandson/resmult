import { create } from "@storybook/theming";

const sbTheme = create({
  base: "dark",
  brandTitle: "Sagu Storybook",
  // TODO: colocar a url do projeto
  // brandUrl: "https://example.com",
  brandImage: "./static/logo.svg",
});

export default sbTheme;
