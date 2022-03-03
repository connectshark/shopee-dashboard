<template>
  <v-chart class=" h-80 md:h-60" :option="option" :autoresize="true"/>
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
      title: {
        text: "統計消費店家類型",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: "店家類型",
          type: "pie",
          radius: "35%",
          center: ["50%", "40%"],
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