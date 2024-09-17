<template>
  <div>
    <div v-if="data && data.length > 0">
      <ChartOrders :data="data" />
      <ProductsTable :data="data" />
    </div>
    <div v-else class="loader"></div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ChartOrders from './components/ChartOrders.vue';
import ProductsTable from './components/ProductsTable.vue';

export default {
  components: {
    ChartOrders,
    ProductsTable,
  },
  computed: {
    ...mapState(['data', 'loading']),
  },
  methods: {
    ...mapActions(['fetchData']),
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style  scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>