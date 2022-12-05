export default (scrollId = '', purchaseTime = null) => {
  let queryParams = `(`
  if (scrollId !== '') {
    queryParams += `scrollId: "${scrollId}"`
  }
  if (purchaseTime !== null) {
    queryParams += `, purchaseTimeEnd: ${purchaseTime}`
  }
  queryParams += `)`
  return {
  query: `{
    conversionReport${queryParams} {
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