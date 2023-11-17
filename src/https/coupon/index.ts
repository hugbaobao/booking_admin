import axiosInstance from '../axios'

/**
 *
 *
 *
 */
// 获取列表
export async function couponGetApi(val: number) {
  const response = await axiosInstance.get('/coupon/get', {
    page: val,
  })
  return response.data
}

// 新增优惠券
export async function couponAddApi(val: object) {
  const response = await axiosInstance.post('/coupon/add', val)
  return response.data
}
// 删除
export async function couponDeleteApi(val: number) {
  const response = await axiosInstance.post('/coupon/del', {
    id: val,
  })
  return response.data
}
