import Category from './Category'


export type Spec = {
    name: string
    detail: Array<SepcDetail>
}

/**
 * 商品价格等于基准价格 + 修饰价格
 */
export type SepcDetail = {
    title: string
    basePrice?: number // 基准价格
    fixPrice?: number // 修饰价格
}

export type CategoryListRep = {
    result: Array<Category>
    count: number
}
