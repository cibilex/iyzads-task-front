import type { Base } from './base.interface'

export interface BookStore extends Base {
  title: string
  country: number
  city: string
}

export type DenseBookStore = Pick<BookStore, 'id' | 'title' | 'country'>
