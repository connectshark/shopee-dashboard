<template>
  <li class=" bg-sky-100 rounded mb-4">
    <h4 class=" flex items-center justify-between p-3">
      <span>{{time}}</span>
      <span class=" text-emerald-700"><i class='bx bx-dollar-circle' ></i>{{ props.estimatedTotalCommission }}</span>
    </h4>
    <div class=" text-left p-3 bg-orange-100">
      <ol>
        <li v-for="order in orders" :key="order.orderId">
          <!-- <h5>{{order.shopType}}</h5> -->
          <ul>
            <li class=" text-sm mb-1" v-for="item in order.items" :key="item.itemId">
              <h6><i class='bx bx-store-alt' ></i>
                <a class="text-blue-800 underline" :href="'https://shopee.tw/shop/' + item.shopId" target="_blank" rel="noopener noreferrer">{{item.shopName}}</a>
              </h6>
              <p><img class=" w-3 inline-block" :src="item.imageUrl" :alt="item.itemName">{{item.itemName}} <i class='bx bx-purchase-tag-alt' ></i>{{item.itemPrice}} <i class='bx bx-package'></i>{{item.qty}}</p>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </li>
</template>

<script setup>
import dayjs from 'dayjs';

const props = defineProps({
  purchaseTime: Number,
  estimatedTotalCommission: String,
  orders: Array
})

const time = dayjs.unix(props.purchaseTime).format('YYYY/MM/DD')

</script>