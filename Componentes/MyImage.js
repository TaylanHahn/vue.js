export default {
    name: 'MyImage', // nome do componente
    props: {
        src: { // prop src 
        type: String,
        required: true  
        },
        alt:{ // prop alt
            type: String,
            required: false,
            default: 'Default alt text' // valor padrão
        }
    },
    methods:{ // métodos do componente
        show(){
            this.isVisible = true; // altera o estado para visível
        }
    },
    data(){
        return {
            isVisible: false // estado inicial
        }
    },
    template: `
        <div v-show="isVisible">
            <img :src="src" :alt="alt" />
        </div>
        <button @click="show">Show</button>
    `
}