import Orders from './Orders'
import Products from './Products'
import Webhooks from './Webhooks'
import WebhookEvents from './WebhookEvents'

const resources = {
  Orders,
  Products,
  Webhooks,
  WebhookEvents
}

export type Resources = {
  [property in Uncapitalize<keyof typeof resources>]: InstanceType<(typeof resources[Capitalize<property>])>
}

export type ResourceLabel = keyof Resources

export default resources