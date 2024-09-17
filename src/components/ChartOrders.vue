<template>
  <div class="saleChart">
    <apexchart
        type="line"
        :options="chartOptions"
        :series="chartSeries"
        height="350"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import VueApexCharts from "vue3-apexcharts";

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      const ordersCountByDate = {};

      this.data.forEach((item) => {
        const date = item.date;
        const ordersCount = parseInt(item.orders_count, 10) || 0;

        if (!ordersCountByDate[date]) {
          ordersCountByDate[date] = 0;
        }

        ordersCountByDate[date] += ordersCount;
      });

      console.log(ordersCountByDate);
      return ordersCountByDate;
    },
    chartSeries() {
      const seriesData = [];

      for (const [date, count] of Object.entries(this.chartData)) {
        seriesData.push({ x: date, y: count });
      }

      return [
        {
          name: 'Количество',
          data: seriesData,
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          id: 'orders-chart',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'yyyy-MM-dd',
          },
        },
        title: {
          text: 'Количество заказов',
          align: 'center',
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd',
          },
        },
      };
    },
  },
});
</script>

<style scoped>
.saleChart {
  color: black
}
</style>