export interface SHOP {
  name: string
  price: number
  original: number
  simple: string[]
  words: string
  cover: string[]
  count: number
  [key: string]: string | number | string[]
}
