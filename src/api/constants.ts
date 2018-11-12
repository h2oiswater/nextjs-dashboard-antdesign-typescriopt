export const LEAN_API_ID = 'DpnvHL3ttpjzk5UvHnSEedNo-gzGzoHsz'

export const LEAN_API_KEY = 'vGLWcKIk9nh1udRwF44o1AsS'

export function getUploadUrl(name: string) {
  return `https://${LEAN_API_ID.substring(
    0,
    8
  )}.api.lncld.net/1.1/files/${name}`
}
