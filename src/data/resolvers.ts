import { z } from 'zod'

export const usernameResolver = z
  .string()
  .min(4, { message: 'validations.min' })
  .max(40, { message: 'validations.max' })

export const passwordResolver = z
  .string()
  .min(6, { message: 'validations.min' })
  .max(32, { message: 'validations.max' })
