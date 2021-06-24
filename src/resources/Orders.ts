import Resource from "../Resource"
import { Order } from '../types'

interface ListOrderOptions {
  /** 1-100. Default 100 */
  limit?: number
  offset?: number
  userDiscordId?: string
  type?: 'UPGRADE' | 'SHOP'
}

interface ListOrdersResponse {
  data: Order[]
  has_more: boolean
  total: number
}

export class Orders extends Resource {

  async getById(orderId: string): Promise<Order> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/orders/${orderId}`,
      method: 'GET' as const
    }
    const { data: order }: { data: Order } = await this._upgradeChat.request(requestOptions)
    return order
  }

  async list({
    limit = 100,
    offset = 0,
    ...options
  }: ListOrderOptions = {}): Promise<ListOrdersResponse> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/orders`,
      method: 'GET' as const,
      params: { ...options, limit, offset }
    }
    const response: ListOrdersResponse = await this._upgradeChat.request(requestOptions)
    return response
  }
}

export default Orders