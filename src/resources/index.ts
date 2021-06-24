import Orders from './Orders'
import Products from './Products'
import Webhooks from './Webhooks'
import WebhookEvents from './WebhookEvents'

export type ResourceType = typeof Orders | typeof Products | typeof Webhooks | typeof WebhookEvents

const resources: ResourceType[] = [Orders, Products, Webhooks, WebhookEvents]

export default resources