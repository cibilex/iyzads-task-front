import type { CommonTableStatuses } from './common.types'

export type Permission = Record<
  string,
  {
    perms: Record<string, { v: number; id: number }>
    id: number
  }
>

export enum UserTypes {
  ADMIN = 1,
  USER,
}

export interface User {
  permissions: Record<string, number>
  allPermissions: Permission
  username: string
  type: UserTypes
  status: CommonTableStatuses
}
