// export default interface Category {
//   class?: string
//   where?: string
//   limit?: number
//   skip?: number
//   order?: string
//   include?: string
//   keys?: string
//   count?: number
// }

type CategoryType = {
  class?: string
  where?: string
  limit?: number
  skip?: number
  order?: string
  include?: string
  keys?: string
  count?: number
}

type Category = Partial<CategoryType>

export default Category
