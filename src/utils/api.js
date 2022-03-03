const BASE_URL = import.meta.env.VITE_API_URL

const api = {
  getUserDetail (token) {
    return new Promise((resolve, reject) => {
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(j => j.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
  },
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
      fetch(BASE_URL + '/offerList', {
        method: 'POST',
        body: JSON.stringify({
          payload: graphQLParams,
          token: token
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(j => j.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  },
}

export default api