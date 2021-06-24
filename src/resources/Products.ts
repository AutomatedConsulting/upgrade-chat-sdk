import Resource from "../Resource"
import { Product, ProductType } from '../types'

interface ListProductOptions {
  /** 1-100. Default 100 */
  limit?: number
  offset?: number
  type?: ProductType
}

interface ListProductResponse {
  data: Product[]
  has_more: boolean
  total: number
}

export class Products extends Resource {

  async getByUuid(productId: string): Promise<Product> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/products/${productId}`,
      method: 'GET' as const
    }
    const { data }: { data: Product } = await this._upgradeChat.request(requestOptions)
    return data
  }

  async list({
    limit = 100,
    offset = 0,
    ...options
  }: ListProductOptions = {}): Promise<ListProductResponse> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/products`,
      method: 'GET' as const,
      params: { ...options, limit, offset }
    }
    const response: ListProductResponse = await this._upgradeChat.request(requestOptions)
    return response
  }
}

export default Products