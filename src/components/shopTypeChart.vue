<template>
<div class=" py-4">
  <h3 class=" font-bold text-xl">統計消費店家類型</h3>
  <v-chart class=" h-60 md:h-80" :option="option" :autoresize="true"/>
</div>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    totalShopType: Object
  },
  setup (props) {
    const data = Object.keys(props.totalShopType).map((shopName, i) => {
      return {
        name: shopName,
        value: Object.values(props.totalShopType)[i]
      }
    })
    const option = ref({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: "店家類型",
          type: "pie",
          radius: "35%",
          center: ["50%", "50%"],
          data: data,
          label: {
            formatter: '{b} \n {c} {d}%',
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