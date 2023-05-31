<template>
  <li v-auto-animate class="bg-white rounded-3xl p-4 hover:shadow transition-shadow h-min">
    <div class="text-sm flex items-center justify-between">
      <p>
        <span>{{ formattedTime }}</span>
        <span>裝置</span>
        <i class='bx' :class="formattedDevice"></i>
        <i class='bx bx-mouse-alt' ></i>
        <span>{{ formattedClickTime }}</span>
      </p>
      <span><i class='bx bx-dollar'></i>{{ props.report.totalCommission }}</span>
    </div>
    <p class=" text-sm">
      <span class=" inline-block align-middle">中介 {{ props.report.referrer }}</span>
      <span class=" inline-block align-middle ml-4"><i class='bx bx-stats bx-sm'></i> {{ props.report.utmContent }}</span>
    </p>
    <p class=" text-sm">
      訂單編號 {{ props.report.conversionId }}
      <button class="group border border-primary text-primary rounded-xl w-8 h-8" type="button" @click="(isShow = !isShow)">
        <i :class="!isShow ? 'bx-down-arrow' : 'bx-up-arrow'" class='bx text-xl align-middle'></i>
      </button> 
    </p>
    <ul class="text-sm" v-if="isShow">
      <li v-for="order in props.report.orders" :key="order.orderId">
        <h4>
          <i class='bx bx-purchase-tag'></i>{{ order.shopType }}
          <i class='bx bxs-package'></i>{{ order.items.length }}
          {{ order.orderStatus }}
        </h4>
        <ul class=" py-4">
          <li class=" mb-4 last:mb-0" v-for="item in order.items" :key="item.itemId">
            <a class=" hover:text-primary" :href="'https://shopee.tw/shop/' + item.shopId" target="_blank" rel="noopener noreferrer">
              <i class='bx bx-store' ></i>{{ item.shopName }} <i class='bx bx-link-external'></i>
            </a>
            <p class=" text-xs">{{ item.globalCategoryLv1Name }}>{{ item.globalCategoryLv2Name }}>{{ item.globalCategoryLv3Name }}</p>
            <p class=" w-11/12 mx-auto space-x-1 text-primary" :title="item.itemName">
              <a :href="'https://shopee.tw/product/' + item.shopId + '/' + item.itemId" target="_blank" rel="noopener noreferrer">
                <img class="h-10 w-10 align-middle object-cover rounded-md inline-block mr-4" :src="item.imageUrl" :alt="item.itemName">
              </a>
              <span class=" inline-block align-middle"><i class='bx bxs-discount' ></i>{{ item.itemShopeeCommissionRate }}</span>
              <span class=" inline-block align-middle"><i class='bx bx-badge' ></i>{{ item.qty }}</span>
              <span class=" inline-block align-middle"><i class='bx bx-dollar'></i>{{ item.itemPrice }}</span>
            </p>
            <p class=" text-xs">{{ item.attributionType }}</p>
            <p class=" text-xs">{{ item.channelType }}</p>
            <p class=" text-xs">{{ item.promotionId }}</p>
            <p v-if="item.fraudReason" class=" w-11/12 mx-auto space-x-1 text-primary" :title="item.itemName">
              <span class=" inline-block align-middle">{{ item.fraudStatus }}</span>
              <span class=" inline-block align-middle">{{ item.fraudReason }}</span>
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
  report: Object
})
const formattedTime = useDateFormat(new Date(props.report.purchaseTime * 1000), 'M/D HH:mm')
const formattedDevice = computed(() => {
  return props.report.device === 'APP' ? `bx-mobile` : `bx-desktop`
})

const formattedClickTime = useDateFormat(new Date(props.report.clickTime * 1000), 'M/D HH:mm')
</script>