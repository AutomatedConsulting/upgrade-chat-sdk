import Orders from './Orders'
import Products from './Products'
import Webhooks from './Webhooks'
import WebhookEvents from './WebhookEvents'
import Resource from '../Resource'

const resources = {
  Orders,
  Products,
  Webhooks,
  WebhookEvents
}

export type Resources = {
  [property in Uncapitalize<keyof typeof resources>]: InstanceType<(typeof resources[Capitalize<property>])>
}

export type TypeChecks = {
  [property in `is${keyof typeof resources}`]: property extends `is${infer Label}`
  ? Uncapitalize<Label> extends ResourceLabel ? (instance: Resource) => instance is Resources[Uncapitalize<Label>]
    : never
  : never
}

export type ResourceLabel = keyof Resources
export type ResourceUnion = InstanceType<(typeof resources[keyof typeof resources])>

export default resources