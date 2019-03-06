import { Message } from 'element-ui'

export default ({ $axios, store: { commit, state }, app, isDev, isHMR, redirect }) => {
  let encrypt = false
  $axios.defaults.timeout = 10000
  let Host='www.smartluxhouse.com'
  let baseURL=`https://www.easy-mock.com/mock/5c75f188ce20c029e6dca7ee/example`
  $axios.defaults.baseURL = baseURL
  // $axios.defaults.withCredentials=true;//让ajax携带cookie
// 添加请求拦截器
  $axios.interceptors.request.use(function(config) {
    if (encrypt) {
      config.data = {
        data: app.$crypto().cipher(JSON.stringify(config.data), state.key)
      }
    }
    config.headers.decrypt_type = 'web'
    config.headers.token = state.token
    return config
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  $axios.interceptors.response.use(function(response) {
    if (encrypt) {
      response.data = JSON.parse(app.$crypto().decipher(response.data, state.key))
    }
    var b_string = response.config.baseURL
    var c_string = response.config.url
    var d_string = c_string.replace(b_string, '')
    if(isDev){
      console.log('响应拦截的数据' + d_string + ' : \n' + JSON.stringify(response.data))
    }
    // 对响应数据做点什么
    // response.data=JSON.parse(response.data)
    return response
  }, function(error) {
    // 对响应错误做点什么
    if(process.client&&error.response){
      console.log('清空localstorage')
      localStorage.clear()
    }
    if (error.response) {
      switch (error.response.status) {
        case 404:
          Message.error('请再次登录')
          redirect('/login')
          break
        case 401:
          Message.error('数据错误，请退出再次登录')
          redirect('/login')
          break
        default:
          Message.error('其他')
          redirect('/login')
          break

      }
    }


    return Promise.reject(error)

  })
}

