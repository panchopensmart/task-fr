<template>
  <table>
    <thead>
    <tr>
      <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in processedData" :key="index">
      <td>{{ item.date }}</td>
      <td>{{ item.revenue.toFixed(2) }}</td>
      <td>{{ item.orders_count }}</td>
      <td>{{ item.abcSpent}}</td>
      <td>{{ item.margin.toFixed(2) }}</td>
      <td>{{ item.marginPercentage.toFixed(2) }}%</td>
      <td>{{ item.adShare.toFixed(2) }}%</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    headers() {
      return ['Дата', 'Выручка', 'Кол-во заказов', 'Рекламные траты', 'Маржа', 'Маржинальность', 'ДРР'];
    },
    processedData() {
      const result = {};

      this.data.forEach(item => {
        const date = item.date;
        if (!result[date]) {
          result[date] = {
            date,
            revenue: 0,
            orders_count: 0,
            abcSpent: 0,
            commission: 0,
            logistic: 0,
          };
        }
        result[date].revenue += parseFloat(item.revenue) || 0;
        result[date].orders_count += parseInt(item.orders_count, 10) || 0;
        result[date].abcSpent += parseFloat(item.abcSpent) || 0;
        result[date].commission += parseFloat(item.commission) || 0;
        result[date].logistic += parseFloat(item.logistic) || 0;
      });

      return Object.values(result).map(item => {
        const margin = item.revenue - item.commission - item.logistic - item.abcSpent;
        const marginPercentage = item.revenue ? (margin / item.revenue) * 100 : 0;
        const adShare = item.revenue ? (item.abcSpent / item.revenue) * 100 : 0;

        return {
          ...item,
          margin,
          marginPercentage,
          adShare,
        };
      });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>