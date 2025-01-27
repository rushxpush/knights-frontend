# Knights Challenge - Frontend

[Tecnologias](#tecnologias) | [Funcionalidades](#funcionalidades) | [Descrição](#descrição) | [Instalação](#instalação) | [Suporte](#suporte) | [Lista de bugs](#lista-de-bugs) | [Bugs Resolvidos](#bugs-resolvidos)

## Tecnologias

<ul>
  <li>Vue</li>
  <!-- <li>Pinia</li> -->
  <li>Oh, Vue Icons!</li>
  <li>Vue Router</li>
</ul>

[Ir para o topo](#knights-challenge---frontend)

## Funcionalidades

- &check; Tela de cadastro de knight
- &check; Lógica para selecionar armas
- &check; Lógica para equipar arma
- &check; Lógica para remover arma 
- &check; Funções geradoras de atributos aleatórios
- &check; Handler para juntar dados em um json e enviar POST request para cadastrar knight no servidor
- &check; Criar estilo simples para component CreateKnight.vue
- &check; Containerizar aplicação
- &check; Configurar servidor para dar suporte ao history mode do Vue Router
- &check; Criar componente ListKnight.vue para exibir lista de todos os knights
- &check; Permitir update de nickname de knight
- &check; Aplicar os tipos do Typescript em todas as funções e variáveis que faltam
- &#x2610; Modal para mostrar se mudanças foram bem (ou mal) sucedidas no banco.
- &#x2610; Adicionar validação para POST request. Não permitir que request seja feito sem que todos os dados estejam preenchidos
- &#x2610; Lista para exibir todos os knights
- &#x2610; View para ver os detalhes de um knight
- &#x2610; Filtro para exibir apenas knights que viram heróis
- &#x2610; Botão para remover knight
- &#x2610; Implementar testes unitários
- &#x2610; Testes e2e

[Ir para o topo](#knights-challenge---frontend)

## Descrição

[Ir para o topo](#knights-challenge---frontend)

## Instalação

1. Faça um clone do repositório:
```bash
git clone git@github.com:rushxpush/knights-frontend.git
cd knights-frontend
```

2. Monte a imagem e rode:
```bash
docker compose up --build
```

3. Não esqueça de montar a imagem do backend e rodar. Link: [knights-challenge-backend](https://github.com/rushxpush/knights-backend)


4. Acesse a página em [localhost:8080](http://localhost:8080)

[Ir para o topo](#knights-challenge---frontend)

## Suporte

Qualquer dúvida mande um email para [rafagarciadev@gmail.com](mailto:rafagarciadev@gmail.com)

[Ir para o topo](#knights-challenge---frontend)

## Lista de bugs

- &#x2610; Clicar no botão para remover armas da problema. Remover uma arma desequipada desequipa a outra. Caso haja três armas, remover uma arma desequipada, remove as duas desequipadas e desequipa a equipada.
- &#x2610; Acessar qualquer link que não seja http://localhost:8080 na barra de navegação gera um erro de página não encontrada (falta configurar o servidor para dar suporte ao Vue Router)


[Ir para o topo](#knights-challenge---frontend)

## Bugs Resolvidos

[Ir para o topo](#knights-challenge---frontend)