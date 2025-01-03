import type { Base } from './base.interface'
import type { DenseBookStore } from './bookstore.interface'
import type { DenseBook } from './book.interface'

export interface Inventory extends Base {
  quantity: number
  bookstore: DenseBookStore
  book: DenseBook
}
