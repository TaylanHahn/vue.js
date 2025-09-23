import ProductList from "./ProductList.js";

export default{
    name: "App",
    components:{
        'product-list': ProductList
    },
    data(){
        return{
            myProducts:[
                {id: 1, name: 'Notebook Gamer', price:7500, stock: 15, src: 'https://benchpromos.com.br/_next/image?url=https%3A%2F%2Fi.imgur.com%2FtFfTtFl.png&w=3840&q=75', details: 'Notebook muito bom, mas se for DELL, se prepara pra gastar.'},
                {id: 2, name: 'Mouse sem fio', price: 350, stock: 40, src: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/peripherals/alienware/peripherals/alienware-trimode-720m-wireless-mouse/mouse-aw-aw720m-wireless-pdp-hero-dsotm.psd?qlt=95&fit=constrain,1&hei=350&wid=504&fmt=png-alpha', details: 'Mouse brabo, mas se esquecer de recarregar... lascou!'},
                {id: 3, name: 'Teclado mecânico', price: 580, stock: 22, src: 'https://cdn.awsli.com.br/2500x2500/1945/1945193/produto/367031990/k616-rgb-b-pt--2--ehqc9abc6z.png', details: 'Sim, tem led RGB... nutella!'},
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
                    <img :src="product.src" :alt="'Foto de ' + product.name" width="312px">
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