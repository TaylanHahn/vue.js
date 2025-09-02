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


