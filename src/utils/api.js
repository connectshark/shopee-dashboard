const BASE_URL = import.meta.env.VITE_API_URL

const api = {
  oauthLogin (code) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + `/login/google?code=${code}`)
        .then(j => j.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  },

  /**
   * 取得api後台資料
   */
  getProducts (graphQLParams, token) {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + '/shopee', {
        method: 'POST',
        body: JSON.stringify({
          payload: graphQLParams
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then(j => j.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  },
}

export default api