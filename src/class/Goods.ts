import { Spec, AVFile } from './goodsTypes'
import Category from './Category';
export default interface Goods {
  objectId?: string
  // 描述
  desc: string
  // 分类
  category: Category
  // 是否上架 0 不上架 1 上架
  display: number
  // 商品图片
  images: Array<AVFile>
  // 价格
  price?: number
  // 名称
  title: string
  // 规格
  spec?: Array<Spec>
  // 主图
  mainImage?: AVFile
}
