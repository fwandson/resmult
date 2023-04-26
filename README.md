# Sistema Aberto de Gestão Unificada - SAGU - Frontend

## Resumo

A `Solução de Gestão Acadêmica Unificada (SAGU)` tem o objetivo de automatizar os processos de instituições de ensino, acompanhando a vida do aluno desde a sua inscrição no processo de seleção, até a emissão de seu certificado de conclusão. A solução prevê todas as interações que existem entre o aluno e a instituição de ensino.

> `Esse projeto abrange o frontend do módulo de integração interdisciplinar`

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/): Uma biblioteca `JavaScript` para criar interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/): `TypeScript` é um superconjunto de `JavaScript` desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem.
- [Material UI](https://material-ui.com/pt/): Biblioteca de componentes `React` para um desenvolvimento ágil e fácil 🔥.
- [Material-UI Pickers](https://material-ui.com/pt/): Selecionadores de data e hora, desenvolvidos com ❤️ para `@material-ui/core`.

## Dependências do projeto

- [date-fns](https://date-fns.org/): Fornece o conjunto de ferramentas mais abrangentes, porém simples e consistentes para manipular datas `JavaScript` em um navegador e `Node.js`.
- [lodash](https://lodash.com/): Uma biblioteca de utilitários `JavaScript` moderna que oferece modularidade, desempenho e extras.
- [react-helmet](https://github.com/nfl/react-helmet): Este componente `React` reutilizável gerenciará todas as suas alterações no cabeçalho do documento 🎧.
- [react-hook-form](https://react-hook-form.com/): Formulários eficientes, flexíveis e extensíveis com validação fácil de usar.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): Gerenciador de rotas no `React` 📍.
- [react-text-mask](https://github.com/text-mask/text-mask): Biblioteca de máscaras de `inputs` para `React`.
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction): Notificações estilizadas para o React.
- [styled-components](https://styled-components.com/): Use os melhores bits de ES6 e CSS para estilizar seus aplicativos sem estresse 💅🏾.
- [yup](https://github.com/jquense/yup): Validações com JS. (Nesse projeto, usamos ele em conjunto com o `react-hook-form`).
- [storybook](https://storybook.js.org/): `Storybook` é uma ferramenta de código aberto para construir componentes de interface do usuário e páginas de forma isolada. Ele agiliza o desenvolvimento, teste e documentação da IU.

## Como Testar

### `git clone https://github.com/EscolaDeSaudePublica/sagu-front.git`

Baixar o repositório.

### `cd sagu-front`

Entrar na pasta.

### `yarn install`

Instala as dependências do projeto.

### `cp .env.example .env`

Cria o arquivo de variáveis para o ambiente de `produção`. Configure tambem as variáveis para os ambientes de `desenvolvimento` e `testes` em `.env.development` e `.env.test` respectivamente.

```bash
# Essas são as variáveies de hambiente

# URL da API
REACT_APP_API_BASE_URL='http://localhost:XXXX'

# Delay na api para simular uma aplicação real (somente usado em desenvolvimento ou test)
REACT_APP_API_DELAY=1000
```

### `yarn start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para vê-lo no navegador.

### `yarn build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a construção para o melhor desempenho.

### `yarn storybook`

Executa o aplicativo no modo storybook.\
Abra [http://localhost:6006/](http://localhost:6006/) para vê-lo no navegador.
