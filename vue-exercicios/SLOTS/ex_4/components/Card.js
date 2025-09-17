 const Card = {
  // 1. Props: Os dados que o componente recebe do "mundo exterior".
  // Neste caso, uma lista de produtos.
  props: {
    products: {
      type: Array,
      required: true,
    }
  },

  // 2. Template: A estrutura HTML do componente.
  // Usamos backticks (`) para um template de múltiplas linhas.
  template: `
    <div class="product-card">
      <header class="card-header">
        <slot name="header">
          <h2>Lista de Produtos</h2>
        </slot>
      </header>
      
      <div class="card-body">
        <ul v-if="products.length > 0" class="product-list">
          <li v-for="product in products" :key="product.id" class="product-list-item">
            
            <slot name="item" :product="product"></slot>
            
          </li>
        </ul>
        
        <div v-else class="empty-state">
          <slot name="empty">
            <p>Nenhum produto para exibir no momento.</p>
          </slot>
        </div>
      </div>
    </div>
  `
};