import axiosInstance from '../axios'

// 新增
export async function bannerAddApi(data: any) {
  const response = await axiosInstance.post('/room/add', data)
  return response.data
}

// 获取列表
export async function bannerGetApi() {
  const response = await axiosInstance.get('/room/get')
  return response.data
}

// 修改当前页
export async function pageUpdateApi(data: any) {
  const response = await axiosInstance.post('/room/page', data)
  return response.data
}

// 更新当前图片
export async function imgUpdateApi(data: any) {
  const response = await axiosInstance.post('/room/img', data)
  return response.data
}

// 状态修改
export async function stateChangeApi(val: boolean) {
  const response = await axiosInstance.post('/room/tog', {
    state: val,
  })
  return response.data
}
