const useGraphql = () => {
  const queryReport = (params = []) => {
    let query = '('
    for (const [key, value] of Object.entries(params)) {
      query += key + `: ${value},`
    }
    query += `)`
    return {
      query: `{
        conversionReport ${query} {
          pageInfo {
            scrollId
            hasNextPage
          }
          nodes {
            estimatedTotalCommission
            totalBrandCommission
            device
            purchaseTime
            utmContent
            checkoutId
            referrer
            productType
            conversionId
            conversionStatus
            clickTime
            shopeeCommissionCapped
            sellerCommission
            totalCommission
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
                fraudStatus
                fraudReason
                itemTotalCommission
                itemSellerCommission
                itemShopeeCommissionCapped
                itemShopeeCommissionRate
                itemNotes
                fraudStatus
                modelId
                promotionId
              }
            }
          }
        }
      }`
    }
  }
  return {
    queryReport
  }
}

export default useGraphql