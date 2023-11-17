import axiosInstance from '../axios'

/**
 *
 *
 *
 */
// 获取总数量
export async function sumGetApi() {
  const response = await axiosInstance.get('/shop/sum')
  return response.data
}
// 获取列表
export async function shopGetApi(page: number) {
  const response = await axiosInstance.get('/shop/get', {
    page,
  })
  return response.data
}

// 状态改变
export async function shopStateApi(data: any) {
  const response = await axiosInstance.post('/shop/status', data)
  return response.data
}

// 删除商品
export async function shopDeleteApi(data: any) {
  const response = await axiosInstance.post('/shop/del', data)
  return response.data
}

// 新增商品
export async function shopAddApi(data: any) {
  const response = await axiosInstance.post('/shop/add', data)
  return response.data
}

// 编辑商品
export async function shopEditApi(data: any) {
  const response = await axiosInstance.post('/shop/edit', data)
  return response.data
}
