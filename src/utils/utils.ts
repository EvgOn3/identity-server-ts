import { EnvVarName } from '../types/general'
import { env } from 'process'

export const isCompleteIntersection = (arr1: string[], arr2: string[]) => {
  const sameLength = arr1.length === arr2.length
  if (!sameLength) return false
  const set1 = new Set(arr1)
  const set2 = new Set(arr2)
  if (set1.size != set2.size) return false
  const intersection = Array.from(
    new Set([...arr1].filter((x) => new Set(arr2).has(x)))
  )
  return intersection.length === arr1.length
}

export const tryToGetEnvVar = (name: EnvVarName) => {
  const envVar = env[name]
  if (envVar) {
    if (typeof envVar === 'string') return envVar as string
    return envVar as number
  } else throw new Error('Cant get env var')
}
