import { z } from 'zod'

export const usernameResolver = z
  .string()
  .min(4, { message: 'validations.min' })
  .max(40, { message: 'validations.max' })

export const passwordResolver = z
  .string()
  .min(6, { message: 'validations.min' })
  .max(32, { message: 'validations.max' })

export const titleResolver = z
  .string()
  .min(4, { message: 'validations.min' })
  .max(80, { message: 'validations.max' })

export const descriptionResolver = z
  .string()
  .min(10, { message: 'validations.min' })
  .max(1000, { message: 'validations.max' })

export const priceResolver = z.number().min(0.1, { message: 'validations.min' })
