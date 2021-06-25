import { camelCase } from 'lodash'
import UpgradeChat from './index'
import { ResourceLabel } from './resources'

export default abstract class Resource<type extends ResourceLabel = ResourceLabel> {
  _upgradeChat: UpgradeChat

  get type(): type {
    return camelCase(this.constructor.name) as type
  }

  constructor(upgradeChat: UpgradeChat) {
    this._upgradeChat = upgradeChat
    return this
  }
}