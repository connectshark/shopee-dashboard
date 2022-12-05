<template>
  <li v-auto-animate class="bg-white rounded-3xl p-4 hover:shadow transition-shadow h-min">
    <div class="text-sm flex items-center justify-between">
      <p>
        <span>{{ formattedTime }}</span>
        <span> 裝置 </span>
        <i class='bx' :class="formattedDevice"></i>
      </p>
      <span><i class='bx bx-dollar'></i>{{ props.estimatedTotalCommission }}</span>
    </div>
    <p class=" text-sm">
      <span class=" inline-block align-middle">中介 {{ props.referrer }}</span>
      <span class=" inline-block align-middle ml-4"><i class='bx bx-stats bx-sm'></i> {{ props.utmContent }}</span>
      
    </p>
    <p class=" text-sm">
      訂單編號 {{ props.checkoutId }}
      <button class="group border hover:border-primary border-stone-700 rounded-xl w-8 h-8" type="button" @click="(isShow = !isShow)">
        <i :class="!isShow ? 'bx-down-arrow' : 'bx-up-arrow'" class='bx group-hover:text-primary text-xl align-middle'></i>
      </button> 
    </p>
    <ul class="text-sm" v-if="isShow">
      <li v-for="order in props.orders" :key="order.orderId">
        <h4>
          <i class='bx bx-purchase-tag'></i>{{ order.shopType }}
          <i class='bx bxs-package'></i>{{ order.items.length }}
        </h4>
        <ul class=" py-4">
          <li class=" mb-4 last:mb-0" v-for="item in order.items" :key="item.itemId">
            <a class=" hover:text-primary" :href="'https://shopee.tw/shop/' + item.shopId" target="_blank" rel="noopener noreferrer">
              <i class='bx bx-store' ></i>{{ item.shopName }} <i class='bx bx-link-external'></i>
            </a>
            <p class=" w-11/12 mx-auto" :title="item.itemName">
              <a :href="'https://shopee.tw/product/' + item.shopId + '/' + item.itemId" target="_blank" rel="noopener noreferrer">
                <img class="h-10 w-10 align-middle object-cover rounded-md inline-block mr-4" :src="item.imageUrl" :alt="item.itemName">
              </a>
              <span class=" inline-block align-middle"><i class='bx bx-badge' ></i>{{ item.qty }}</span>
              <span class=" inline-block align-middle"><i class='bx bx-dollar'></i>{{ item.itemPrice }}</span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDateFormat } from '@vueuse/core'

const isShow = ref(false)

const props = defineProps({
  purchaseTime: Number,
  estimatedTotalCommission: String,
  checkoutId: Number,
  referrer: String,
  device: String,
  orders: Array,
  utmContent: String
})
const formattedTime = useDateFormat(new Date(props.purchaseTime * 1000), 'M/D HH:mm')
const formattedDevice = computed(() => {
  return props.device === 'APP' ? `bx-mobile` : `bx-desktop`
})
</script>