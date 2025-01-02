import type { CommonTableStatuses } from './common.types'

export interface Book {
  id: number
  title: string
  publicationDate: number
  description: string
  price: number
  status: CommonTableStatuses
}
