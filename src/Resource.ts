import { camelCase } from 'lodash'
import UpgradeChat from './index'
import { ResourceLabel, TypeChecks } from './resources'
import Orders from './resources/Orders'
import Products from './resources/Products'
import WebhookEvents from './resources/WebhookEvents'
import Webhooks from './resources/Webhooks'

export default abstract class Resource<type extends ResourceLabel = ResourceLabel> implements TypeChecks {
  _upgradeChat: UpgradeChat

  get type(): type {
    return camelCase(this.constructor.name) as type
  }

  constructor(upgradeChat: UpgradeChat) {
    this._upgradeChat = upgradeChat
    return this
  }

  isOrders(instance: Resource): instance is Orders  {
    return instance instanceof Orders
  }

  isProducts(instance: Resource): instance is Products  {
    return instance instanceof Products
  }

  isWebhooks(instance: Resource): instance is Webhooks  {
    return instance instanceof Webhooks
  }

  isWebhookEvents(instance: Resource): instance is WebhookEvents  {
    return instance instanceof WebhookEvents
  }
}