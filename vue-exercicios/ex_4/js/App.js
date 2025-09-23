import ProductList from "./ProductList.js";

export default{
    name: "App",
    components:{
        'product-list': ProductList
    },
    data(){
        return{
            myProducts:[
                {id: 1, name: 'Notebook Gamer', price:7500, stock: 15, details: 'Notebook muito bom, mas se for DELL, se prepara pra gastar.'},
                {id: 2, name: 'Mouse sem fio', price: 350, stock: 40, details: 'Mouse brabo, mas se esquecer de recarregar... lascou!'},
                {id: 3, name: 'Teclado mecânico', price: 580, stock: 22, details: 'Sim, tem led RGB... enzo!'},
            ],
            selectedProductDetails: null, // para guardar o produto clicado
        };
    },
    methods:{
        showProductInfo(product){
            this.selectedProductDetails = product;
            alert(`Detalhes de ${product.name} : ${product.details}`);
        }
    },
    template: `
        <div class="container mt-5">
        <product-list :products="myProducts" @show-details="showProductInfo">
            <template #header>
                <p class="card-header-title is-centered">Nossos Produtos em Destaque</p>
            </template>

            <template #default="{ product }">
                <h4 class="title is-4">{{ product.name }}</h4>
                <p class="subtitle is-6">Preço: R$ {{ product.price }}</p>
                <p>Disponível: {{ product.stock }} unidades</p>
                <button @click="showProductInfo(product)" class="button is-primary mt-2">
                    Mostrar Detalhes
                </button>
            </template>

            <template #empty>
                <p class="has-text-centered"><strong>Ops!</strong> Todos os produtos foram vendidos.</p>
            </template>
        </product-list>

        <div v-if="selectedProductDetails" class="box mt-5">
            <p>Último produto visualizado: <strong>{{ selectedProductDetails.name }}</strong></p>
        </div>
    </div>
    `
}