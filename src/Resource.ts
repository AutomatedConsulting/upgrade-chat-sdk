import UpgradeChat from './index'

export default abstract class Resource {
  _upgradeChat: UpgradeChat

  constructor(upgradeChat: UpgradeChat) {
    this._upgradeChat = upgradeChat
    return this
  }
}