import Resource from "../Resource"
import { WebhookEvent } from '../types'

interface ListWebhookEventOptions {
  /** 1-100. Default 100 */
  limit?: number
  /** Default 0 */
  offset?: number
}

interface ListWebhookEventResponse {
  data: WebhookEvent[]
  has_more: boolean
  total: number
}

export class WebhookEvents extends Resource {

  async getById(webhookEventId: string): Promise<WebhookEvent> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/webhook-events/${webhookEventId}`,
      method: 'GET' as const
    }
    const { data }: { data: WebhookEvent } = await this._upgradeChat.request(requestOptions)
    return data
  }

  async list({
    limit = 100,
    offset = 0
  }: ListWebhookEventOptions = {}): Promise<ListWebhookEventResponse> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/webhook-events`,
      method: 'GET' as const,
      params: { limit, offset }
    }
    const response: ListWebhookEventResponse = await this._upgradeChat.request(requestOptions)
    return response
  }

  async isValid(webhookEventId: string): Promise<boolean> {
    // FIX: Add runtime options validator
    const requestOptions = {
      url: `v1/webhook-events/${webhookEventId}/validate`,
      method: 'GET' as const
    }
    const { valid }: { valid: boolean } = await this._upgradeChat.request(requestOptions)
    return valid
  }
}

export default WebhookEvents