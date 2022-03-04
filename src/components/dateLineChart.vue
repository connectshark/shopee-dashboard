<template>
<div class=" py-4">
  <h3 class=" font-bold text-xl">最常消費店家名稱(前5名)</h3>
  <v-chart class=" h-60 md:h-80" :option="option" :autoresize="true"/>
</div>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    lineView: Array
  },
  setup (props) {
    
    const option = ref({
      grid: {
        right: '15%',
        left: '15%',
      },
      yAxis: {},
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        name: '店名',
        data: Object.keys(props.lineView)
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}"
      },
      series: [
        {
          name: '日期',
          type: 'line',
          data: Object.values(props.lineView)
        }
      ]
    });

    return {
      option
    }
  }
}
</script>