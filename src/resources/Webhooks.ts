import Resource  from "../Resource"
import { Webhook } from '../types'

interface ListWebhookOptions {
  /** 1-100. Default 100 */
  limit?: number
  /** Default 0 */
  offset?: number
}

interface ListWebhookResponse {
  data: Webhook[]
  has_more: boolean
  total: number
}

export class Webhooks extends Resource {

  async getById(webhookId: string): Promise<Webhook> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/webhooks/${webhookId}`,
      method: 'GET' as const
    }
    const { data }: { data: Webhook } = await this._upgradeChat.request(requestOptions)
    return data
  }

  async list({
    limit = 100,
    offset = 0
  }: ListWebhookOptions = {}): Promise<ListWebhookResponse> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/webhooks`,
      method: 'GET' as const,
      params: { limit, offset }
    }
    const response: ListWebhookResponse = await this._upgradeChat.request(requestOptions)
    return response
  }
}

export default Webhooks