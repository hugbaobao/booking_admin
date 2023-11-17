import axiosInstance from '../axios'

// 登录
export function loginApi(query: any): any {
  const response = axiosInstance.post('/admin/login', query)
  return response
}

// 注册
export function registerApi(query: any): any {
  const response = axiosInstance.post('/admin/rgs', query)
  return response
}

// 获取列表
export async function getListApi() {
  const response = await axiosInstance.get('/admin/list')
  return response.data
}

// 删除
export async function deleteApi(id: number) {
  const response = await axiosInstance.delete(`/admin/del/?id=${id}`)
  return response.data
}
