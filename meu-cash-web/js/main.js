// Desestruturamos as funções que vamos usar do objeto global 'Vue'
const { createApp, ref, computed, onMounted } = Vue;

// --- DEFINIÇÃO DOS COMPONENTES ---

// Componente: VisaoGeral
// Responsável por mostrar o saldo e o extrato de transações.
const VisaoGeral = {
    props: ['saldo', 'transacoes'],
    template: `
        <div class="card">
            <h2>Saldo Atual</h2>
            <h1 :class="saldo >= 0 ? 'ganho' : 'gasto'">
                {{ formatarMoeda(saldo) }}
            </h1>
        </div>
        <div class="card">
            <h2>Últimas Movimentações</h2>
            <ul v-if="transacoes.length" class="lista-transacoes">
                <li v-for="t in transacoes.slice().reverse().slice(0, 10)">
                    <span>{{ t.descricao }} ({{ t.categoria }})</span>
                    <span :class="t.tipo === 'ganho' ? 'ganho' : 'gasto'">
                        {{ t.tipo === 'ganho' ? '+' : '-' }} {{ formatarMoeda(t.valor) }}
                    </span>
                </li>
            </ul>
            <p v-else>Nenhuma transação registrada ainda.</p>
        </div>
    `,
    methods: {
        formatarMoeda(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }
};

// Componente: RegistrarTransacao
// Contém o formulário para adicionar novos ganhos e gastos.
const RegistrarTransacao = {
    emits: ['transacao-adicionada'], // Declara o evento que o componente pode emitir
    setup(props, { emit }) {
        // 'ref' cria variáveis reativas
        const descricao = ref('');
        const valor = ref(0);
        const tipo = ref('ganho'); // 'ganho' ou 'gasto'
        const categoria = ref('fixo'); // 'fixo' ou 'eventual'

        function registrar() {
            if (!descricao.value || valor.value <= 0) {
                alert('Por favor, preencha a descrição e um valor válido.');
                return;
            }
            
            // Cria um novo objeto de transação
            const novaTransacao = {
                id: Date.now(), // ID único baseado no timestamp
                descricao: descricao.value,
                valor: valor.value,
                tipo: tipo.value,
                categoria: categoria.value
            };

            // Emite o evento para o componente pai com os dados da transação
            emit('transacao-adicionada', novaTransacao);

            // Limpa os campos do formulário
            descricao.value = '';
            valor.value = 0;
        }

        return { descricao, valor, tipo, categoria, registrar };
    },
    template: `
        <div class="card">
            <h2>Registrar Movimentação</h2>
            <form @submit.prevent="registrar">
                <div class="form-group">
                    <label for="descricao">Descrição</label>
                    <input type="text" v-model="descricao" id="descricao" placeholder="Ex: Salário, Aluguel">
                </div>
                <div class="form-group">
                    <label for="valor">Valor</label>
                    <input type="number" v-model.number="valor" id="valor" step="0.01" min="0.01">
                </div>
                <div class="form-group">
                    <label for="tipo">Tipo</label>
                    <select v-model="tipo" id="tipo">
                        <option value="ganho">Ganho</option>
                        <option value="gasto">Gasto</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="categoria">Categoria</label>
                    <select v-model="categoria" id="categoria">
                        <option value="fixo">Fixo</option>
                        <option value="eventual">Eventual</option>
                    </select>
                </div>
                <button type="submit" class="btn-submit">Adicionar</button>
            </form>
        </div>
    `
};

// Componente: Calculadora
// Uma calculadora simples, como no seu app em C.
const Calculadora = {
    setup() {
        const num1 = ref(0);
        const num2 = ref(0);
        const operador = ref('+');
        const resultado = computed(() => {
            switch (operador.value) {
                case '+': return num1.value + num2.value;
                case '-': return num1.value - num2.value;
                case '*': return num1.value * num2.value;
                case '/': return num2.value !== 0 ? num1.value / num2.value : 'Divisão por zero';
                default: return 0;
            }
        });
        
        return { num1, num2, operador, resultado };
    },
    template: `
        <div class="card">
            <h2>Calculadora Simples</h2>
            <div class="form-group">
                <input type="number" v-model.number="num1">
            </div>
            <div class="form-group">
                <select v-model="operador">
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
            </div>
            <div class="form-group">
                <input type="number" v-model.number="num2">
            </div>
            <h3>Resultado: {{ resultado }}</h3>
        </div>
    `
};


// --- APLICAÇÃO PRINCIPAL ---

createApp({
    // A função setup é onde a mágica acontece no Vue 3
    setup() {
        // Estado principal da aplicação
        const currentView = ref('visaoGeral'); // Controla qual "tela" é exibida
        const transacoes = ref([]); // Array para armazenar todas as transações

        // 'computed' cria uma propriedade que se atualiza automaticamente
        // quando suas dependências (transacoes.value) mudam.
        const saldo = computed(() => {
            return transacoes.value.reduce((acc, t) => {
                return t.tipo === 'ganho' ? acc + t.valor : acc - t.valor;
            }, 0);
        });

        // Função para adicionar uma nova transação à lista
        function adicionarTransacao(novaTransacao) {
            transacoes.value.push(novaTransacao);
            salvarDados(); // Salva no localStorage sempre que uma transação é adicionada
            currentView.value = 'visaoGeral'; // Volta para a tela principal após o registro
        }
        
        // Funções para persistência de dados no navegador
        function salvarDados() {
            localStorage.setItem('meuCashTransacoes', JSON.stringify(transacoes.value));
        }

        function carregarDados() {
            const dadosSalvos = localStorage.getItem('meuCashTransacoes');
            if (dadosSalvos) {
                transacoes.value = JSON.parse(dadosSalvos);
            }
        }
        
        // Hook de ciclo de vida: executa a função quando o componente é "montado" na tela.
        onMounted(carregarDados);

        // Retorna tudo que o template (no index.html) precisa acessar
        return {
            currentView,
            transacoes,
            saldo,
            adicionarTransacao
        };
    },
    // Registra os componentes para que possam ser usados no template
    components: {
        VisaoGeral,
        RegistrarTransacao,
        Calculadora
    }
}).mount('#app'); // Monta a aplicação no elemento <div id="app"></div>