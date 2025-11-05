<template>
    <div v-for ="despesa in despesas" :key="despesa.id">
        <Despesa :dados="despesa"  />
    </div>
</template>

<script>
  import Despesa from './Despesa.vue';

export default {
  name: 'Application',
  components: {
    Despesa
  },
  data() {
    return {
        despesas: []
    };
  },
  async beforeMount(){
    try{
        const response = await fetch('https://redesigned-space-system-7v9qv6gwr4973r9x7-3000.app.github.dev/despesas');
        const data = await response.json();
        this.despesas = data;
        console.log(this.despesas);
    } catch (error) {
        console.error('Error fetching despesas:', error);
    }
  }
}
</script>

<style></style>