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

>> Neste exemplo, criamos uma instância Vue chamada app e a associamos a um elemento HTML com o ID app. O objeto data contém uma propriedade message que é exibida na página usando a sintaxe de interpolação ``.

- Neste exemplo é que o Vue.js é importado diretamente. Isso significa que você pode começar a usá-lo em um projeto sem precisar instalar nada localmente.
- É uma biblioteca progressiva, o que significa que você pode adotar o Vue de forma incremental em um projeto existente, sem a necessidade de reescrever todo o código.
- Outra característica importante é a sua ***reatividade***.
    - Quando os dados associados a uma instância Vue são alterados, a interface do usuário é automaticamente atualizada para refletir essas alterações. Isso o torna uma ferramenta poderosa para a criação de interfaces de usuário dinâmicas.


## Módulos
Em JavaScript, módulos permitem dividir um programa em arquivos separados e independentes, facilitando a organização e reutilização de código. ***Cada módulo pode exportar variáveis, funções, classes ou objetos, que podem ser importados por outros módulos.*** Isso resulta em um código mais limpo, fácil de manter e melhora a colaboração em projetos maiores. 

Um exemplo simples:
````js
export function soma(a, b) {
  return a + b;
}
````
````js
import { soma } from ‘./math.js’;
console.log(soma(2, 3));
````

## Componentes
No Vue.js, existe o conceito de componente, que nada mais é do que blocos reutilizáveis de código que representam partes da interface do usuário. ***Eles permitem dividir uma aplicação em pedaços menores, organizados e independentes, facilitando a manutenção e a reutilização.*** Nesse sentido, os componentes no Vue pode ser considerados como módulos JavaScript.

Para criarmos um componente Vue em JavaScript podemos fazer o seguinte:
````js
export default {
  name: "MyImage",
};
````



