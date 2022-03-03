<template>
  <v-chart class=" h-80 md:h-60" :option="option" :autoresize="true"/>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    filterOrderShopName: Array
  },
  setup (props) {
    const option = ref({
      title: {
        text: "最常消費店家名稱(前5名)",
        left: "center"
      },
      grid: {
        right: '15%',
        left: '15%',
      },
      yAxis: {},
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        name: '店名',
        data: props.filterOrderShopName.map(shop => shop.name.slice(0, 3))
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}"
      },
      series: [
        {
          name: "店家名稱",
          type: 'bar',
          data: props.filterOrderShopName,
          label: {
            show: true,
            formatter: '{c}次',
            position: 'inside'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    return {
      option
    }
  }
}
</script>