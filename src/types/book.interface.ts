import type { Base } from './base.interface'

export interface Book extends Base {
  title: string
  description: string
  price: number
}
export type DenseBook = Pick<Book, 'id' | 'title' | 'price'>
