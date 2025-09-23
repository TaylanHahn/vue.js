export default{
    name: "ProductList",
    props:{
        products: {
            type: Array,
            required: true,
        },
    },
    template:`
        <div class="card">
        <header class="card-header">
            <slot name="header">
                <p class="card-header-title">Produtos</p>
            </slot>
        </header>

        <div class="card-content">
            <div class="content">

                <div v-if="products.length > 0"> 
                    <div v-for="item in products" :key="item.id" class="box mb-4">
                        <slot :product="item">
                            <div>
                                <strong>{{ item.name }}</strong>
                                <p>R$ {{ item.price }}</p>
                            </div>
                            <button
                            @click="$emit('show-details', item)"
                            class="button is-small is-info mt-2">
                            Ver detalhes
                            </button>
                        </slot>
                    </div>
                </div>

                <div v-else>
                    <slot name="empty">
                        <p>Nenhum produto para exibir no momento.</p>
                    </slot>
                </div>

            </div>
        </div>
    </div>
    `,
}