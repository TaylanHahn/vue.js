/**
COMPONENTEs VUE.JS
 */
export default {
  // 1. IDENTIFICAÇÃO E HERANÇA
  // --------------------------------------------------------------------------
  /*
   * 'name': Identificador do componente. Essencial para depuração (com Vue DevTools)
   * e para componentes recursivos (um componente que chama a si mesmo).
   * Convenções: PascalCase ou kebab-case.
   */
  name: 'ComponenteGuiaCompleto',

  /**
   * 'extends': Permite que um componente estenda outro, herdando suas opções.
   * Útil para criar uma base de componente e variações a partir dela.
   */
  // extends: ComponenteBase,

  /**
   * 'mixins': Permite injetar um conjunto de opções reutilizáveis (como data, methods)
   * em múltiplos componentes. Útil para compartilhar lógica comum.
   */
  // mixins: [logMixin, dataFetchMixin],

  // --------------------------------------------------------------------------
  // 2. PROPS (DADOS VINDOS DO COMPONENTE PAI)
  // --------------------------------------------------------------------------

  /**
   * 'props': A forma de comunicação do componente pai para o filho. Define os
   * "atributos" que o componente pode receber. Props devem ser tratadas como imutáveis
   * dentro do componente filho.
   */
  props: {
    // --- Exemplo para um campo de input de formulário ---
    modelValue: {
      // 'type': Pode ser [String, Number] para inputs que aceitam texto ou números.
      // Usado para implementar o v-model em componentes customizados.
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String, // Atributo 'placeholder' de um <input> ou <textarea>.
      required: false,
      default: 'Digite algo...'
    },
    isDisabled: {
      type: Boolean, // Para controlar o atributo 'disabled' de um <input>, <button>, etc.
      default: false
    },

    // --- Exemplo para um componente de imagem <img> ---
    imageUrl: {
      type: String, // Para o atributo 'src' da imagem.
      required: true // Uma imagem sem fonte não faz sentido, então é obrigatória.
    },
    altText: {
      type: String, // Para o atributo 'alt', importante para acessibilidade.
      required: true,
      default: 'Imagem descritiva'
    },

    // --- Exemplo para um item de uma lista ou card ---
    itemData: {
      type: Object, // Recebe um objeto completo com os dados.
      required: true,
      // O valor padrão para Objects ou Arrays DEVE ser retornado por uma função de fábrica.
      default: () => ({ id: null, name: 'Item Padrão', tags: [] })
    },

    // --- Exemplo para configurar o estilo ou comportamento ---
    variant: {
      type: String, // Ex: 'primary', 'secondary', 'danger' para um botão ou alerta.
      default: 'primary',
      validator: function (value) {
        // Validador customizado: a prop só será válida se o valor estiver nesta lista.
        return ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value);
      }
    },

    // --- Exemplo de uma prop que pode ser de múltiplos tipos ---
    identifier: {
      // Útil quando um item pode ser identificado por um número (ID) ou uma string (slug).
      type: [Number, String],
      required: true
    },
  },

  // --------------------------------------------------------------------------
  // 3. ESTADO INTERNO DO COMPONENTE
  // --------------------------------------------------------------------------

  /**
   * 'data': Função que retorna o estado reativo INTERNO e PRIVADO do componente.
   * Tudo aqui pode ser modificado pelo componente.
   */
  data() {
    return {
      // Estado para controlar a UI, como um modal ou dropdown
      isDropdownOpen: false,
      // Estado de carregamento, útil para mostrar spinners durante chamadas de API
      isLoading: false,
      // Dados recebidos de uma API que são gerenciados internamente
      internalApiData: null,
      // Cópia de uma prop para poder ser modificada (padrão comum)
      editableTitle: this.itemData.name,
      // Contador de interações do usuário dentro do componente
      clickCount: 0,
    };
  },

  // --------------------------------------------------------------------------
  // 4. MÉTODOS (LÓGICA E AÇÕES)
  // --------------------------------------------------------------------------

  /**
   * 'methods': Funções que executam lógica. Geralmente são chamadas por eventos
   * (como @click) ou por outras funções dentro do componente.
   */
  methods: {
    // Método para lidar com um evento do DOM, como um clique de botão.
    handleButtonClick() {
      this.clickCount++;
      this.notifyParentAboutClick();
    },

    // Método que busca dados de uma API (exemplo assíncrono).
    async fetchData() {
      this.isLoading = true;
      try {
        // const response = await fetch(`api/items/${this.identifier}`);
        // this.internalApiData = await response.json();
        console.log('Dados buscados com sucesso!');
      } catch (error) {
        console.error('Falha ao buscar dados:', error);
        this.emitErrorState(error);
      } finally {
        this.isLoading = false;
      }
    },

    // Método que emite um evento para o componente pai.
    notifyParentAboutClick() {
      // 'emits' deve ser declarado abaixo para validar este evento.
      this.$emit('component-clicked', { clicks: this.clickCount, componentId: this.identifier });
    },

    // Método para alterar o estado interno do componente.
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    },

    // Método privado/auxiliar, que não é chamado diretamente do template.
    // Convenção: iniciar com _ para indicar uso interno.
    _logInternalState(message) {
        console.log(`[${this.name} LOG]: ${message}`, this.$data);
    },

    // Método que emite um evento de erro para o pai.
    emitErrorState(errorDetails) {
        this.$emit('error-occurred', errorDetails);
    }
  },

  // --------------------------------------------------------------------------
  // 5. EMISSÃO DE EVENTOS
  // --------------------------------------------------------------------------

  /**
   * 'emits': Declara os eventos que o componente pode emitir. Melhora a documentação
   * e permite que o Vue faça otimizações. Pode ser um array de strings ou um objeto
   * para validação dos dados emitidos.
   */
  emits: [
      'component-clicked', // Sintaxe simples
      'error-occurred',    // Apenas declara o nome do evento
      // Sintaxe de objeto para validação do payload (dados enviados com o evento)
      'update:modelValue', // Evento padrão para v-model
      'form-submitted': (payload) => {
        // Valida se o payload do evento tem as propriedades esperadas.
        if (payload.email && payload.password) {
          return true;
        } else {
          console.warn('Payload inválido para o evento "form-submitted"!');
          return false;
        }
      }
  ],

  // --------------------------------------------------------------------------
  // 6. DADOS COMPUTADOS (DERIVADOS DO ESTADO)
  // --------------------------------------------------------------------------

  /**
   * 'computed': Propriedades que são calculadas com base em outras propriedades
   * (de `data` ou `props`). São reativas e possuem cache: só recalculam quando
   * uma de suas dependências muda. Use para dados derivados.
   */
  computed: {
    // Exemplo simples: derivar um valor a partir de uma prop.
    formattedTitle() {
      return this.itemData.name.toUpperCase();
    },

    // Exemplo de lógica condicional: retornar uma classe CSS baseada no estado.
    containerClass() {
      return {
        'is-loading': this.isLoading,
        'is-disabled': this.isDisabled,
        [`variant-${this.variant}`]: true,
      };
    },

    // Exemplo de filtragem de uma lista. Muito mais performático que um método.
    activeTags() {
        if (!this.itemData.tags) return [];
        return this.itemData.tags.filter(tag => tag.isActive);
    },

    // Propriedade computada com getter e setter (útil para v-model).
    internalValue: {
      get() {
        // Retorna o valor da prop vinda do pai.
        return this.modelValue;
      },
      set(newValue) {
        // Quando o valor interno muda (ex: usuário digita no input),
        // emite um evento para o pai atualizar o v-model original.
        this.$emit('update:modelValue', newValue);
      }
    }
  },

  // --------------------------------------------------------------------------
  // 7. OBSERVADORES (REAÇÕES A MUDANÇAS DE DADOS)
  // --------------------------------------------------------------------------

  /**
   * 'watch': Permite executar uma função sempre que uma propriedade reativa
   * (de `data` ou `props`) muda. Útil para lógica assíncrona ou custosa
   * em resposta a uma mudança de dados.
   */
  watch: {
    // Observa uma prop. `newValue` é o novo valor, `oldValue` é o anterior.
    identifier(newValue, oldValue) {
      console.log(`A prop 'identifier' mudou de ${oldValue} para ${newValue}.`);
      // Ação comum: buscar novos dados quando o ID do item muda.
      this.fetchData();
    },

    // Observa uma propriedade de 'data'.
    isDropdownOpen(isOpen) {
        if (isOpen) {
            console.log('Dropdown foi aberto. Talvez carregar conteúdo sob demanda?');
        }
    },

    // Para observar propriedades aninhadas dentro de um objeto, use a sintaxe de objeto.
    itemData: {
      handler(newValue, oldValue) {
        console.log('O objeto itemData ou uma de suas propriedades mudou.');
        // handler é a função que será executada.
      },
      deep: true, // `deep: true` é necessário para observar mudanças profundas no objeto.
      immediate: true // `immediate: true` executa o handler imediatamente na criação do componente.
    }
  },

  // --------------------------------------------------------------------------
  // 8. CICLO DE VIDA DO COMPONENTE (LIFECYCLE HOOKS)
  // --------------------------------------------------------------------------

  beforeCreate() {
    // - Quando: Antes da instância ser criada (antes de `data` e `props` serem reativos).
    // - Uso: Raro. Talvez para lógica que não depende do `this` do componente.
    console.log('Hook: beforeCreate. `this.itemData` é inacessível aqui.');
  },

  created() {
    // - Quando: Depois da instância ser criada. `data`, `props`, `computed`, `methods` estão disponíveis. O DOM ainda não foi criado.
    // - Uso: Perfeito para chamadas de API para buscar dados iniciais, inicializar eventos que não dependem do DOM.
    console.log('Hook: created. Componente pronto para buscar dados.');
    this.fetchData();
  },

  beforeMount() {
    // - Quando: Logo antes do componente ser renderizado e montado no DOM.
    // - Uso: Raro.
    console.log('Hook: beforeMount. O template está compilado, mas ainda não está na página.');
  },

  mounted() {
    // - Quando: Depois do componente ser montado no DOM. O elemento (`this.$el`) está disponível.
    // - Uso: Ideal para manipulação direta do DOM, inicializar bibliotecas de terceiros (gráficos, mapas), adicionar event listeners no `window` ou `document`.
    console.log('Hook: mounted. Componente visível na página.');
    // window.addEventListener('resize', this.handleResize);
  },

  beforeUpdate() {
    // - Quando: Logo antes do DOM ser atualizado por uma mudança em dados reativos.
    // - Uso: Para acessar o estado do DOM antes da atualização. Ex: salvar a posição do scroll.
    console.log('Hook: beforeUpdate. Algo mudou, o DOM será atualizado.');
  },

  updated() {
    // - Quando: Depois do DOM ser atualizado.
    // - Uso: Para executar código que depende do DOM já atualizado. Cuidado com loops infinitos aqui.
    console.log('Hook: updated. O DOM foi atualizado com os novos dados.');
  },

  beforeUnmount() {
    // - Quando: Logo antes do componente ser destruído e removido do DOM.
    // - Uso: Fase de "limpeza". Remover event listeners (`window`, `document`), cancelar timers (`setInterval`), etc., para evitar vazamentos de memória.
    console.log('Hook: beforeUnmount. Limpando o componente.');
    // window.removeEventListener('resize', this.handleResize);
  },

  unmounted() {
    // - Quando: Depois que o componente foi completamente destruído.
    // - Uso: Raro. Para alguma lógica final de limpeza, se necessário.
    console.log('Hook: unmounted. Componente removido.');
  },


  // --------------------------------------------------------------------------
  // 9. TEMPLATE (ESTRUTURA HTML)
  // --------------------------------------------------------------------------

  /**
   * Em um arquivo .vue, esta seção estaria dentro de uma tag <template>.
   * Incluído aqui apenas para fins de documentação.
   */
  template: `
    <div :class="containerClass">

      <h2>{{ formattedTitle }}</h2>

      <img :src="imageUrl" :alt="altText" />

      <input
        type="text"
        :placeholder="placeholder"
        :disabled="isDisabled"
        v-model="internalValue"
      />

      <button @click="handleButtonClick" :disabled="isDisabled">
        Clique-me! (Cliques: {{ clickCount }})
      </button>

      <div v-if="isLoading">
        Carregando dados...
      </div>

      <ul v-else-if="activeTags.length > 0">
        <li v-for="tag in activeTags" :key="tag.id">
          {{ tag.name }}
        </li>
      </ul>

      <p v-else>
        Nenhuma tag ativa encontrada.
      </p>

    </div>
  `
};
