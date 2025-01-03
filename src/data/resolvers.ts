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

export const priceResolver = z.number().min(0.1, { message: 'validations.minValue' })

export const countryResolver = z
  .string()
  .min(2, { message: 'validations.min' })
  .max(3, { message: 'validations.max' })

export const cityResolver = z
  .string()
  .min(2, { message: 'validations.min' })
  .max(10, { message: 'validations.max' })

export const quantityResolver = z
  .number()
  .int()
  .min(1, { message: 'validations.minValue' })
  .max(100000, { message: 'validations.maxValue' })

export const intResolver = z
  .number()
  .int()
  .min(1, { message: 'validations.required' })
  .max(2147483647, { message: 'validations.maxValue' })
