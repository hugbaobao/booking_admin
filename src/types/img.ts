export interface PNGFILE {
  name: string
  uid: string
  url: string
  [key: string]: string
}

export interface BANNER {
  name: string
  url: string
  page: string
  [key: string]: string
}

export interface SWITCH {
  name: string
  url: string
  page: string
  [key: string]: string
}

export interface COVER {
  url: string
  page: string
  [key: string]: string | number
}
