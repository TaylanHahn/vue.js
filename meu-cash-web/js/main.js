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

// js/main.js

// ... (O resto do seu código: createApp, VisaoGeral, RegistrarTransacao, etc.)

// Componente: Calculadora (VERSÃO DINÂMICA)
// Uma calculadora interativa com botões.
const Calculadora = {
    setup() {
        // --- Estado da Calculadora ---
        // ref() cria variáveis reativas que atualizam a tela quando seus valores mudam.
        const currentInput = ref('0'); // O valor exibido na tela da calculadora
        const previousValue = ref(null); // Armazena o primeiro número de uma operação
        const operator = ref(null); // Armazena o operador (+, -, *, /)
        const operatorClicked = ref(false); // Flag para saber se um operador foi a última tecla pressionada

        // --- Métodos da Calculadora ---

        // Limpa tudo e reseta para o estado inicial
        const clear = () => {
            currentInput.value = '0';
            previousValue.value = null;
            operator.value = null;
            operatorClicked.value = false;
        };

        // Adiciona um número ao visor
        const appendNumber = (number) => {
            // Se um operador foi clicado, limpa o visor para o próximo número
            if (operatorClicked.value) {
                currentInput.value = '';
                operatorClicked.value = false;
            }
            // Se o visor for '0', substitui pelo número, senão, concatena
            if (currentInput.value === '0') {
                currentInput.value = number;
            } else {
                currentInput.value += number;
            }
        };

        // Adiciona o ponto decimal, se ainda não existir
        const appendDecimal = () => {
            if (!currentInput.value.includes('.')) {
                currentInput.value += '.';
            }
        };

        // Define o operador da conta
        const setOperator = (op) => {
            // Se já houver uma operação anterior, calcula antes de prosseguir
            if (previousValue.value !== null) {
                calculate();
            }
            previousValue.value = parseFloat(currentInput.value);
            operator.value = op;
            operatorClicked.value = true;
        };

        // Realiza o cálculo final
        const calculate = () => {
            if (operator.value === null || previousValue.value === null) return;
            
            const currentValueFloat = parseFloat(currentInput.value);
            let result;

            switch (operator.value) {
                case '+': result = previousValue.value + currentValueFloat; break;
                case '-': result = previousValue.value - currentValueFloat; break;
                case '*': result = previousValue.value * currentValueFloat; break;
                case '/': result = previousValue.value / currentValueFloat; break;
            }

            currentInput.value = String(result);
            previousValue.value = null;
            operator.value = null;
        };

        // Retorna as variáveis e métodos para serem usados no template
        return { 
            currentInput, 
            clear, 
            appendNumber, 
            appendDecimal, 
            setOperator, 
            calculate 
        };
    },
    template: `
        <div class="card">
            <h2>Calculadora Dinâmica</h2>
            <div class="calculator">
                <div class="display">{{ currentInput }}</div>
                <div class="buttons">
                    <button @click="clear" class="btn operator">C</button>
                    <button @click="setOperator('/')" class="btn operator">÷</button>
                    <button @click="setOperator('*')" class="btn operator">×</button>
                    <button @click="setOperator('-')" class="btn operator">−</button>
                    
                    <button @click="appendNumber('7')" class="btn">7</button>
                    <button @click="appendNumber('8')" class="btn">8</button>
                    <button @click="appendNumber('9')" class="btn">9</button>
                    <button @click="setOperator('+')" class="btn operator" style="grid-row: span 2;">+</button>

                    <button @click="appendNumber('4')" class="btn">4</button>
                    <button @click="appendNumber('5')" class="btn">5</button>
                    <button @click="appendNumber('6')" class="btn">6</button>

                    <button @click="appendNumber('1')" class="btn">1</button>
                    <button @click="appendNumber('2')" class="btn">2</button>
                    <button @click="appendNumber('3')" class="btn">3</button>
                    <button @click="calculate" class="btn equals" style="grid-row: span 2;">=</button>
                    
                    <button @click="appendNumber('0')" class="btn" style="grid-column: span 2;">0</button>
                    <button @click="appendDecimal" class="btn">.</button>
                </div>
            </div>
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
