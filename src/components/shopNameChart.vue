<template>
  <v-chart class=" h-80 md:h-60" :option="option" :autoresize="true"/>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    totalOrderShopName: Array
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
        name: '店名',
        data: props.totalOrderShopName.map(shop => shop.name.slice(0, 3))
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}"
      },
      series: [
        {
          name: "店家名稱",
          type: 'bar',
          data: props.totalOrderShopName,
          label: {
            formatter: '{b} \n {c}',
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