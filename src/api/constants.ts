export const LEAN_API_ID = ''

export const LEAN_API_KEY = ''

export function getUploadUrl(name: string) {
  return `https://${LEAN_API_ID.substring(
    0,
    8
  )}.api.lncld.net/1.1/files/${name}`
}

export const BASE_API_URL = 'https://api.leancloud.cn/1.1'
