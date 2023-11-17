import axiosInstance from '../axios'

/**
 *
 *
 *
 */
// 获取列表
export async function userGetApi() {
  const response = await axiosInstance.get('/user/get')
  return response.data
}
