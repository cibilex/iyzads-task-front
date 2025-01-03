import type { CommonTableStatuses } from './common.types'

export interface Base {
  id: number
  status: CommonTableStatuses
  createdAt: number
  updatedAt: number
}
