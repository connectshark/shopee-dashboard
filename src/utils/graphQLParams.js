import time from './time'

const graphQLParams = {
  lastMonthQuery: (scrollId = '') => {
    const { first, last } = time.getLastMonth()
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
    
  }
}

export default graphQLParams