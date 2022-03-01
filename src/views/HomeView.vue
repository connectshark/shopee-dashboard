<template>
<section>
  <LineChart :chartData="testData" :options="options" />
  <router-link to="/login">登入</router-link>
</section>
</template>

<script setup>
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import { ref, computed } from "vue"

Chart.register(...registerables)
const testData = {
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  },
}
// import { useInfoStore } from '../stores/info'
// import api from '../utils/api'

// const store = useInfoStore()
// const query = {
//   "query": `{
//     conversionReport(shopType: ALL) {
//       pageInfo {
//         limit
//         hasNextPage
//         scrollId
//         page
//       }
//       nodes {
//         estimatedTotalCommission
//         device
//         utmContent
//         checkoutId
//       }
//     }
//   }`
// }
// api.getProducts(query, store.token)
//   .then(res => console.log(res))
</script>