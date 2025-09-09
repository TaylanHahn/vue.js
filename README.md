# Vue.js 
> Vue.js é um framework JavaScript para a construção de interfaces de usuário. Ele é projetado para ser adotado de forma incremental e pode ser facilmente integrado a outros projetos e bibliotecas JavaScript. Vue.js é uma ferramenta poderosa para a criação de aplicações web interativas e dinâmicas.

**Para usar o Vue, é necessário importar o script no head do seu arquivo HTML:**
````html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.global.min.js">
````

## Principais Diretivas 📜
Vue.js fornece um conjunto de diretivas que podem ser usadas para manipular o DOM de forma declarativa. Aqui estão algumas das principais diretivas do Vue.js:

- `v-bind`: associa um atributo HTML ao valor de uma expressão Vue.
- `v-model`: vincula um elemento de formulário a uma variável Vue.
- `v-if` e `v-else`: exibe ou oculta um elemento com base em uma condição.
- `v-for`: renderiza uma lista de elementos com base em uma matriz de dados.
- `v-on`: associa um evento do DOM a um método no Vue.

>> **Demonstrativo simples de como "inicia-se" o Vue em um HTML:**
````html
<body>
    <div id="app"></div>

 <script>
        // Vue 3
        const app = Vue.createApp({
            data() {
                return {
                    message: 'Hello Vue in CPW2!'
                }
            }
        })
        app.mount('#app')
 </script>
</body>
````

>> Neste exemplo, criamos uma instância Vue chamada app e a associamos a um elemento HTML com o ID app. O objeto data contém uma propriedade ``message`` que é exibida na página usando a sintaxe de interpolação ``{{ }}``.

- Neste exemplo é que o Vue.js é importado diretamente. Isso significa que você pode começar a usá-lo em um projeto sem precisar instalar nada localmente.
- É uma biblioteca progressiva, o que significa que você pode adotar o Vue de forma incremental em um projeto existente, sem a necessidade de reescrever todo o código.
- Outra característica importante é a sua ***reatividade***.
    - Quando os dados associados a uma instância Vue são alterados, a interface do usuário é automaticamente atualizada para refletir essas alterações. Isso o torna uma ferramenta poderosa para a criação de interfaces de usuário dinâmicas.


## Módulos 📦
Em JavaScript, módulos permitem dividir um programa em arquivos separados e independentes, facilitando a organização e reutilização de código. ***Cada módulo pode exportar variáveis, funções, classes ou objetos, que podem ser importados por outros módulos.*** Isso resulta em um código mais limpo, fácil de manter e melhora a colaboração em projetos maiores. 

Um exemplo simples:
> math.js
````js
export function soma(a, b) {
  return a + b;
}
````
> app.js
````js
import { soma } from ‘./math.js’;
console.log(soma(2, 3));
````
>> Neste exemplo, o arquivo math.js exporta a função soma. No arquivo app.js, a função é importada e chamada, exibindo o resultado no console.

## Componentes 🧩
No Vue.js, existe o conceito de componente, que nada mais é do que blocos reutilizáveis de código que representam partes da interface do usuário. ***Eles permitem dividir uma aplicação em pedaços menores, organizados e independentes, facilitando a manutenção e a reutilização.*** Nesse sentido, os componentes no Vue pode ser considerados como módulos JavaScript.

Para criarmos um componente Vue em JavaScript podemos fazer o seguinte:
````js
export default {
  name: "MyImage",
  props: ["src", "alt"],
  template: `<img :src="src" :alt="alt" />`
};
````
>> Neste exemplo, criamos um componente chamado ``MyImage`` que recebe duas propriedades (src e alt) e renderiza uma tag <img>. Assim, podemos reutilizar este componente em vários pontos da aplicação.

## Propriedades Reativas ⚡
No Vue.js, as propriedades reativas são variáveis declaradas dentro de ``data()`` que, quando alteradas, atualizam automaticamente a interface.

Exemplo:
````html
<div id="app">
  <p>{{ contador }}</p>
  <button @click="contador++">Incrementar</button>
</div>

