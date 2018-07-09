
import axios from 'axios'

const base_url = 'https://tango.heeyhome.com'
// const base_url = 'http://192.168.10.143:8887'

// const base_url = 'http://47.97.122.243:8887'
// 登录接口
export const userLogin = data => {
  return axios.post(base_url + '/cx/wx/user/login', data)
}


// 获取ticket

export const  getTicket = data => {
  return axios.post(base_url + '/cx/wx/user/getTicket', data )
}



// 获取签名
export const  getConfig = data => {
  return axios.post(base_url + '/cx/wx/user/signAlgorithm', data )
}

// 商铺商品列表
export const listShopGoods = data => {
  return axios.post(base_url + '/cx/wx/merchant/listGoods', data )
} 

// 商铺订单列表
export const listOrder = data => {
  return axios.post(base_url + '/cx/wx/merchant/listOrder', data )
} 
// 核销二维码
export const verificationCode = data => {
  return axios.post(base_url + '/cx/wx/merchant/verificationCode', data )
} 



// 商品列表
export const listGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/listGoods', data )
} 
// 商品详情
export const detailGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/getDetailGoods', data )
}
// 我的砍价
export const  myCutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/myCutGoods', data )
}
// 进行砍价
export const  cutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/cutGoods', data )
}
// 砍价详情
export const  getDetailCutGoods = data => {
  return axios.post(base_url + '/cx/wx/bargain/getDetailCutGoods', data )
}