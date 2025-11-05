<template>
    <div>
        <h3>{{ dados.id }}</h3>
        <p>{{ dados.descricao }}</p>
        <p>{{ dados.categoria }}</p>
        <p>{{ dados.valor }}</p>
        <p>{{ dados.data }}</p>

        <button @click="removeDespesa(dados.id)"> Remover </button>
    </div>
</template>

<script> 
export default {
  name: 'Despesa',
  props: {
    dados: {
      type: Object,
      required: true
    }
  },
    methods: {
        async removeDespesa(id) {
            try {
                const response = await fetch(`https://redesigned-space-system-7v9qv6gwr4973r9x7-3000.app.github.dev/despesas/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Despesa removida com sucesso!');
                    // Optionally, you can emit an event to notify the parent component to refresh the list
                    this.$emit('despesa-removed', id);
                } else {
                    alert('Erro ao remover despesa.');
                }
            } catch (error) {
                console.error('Error removing despesa:', error);
            }
        }
    }
}
</script>

<style></style>