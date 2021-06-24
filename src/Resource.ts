import { camelCase } from 'lodash'
import UpgradeChat from './index'
import { ResourceLabel } from './resources'

export default abstract class Resource {
  _upgradeChat: UpgradeChat

  get type(): ResourceLabel {
    return camelCase(this.constructor.name) as ResourceLabel
  }

  constructor(upgradeChat: UpgradeChat) {
    this._upgradeChat = upgradeChat
    return this
  }
}