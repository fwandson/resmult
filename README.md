# Sistema Aberto de Gestão Unificada - SAGU - Frontend

## Resumo

A **solução de gestão acadêmica (SAGU)** tem o objetivo de automatizar os processos de instituições de ensino, acompanhando a vida do aluno desde a sua inscrição no processo de seleção, até a emissão de seu certificado de conclusão. A solução prevê todas as interações que existem entre o aluno e a instituição de ensino.

> `Esse projeto abrange o frontend do módulo de integração interdisciplinar`

## Tecnologias utilizadas

- [React](https://pt-br.reactjs.org/): Uma biblioteca JavaScript para criar interfaces de usuário.
- [TypeScript](https://www.typescriptlang.org/): TypeScript é um superconjunto de JavaScript desenvolvido pela Microsoft que adiciona tipagem e alguns outros recursos a linguagem.
- [Material UI](https://material-ui.com/pt/): Biblioteca de componentes React para um desenvolvimento ágil e fácil.

## Dependências do projeto

- [date-fns](https://date-fns.org/): Fornece o conjunto de ferramentas mais abrangentes, porém simples e consistentes para manipular datas JavaScript em um navegador e Node.js.
- [lodash](https://lodash.com/): Uma biblioteca de utilitários JavaScript moderna que oferece modularidade, desempenho e extras.
- [react-helmet](https://github.com/nfl/react-helmet): Este componente React reutilizável gerenciará todas as suas alterações no cabeçalho do documento.
- [react-hook-form](https://react-hook-form.com/): Formulários eficientes, flexíveis e extensíveis com validação fácil de usar.
- [react-perfect-scrollbar](https://github.com/goldenyz/react-perfect-scrollbar): Este é um invólucro para permitir o uso da [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar) no React.
- [react-router-dom](https://reactrouter.com/web/guides/quick-start): Gerenciador de rotas no React.
- [react-text-mask](https://github.com/text-mask/text-mask): Biblioteca de máscaras de `inputs` para React.
- [react-toastify](https://fkhadra.github.io/react-toastify/introduction): Notificações estilizadas para o React.
- [styled-components](link): Use os melhores bits de ES6 e CSS para estilizar seus aplicativos sem estresse 💅🏾.
- [yup](link): Validações com JS. (Nesse projeto, usamos ele em conjunto com o `react-hook-form`).

## Como Testar

### `git clone https://github.com/EscolaDeSaudePublica/sagu-front.git`

Baixar o repositório.

### `cd sagu-front`

Entrar na pasta.

### `yarn install`

Instala as dependências do projeto.

### `yarn start`

Executa o aplicativo no modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para vê-lo no navegador.

### `yarn build`

Compila o aplicativo para produção na pasta `build`.\
Ele agrupa corretamente o React no modo de produção e otimiza a construção para o melhor desempenho.
