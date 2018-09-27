export const keys = {
  KEY_TOKEN: 'token'
}

export function set(key: string, data: any) {
  localStorage.setItem(key, data)
}

export function get(key: string): any {
  return localStorage.getItem(key)
}
