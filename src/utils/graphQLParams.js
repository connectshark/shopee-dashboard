import dayjs from 'dayjs'

const graphQLParams = {
  lastMonthQuery: (scrollId = '') => {
    const first = dayjs(dayjs().subtract(1, 'month').format('YYYY-MM-') + '1').unix()
    const last = dayjs(dayjs().format('YYYY-MM-') + '1').unix()
    return {
      "query": `{
        conversionReport(limit: 500, purchaseTimeStart: ${first}, scrollId: "${scrollId}", purchaseTimeEnd: ${last}) {
          pageInfo {
            scrollId
            hasNextPage
          }
          nodes {
            estimatedTotalCommission
            purchaseTime
            checkoutId
            utmContent
            referrer
            orders {
              shopType
              items {
                shopName
                actualAmount
              }
            }
          }
        }
      }`
    }
  },

  getRangeQuery : (first, scrollId = '') => {
    const last = dayjs(dayjs().format('YYYY-MM-DD')).unix()
    return {
      "query": `{
        conversionReport(limit: 500, purchaseTimeStart: ${first}, scrollId: "${scrollId}", purchaseTimeEnd: ${last}) {
          pageInfo {
            scrollId
            hasNextPage
          }
          nodes {
            estimatedTotalCommission
            purchaseTime
            checkoutId
            utmContent
            referrer
            orders {
              shopType
              items {
                shopName
                actualAmount
              }
            }
          }
        }
      }`
    }
  },

  getRecentQuery (scrollId) {
    return {
      "query": `{
        conversionReport(scrollId: "${scrollId}") {
          pageInfo {
            scrollId
            hasNextPage
          }
          nodes {
            estimatedTotalCommission
            device
            purchaseTime
            utmContent
            checkoutId
            referrer
            orders {
              orderId
              shopType
              items {
                shopId
                shopName
                completeTime
                itemId
                itemName
                itemPrice
                itemCommission
                qty
                imageUrl
              }
            }
          }
        }
      }`
    }
  },
  getLastTimeQuery (purchaseTimeEnd) {
    return {
      "query": `{
        conversionReport(purchaseTimeEnd: "${purchaseTimeEnd}") {
          pageInfo {
            scrollId
            hasNextPage
          }
          nodes {
            estimatedTotalCommission
            device
            purchaseTime
            utmContent
            checkoutId
            referrer
            orders {
              orderId
              shopType
              items {
                shopId
                shopName
                completeTime
                itemId
                itemName
                itemPrice
                itemCommission
                qty
                imageUrl
              }
            }
          }
        }
      }`
    }
  }
}

export default graphQLParams