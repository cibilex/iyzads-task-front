import { UserTypes } from '@/types/user.interface'
import { CommonTableStatuses } from '@/types/common.types'
export enum LocalItems {
  LANG = 'lng',
  THEME = 'thm',
  ACCESS_TOKEN = 'tkn',
}

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export const languageModel = {
  tr: 'tr',
  en: 'gb',
}

export const commonStatuses = {
  [CommonTableStatuses.ACTIVE]: {
    title: 'active',
    severity: 'sucess',
  },
  [CommonTableStatuses.PASSIVE]: {
    title: 'passive',
    severity: 'warning',
  },
  [CommonTableStatuses.DELETED]: {
    title: 'deleted',
    severity: 'error',
  },
}
export const userStatuses = {
  [UserTypes.ADMIN]: {
    title: 'userTypes.' + UserTypes.ADMIN,
    severity: 'primary',
    icon: '',
  },
  [UserTypes.USER]: {
    title: 'userTypes.' + UserTypes.USER,
    severity: 'secondary',
    icon: '',
  },
}
export const rowsPerPageOptions = [10, 25, 50, 100]
