import axiosInstance from '../axios'

/**
 *
 * switch
 *
 */
// 获取列表
export async function switchGetApi() {
  const response = await axiosInstance.get('/home/get')
  return response.data
}

// 修改当前名称或页面
export async function switchUpdateApi(data: any) {
  const response = await axiosInstance.post('/home/update', data)
  return response.data
}

// 更新当前图片
export async function imgUpdateApi(data: any) {
  const response = await axiosInstance.post('/home/img', data)
  return response.data
}

/**
 *
 * 上轮播图
 *
 */

// 获取列表
export async function bannerTopGetApi() {
  const response = await axiosInstance.get('/home/btget')
  return response.data
}

// 新增
export async function bannerTopAddApi(data: any) {
  const response = await axiosInstance.post('/home/btadd', data)
  return response.data
}

// 修改当前页
export async function bannerToppageApi(data: any) {
  const response = await axiosInstance.post('/home/btupp', data)
  return response.data
}

// 更新当前图片
export async function bannerTopimgApi(data: any) {
  const response = await axiosInstance.post('/home/btupi', data)
  return response.data
}

// 状态修改
export async function bannerTopStateApi(val: boolean) {
  const response = await axiosInstance.post('/home/btcs', {
    state: val,
  })
  return response.data
}

/**
 *
 * 下轮播图
 *
 */
// 获取列表
export async function bannerBtmGetApi() {
  const response = await axiosInstance.get('/home/btmget')
  return response.data
}

// 新增
export async function bannerBtmAddApi(data: any) {
  const response = await axiosInstance.post('/home/btmadd', data)
  return response.data
}

// 修改当前页
export async function bannerBtmpageApi(data: any) {
  const response = await axiosInstance.post('/home/btmupp', data)
  return response.data
}

// 更新当前图片
export async function bannerBtmimgApi(data: any) {
  const response = await axiosInstance.post('/home/btmupi', data)
  return response.data
}

// 状态修改
export async function bannerBtmStateApi(val: boolean) {
  const response = await axiosInstance.post('/home/btmcs', {
    state: val,
  })
  return response.data
}

// 更新封面
export async function coverPathApi(data: any) {
  const response = await axiosInstance.post('/home/cpath', data)
  return response.data
}
export async function coverImgApi(data: any) {
  const response = await axiosInstance.post('/home/cimg', data)
  return response.data
}
