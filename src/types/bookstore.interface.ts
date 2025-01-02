import type { CommonTableStatuses } from './common.types'

export interface BookStore {
  id: number
  title: string
  country: number
  city: string
  status: CommonTableStatuses
}
