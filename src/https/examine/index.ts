import axiosInstance from '../axios'

// 获取列表
export async function tripListApi(page: number) {
  const response = await axiosInstance.get('/art/examine', { page: page })
  return response.data
}

// 状态改变
export async function tripStatusApi(data: any) {
  const response = await axiosInstance.post('/art/state', data)
  return response.data
}

// 获取列表
export async function centerListApi(page: number) {
  const response = await axiosInstance.get('/center/examine', { page: page })
  return response.data
}

// 状态改变
export async function centerStatusApi(data: any) {
  const response = await axiosInstance.post('/center/state', data)
  return response.data
}
