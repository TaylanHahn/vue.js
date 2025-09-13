import TarefaItem from './components/TarefaItem.js';

const app = Vue.createApp({
    data() {
        return {
            novoItem: '',
            lista: []
        }
    },
    methods: {
        adicionar() {
            if (this.novoItem.trim() == '') {
                alert("Digite algo para adicionar!");
                return;
            }

            this.lista.push({
                lista: this.novoItem
            });

            this.novoItem = '';
        },
        deletar(index) {
            this.lista.splice(index, 1);
        }
    }
})
app.component('tarefa-item', TarefaItem);
app.mount('#lista');