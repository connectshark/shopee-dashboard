import dayjs from 'dayjs'

const time = {
  /**
   * 取得上月1日及最後一日時間
   */
  getLastMonth () {
    const first = dayjs(dayjs().subtract(1, 'month').format('YYYY-MM-') + '1').unix()
    const last = dayjs(dayjs().format('YYYY-MM-') + '1').unix()
    return {
      first,
      last
    }
  }
}

export default time