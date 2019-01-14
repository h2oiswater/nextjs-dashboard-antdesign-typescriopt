export interface CreateStoreParams {
  name: string
  owner: Pointer
  logo: FilePointer
}

export interface Pointer {
  __type: 'Pointer' | 'File'
  className: string
  objectId: string
}

export interface FilePointer {
  __type: 'File'
  objectId: string
}

export function buildPointer(params: {
  className: string
  objectId: string
}): Pointer {
  const pointer: Pointer = {
    className: params.className,
    objectId: params.objectId,
    __type: 'Pointer'
  }
  return pointer
}

export function buildFile(params: { objectId: string }): FilePointer {
  const pointer: FilePointer = {
    objectId: params.objectId,
    __type: 'File'
  }
  return pointer
}