<script>
const app = Vue.createApp({
  data() {
    return {
      contador: 0
    }
  }
})
app.mount('#app')
</script>
````
>> Neste exemplo, o botão usa @click para incrementar contador. Como contador é reativo (definido em data()), o Vue atualiza o <p> automaticamente a cada clique.

## Computed Properties 🧮
As computed properties são propriedades derivadas de outras variáveis reativas. Elas são úteis para cálculos automáticos baseados nos dados.

Exemplo:
````html
<div id="app">
  <p>Nome completo: {{ nomeCompleto }}</p>
</div>

<script>
const app = Vue.createApp({
  data() {
    return {
      nome: "Taylan",
      sobrenome: "Hahn"
    }
  },
  computed: {
    nomeCompleto() {
      return this.nome + ' ' + this.sobrenome;
    }
  }
})
app.mount('#app')
</script>
````
>> Neste exemplo, a propriedade nomeCompleto é calculada automaticamente com base em nome e sobrenome. Sempre que um deles mudar, o valor de nomeCompleto será atualizado.

## Lifecycle Hooks ⏳
O Vue oferece hooks de ciclo de vida, que permitem executar código em momentos específicos do ciclo de um componente.

### Principais hooks:
- ``created``: chamado após a criação da instância.
- ``mounted``: chamado após o componente ser montado no DOM.
- ``updated``: chamado sempre que houver mudanças reativas.
- ``unmounted``: chamado quando o componente é destruído.

Exemplo:
````js
const app = Vue.createApp({
  data() {
    return { mensagem: "Vue Lifecycle!" }
  },
  mounted() {
    console.log("O componente foi montado!");
  }
})
app.mount('#app')
````
>> Neste exemplo, usamos o hook mounted para exibir uma mensagem no console assim que o componente é montado no DOM.

## Diretivas Personalizadas 🛠️
Além das diretivas nativas (``v-if``, ``v-for``, etc.), é possível criar diretivas personalizadas no Vue.

Exemplo:
````js
const app = Vue.createApp({})

app.directive('foco', {
  mounted(el) {
    el.focus()
  }
})

app.mount('#app')
````
Uso no HTML:
````html
<input v-foco />
````
>> Neste exemplo: registramos a diretiva personalizada v-foco e a aplicamos ao <input>. No hook mounted da diretiva, chamamos el.focus(), fazendo o campo receber foco automaticamente.

## Event Handling 🎛️
O Vue facilita a manipulação de eventos com ``v-on`` ou ``@``.

Exemplo:
````html
<div id="app">
  <button @click="dizerOi">Clique aqui</button>
</div>

<script>
const app = Vue.createApp({
  methods: {
    dizerOi() {
      alert("Olá do Vue!");
    }
  }
})
app.mount('#app')
</script>
````
>> Neste exemplo: ``@click`` é atalho para ``v-on:click``. O método dizerOi é resolvido em methods e executa no contexto do componente.

## Slots 🧳
Slots permitem inserir conteúdo dinâmico dentro de componentes.

Exemplo de componente com slot:
````js
app.component('Card', {
  template: `
    <div class="card">
      <slot></slot>
    </div>
  `
})
````
Uso:
````html
<Card>
  <h2>Título dentro do slot</h2>
  <p>Conteúdo flexível passado para o componente</p>
</Card>
````
>> Neste exemplo: o componente Card define um ``<slot>``; tudo que é colocado entre ``<Card>...</Card>`` é injetado ali, permitindo inserir qualquer conteúdo dentro dele. Isso torna o componente mais flexível e reutilizável.

## Single File Components (SFC) 📂
No desenvolvimento real com Vue (usando ferramentas como Vite ou Vue CLI), os componentes são criados em arquivos .vue, chamados Single File Components.

Estrutura básica:
````html
<template>
  <h1>{{ titulo }}</h1>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Meu Primeiro Componente"
    }
  }
}
</script>

<style scoped>
h1 {
  color: purple;
}
</style>
````
>> Neste exemplo, criamos um Single File Component que possui três seções: template (HTML), script (lógica) e style (CSS). Isso organiza melhor o código e facilita a manutenção.
