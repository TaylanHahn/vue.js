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
    <div id="app">
        <p>{{ message }}</p>
    </div>

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
        const app = Vue.createApp({
            // O objeto de opções do app pode ficar vazio
        });

        // Registrando a diretiva globalmente
        app.directive('foco', {
            // Este hook é chamado quando o elemento é inserido no DOM
            mounted(el) {
                el.focus(); // Aplica o foco ao elemento
            }
        });
        app.mount('#app');
````
Uso no HTML:
````html
<body>
    <div id="app">
        <p>O campo de input abaixo receberá o foco automaticamente ao carregar a página.</p>
        
        <input v-foco type="text" placeholder="Eu estou com o foco!">
    </div>
</body>
````
>> Neste exemplo: registramos a diretiva personalizada v-foco e a aplicamos ao ``<input>``. No hook mounted da diretiva, chamamos ``el.focus()``, fazendo o campo receber foco automaticamente.

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

---

# Mas quando usar cada coisa??? 🤔
### Dúvidas que podem surgir na manipulção dos componentes:
- Quando é preciso colocar um código dentro de um ``methods`` ou de um ``computed``?
- Quando preciso definir o que vai no ``data()``?
- Como saber qual é o trecho do codigo HTML que deve colocar em template?
- Quais props são necessárias em cada caso?

  Para isso, é importante entender o uso CORRETO de cada um deles:

## 1. `data()` → Estado Reativo do Componente
👉 Pergunte-se: *“Esse valor pode mudar com o tempo e deve refletir no HTML?”*
- Se SIM → vai em ``data()``.
- Se NÃO (é fixo, não precisa ser reativo) → pode ser uma constante no script normal.

Exemplo:
````js
data() {
  return {
    contador: 0,        // muda conforme o usuário interage
    tema: "claro"       // pode mudar via botão de toggle
  }
}
````
>> Nota: Use ``data()`` para valores que variam durante o ciclo de vida do componente.

## 2. `methods` → Ações / Funções do Usuário
👉 Pergunte-se: *“Essa função depende de uma ação do usuário ou evento do sistema?”*
- Se SIM → methods.
São chamadas sempre que acionadas, não ficam armazenadas em cache.

Exemplo:
````js
methods: {
  incrementar() {
    this.contador++
  },
  alternarTema() {
    this.tema = this.tema === "claro" ? "escuro" : "claro"
  }
}
````
>> Nota: Use ``methods`` para funções que alteram estado ou executam lógicas sob demanda.

## 3. `computed` → Valores Derivados (Cacheados)
👉 Pergunte-se: *“Esse valor é calculado a partir de outros dados e eu quero que ele seja recalculado só quando necessário?”*
- Se SIM → computed.
Diferente de methods, computed guarda em cache até que suas dependências mudem.

Exemplo:
````js
data() {
  return {
    nome: "Taylan",
    sobrenome: "Hahn"
  }
},
computed: {
  nomeCompleto() {
    return this.nome + " " + this.sobrenome
  }
}
````
>> Nota: Use computed quando precisar de valores derivados que dependem do estado reativo.

## 4. `template` → Estrutura Visual
👉 Pergunte-se: *“Isso é o que aparece no HTML?”*
- Se SIM → vai no template.
Só podem ser expressões simples ``({{ }})``, sem *lógica complexa* (essa lógica deve estar em computed ou methods).

Exemplo:
````js
<template>
  <div>
    <h1>{{ nomeCompleto }}</h1>
    <button @click="incrementar">Contador: {{ contador }}</button>
  </div>
</template>
````
>> Nota: O ``template`` é só a parte declarativa. A lógica fica no **script**.

## 5. `props` → Comunicação Pai → Filho
👉 Pergunte-se: “Esse dado pertence ao componente pai, mas o filho precisa saber dele?”
- Se SIM → use props.
Props são imutáveis dentro do filho — se precisar mudar, emita um evento para o pai.

Exemplo (filho):
````js
export default {
  props: ["titulo"]
}
````
Uso no HTML (pai):
````html
<MeuComponente titulo="Bem-vindo!" />
````
>> Nota: Use ``props`` para personalizar componentes reutilizáveis.

## 6. ``watch`` → Efeitos Colaterais (Reações a Mudanças)
👉 Pergunte-se: "Preciso executar uma ação automaticamente sempre que um dado específico (data ou prop) mudar?"
Se SIM → watch.
Use watch para executar código assíncrono ou custoso em resposta a mudanças de dados. Por exemplo, fazer uma chamada de API quando um ID muda.

Exemplo:
````js
data() {
  return {
    termoDeBusca: '',
    resultados: []
  }
},
watch: {
  // Sempre que `termoDeBusca` mudar...
  termoDeBusca(novoTermo) {
    // ...executa esta ação (efeito colateral)
    if (novoTermo.length > 2) {
      this.buscarResultadosNaAPI(novoTermo); 
    }
  }
}
````
>> Nota: Use ``watch`` para executar "efeitos colaterais" reativos. É a ferramenta certa para lógica que não calcula um valor para ser exibido (isso é computed), mas que precisa agir quando um valor muda (ex: chamadas de API, salvar no localStorage).


## 🧭 Resumindo com uma “regra de bolso”
- Vai mudar com interação? → ``data`` (o que muda o tempo todo)
- Precisa executar ação? → ``methods`` (o que faz acontecer)
- É um valor derivado de outro? → ``computed`` (o que deriva do que muda)
- É o que será exibido na tela? → ``template`` (o que aparece pro usuário)
- Precisa vir de fora (pai → filho)? → ``props`` (o que vem de fora)
- Precisa reagir a uma mudança específica? → ``watch`` (o que reage a uma mudança)

Exemplo COMPLETO do uso em conjunto:
````vue
<template>
  <div>
    <h1>{{ titulo }}</h1>
    <h2>Nome completo: {{ nomeCompleto }}</h2>

    <p>Contador: {{ contador }}</p>
    <p v-if="contador > 5" class="aviso">
      O contador já passou de 5!
    </p>

    <button @click="incrementar">+1</button>
  </div>
</template>

<script>
export default {
  props: ["titulo"],     // dado vindo de fora (pai → filho)
  data() {
    return {
      nome: "Taylan",    // estado reativo
      sobrenome: "Hahn",
      contador: 0
    }
  },
  computed: {
    nomeCompleto() {     // valor derivado
      return this.nome + " " + this.sobrenome
    }
  },
  watch: {
    // observador para a propriedade 'contador'
    contador(novoValor, valorAntigo) {
      console.log(`O contador mudou de ${valorAntigo} para ${novoValor}`);

      // Executa uma lógica específica quando uma condição é atingida
      if (novoValor === 10) {
        // Isso é um "efeito colateral"
        console.warn('🎉 O contador atingiu 10! Um marco importante!');
      }
    }
  },
  methods: {
    incrementar() {      // ação disparada por evento
      this.contador++;
    }
  }
}
</script>

<style>
  .aviso {
    color: green;
    font-weight: bold;
  }
</style>
````
