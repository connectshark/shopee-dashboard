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
            clickTime
            purchaseTime
            conversionId
            shopeeCommissionCapped
            sellerCommission
            totalCommission
            buyerType
            utmContent
            device
            productType
            referrer
            orders {
              orderId
              shopType
              orderStatus
              items {
                shopId
                shopName
                completeTime
                promotionId
                modelId
                itemId
                itemName
                itemPrice
                actualAmount
                refundAmount
                qty
                imageUrl
                itemTotalCommission
                itemSellerCommission
                itemSellerCommissionRate
                itemShopeeCommissionCapped
                itemShopeeCommissionRate
                itemNotes
                globalCategoryLv1Name
                globalCategoryLv2Name
                globalCategoryLv3Name
                fraudStatus
                fraudReason
                attributionType
                channelType
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