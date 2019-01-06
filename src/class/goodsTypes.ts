import Category from './Category'
import Goods from './Goods'

export const SPEC_TYPE_BASE = 0
export const SPEC_TYPE_MODIFY = 1

export interface Spec {
  objectId?: string
  // 名称
  name?: string
  // 价格
  price?: number
  // 价格类型 0 基准价 1 修饰价
  type?: number
  // 子规格
  subSpecs?: Array<Spec>
}

export type CategoryListRep = {
  result: Array<Category>
  count: number
}

export type GoodsListRep = {
  result: Array<Goods>
  count: number
}
