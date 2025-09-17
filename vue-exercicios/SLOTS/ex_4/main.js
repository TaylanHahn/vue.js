import Card from './components/Card.js';

const app = Vue.createApp({
  data() {
    return {
      produtos: [
        { id: 1, nome: 'Notebook Pro', categoria: 'Eletrônicos', preco: 7500.00 },
        { id: 2, nome: 'Mouse sem Fio', categoria: 'Acessórios', preco: 150.50 },
        { id: 3, nome: 'Teclado Mecânico', categoria: 'Acessórios', preco: 350.00 },
        { id: 4, nome: 'Monitor 4K', categoria: 'Eletrônicos', preco: 2200.00 }
      ],
      produtoSelecionado: null,
      produtosVazio: []
    }
  },
  methods: {
    mostrarDetalhes(produto) {
      this.produtoSelecionado = produto;
      alert(`Mais detalhes sobre: ${produto.nome}\nPreço: R$ ${produto.preco.toFixed(2)}`);
    }
  }
});
app.component('product-card', Card);
app.mount('#app');