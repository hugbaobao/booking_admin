import axiosInstance from '../axios'

/**
 *
 *
 *
 */
// 获取列表
export async function pngGetApi() {
  const response = await axiosInstance.get('/png/get')
  return response.data
}

// 修改图片
export async function pngUpdateApi(data: any) {
  const response = await axiosInstance.post('/png/edit', data)
  return response.data
}
