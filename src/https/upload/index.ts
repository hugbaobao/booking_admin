import axiosInstance from '../axios'

interface ApiResult<T> {
  code: number
  message: string
  data: T
}

export function uploadImg(params: any) {
  const response = axiosInstance.post('/uploadimg/ulo', params)
  return response
}

export function deleteImg(file: string) {
  const response = axiosInstance.get('/uploadimg/del', {
    file,
  })
  return response
}

export function uploadImgArr(files: any[]) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('filearr', files[i])
  }
  const response = axiosInstance.post('/uploadimg/ularr', formData)
  return response
}
