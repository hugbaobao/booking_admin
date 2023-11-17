import axiosInstance from '../axios'

/**
 *
 *
 *
 */
// 获取列表
export async function pngGetApi(val: number) {
  const response = await axiosInstance.get('/car/page', {
    page: val,
  })
  return response.data
}

// 状态修改
export async function stateChangeApi(val: number, state: number | string) {
  const response = await axiosInstance.get('/car/state', {
    id: val,
    status: state,
  })
  return response.data
}

// 酒店订单
export async function orderGetApi(val: number) {
  const response = await axiosInstance.get('/order/page', {
    page: val,
  })
  return response.data
}
