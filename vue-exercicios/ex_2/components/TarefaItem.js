export default {
    name: 'TarefaItem',
    props: ['item', 'index'],
    emits: ['deletar'],
    template: `
    <li>
        {{ item.lista }}
        <button @click="$emit('deletar', index)"> Deletar </button>
    </li>
    `
}