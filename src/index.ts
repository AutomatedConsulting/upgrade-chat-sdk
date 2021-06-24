import resources from './resources'
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { ApiUrl, ApiVersion, OauthResponse } from './types'
import Orders from './resources/Orders'
import Products from './resources/Products'
import Webhooks from './resources/Webhooks'
import WebhookEvents from './resources/WebhookEvents'

interface UpgradeChatConstructor {
  apiUrl?: ApiUrl
  clientId: string
  clientSecret: string
  logging?: boolean
  version?: ApiVersion
}

export default class UpgradeChat {
  public apiUrl: ApiUrl = 'https://api-staging.upgrade.chat'
  public version: ApiVersion = 'v1'
  public clientId!: string
  public clientSecret!: string
  public logging!: any | null
  // Resources
  orders!: Orders
  products!: Products
  webhooks!: Webhooks
  webhookEvents!: WebhookEvents

  // Private
  private axios!: AxiosInstance
  private accessToken?: string
  private accessTokenExpiresAt?: number
  private refreshToken?: string
  private refreshTokenExpiresAt?: number

  constructor(config: UpgradeChatConstructor) {
    this.apiUrl = config.apiUrl ?? this.apiUrl
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.logging = config.logging
    this.version = config.version ?? this.version

    this.axios = axios.create({
      baseURL: `${this.apiUrl}/`
    })
    
    this._initializeResources()
    
    return this
  }

  private _initializeResources() {
    resources.forEach((resource) => {
      const instance = new resource(this)
      switch (true) {
        case instance instanceof Orders:
          this.orders = instance as Orders
          break
        case instance instanceof Products:
          this.products = instance as Products
          break
        case instance instanceof Webhooks:
          this.webhooks = instance as Webhooks
          break
        case instance instanceof WebhookEvents:
          this.webhookEvents = instance as WebhookEvents
          break
      }
    })
  }

  public async request(
    options: AxiosRequestConfig
  ) {
    try {
      await this.exchangeRefreshToken()
      const { data } = await this.axios({
        headers: this.jsonHeaders,
        ...options
      })
      return data
    } catch (error) {
      throw error
    }
  }

  private async generateRefreshToken() {
    try {
      if (this.hasValidRefreshToken) return
      const options = {
        url: `oauth/token`,
        method: 'POST' as const,
        data: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials'
        }
      }
      const { data }: { data: OauthResponse } = await this.axios(options)
      this.refreshToken = data.refresh_token
      this.accessToken = data.access_token
      this.accessTokenExpiresIn = +data.access_token_expires_in
      this.refreshTokenExpiresIn = +data.refresh_token_expires_in
    } catch (error) {
      throw error
    }
  }

  private async exchangeRefreshToken() {
    try {
      if (this.hasValidAccessToken) return
      if (!this.hasValidRefreshToken) return this.generateRefreshToken()
      const options = {
        url: `oauth/token`,
        method: 'POST' as const,
        data: {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: this.refreshToken,
          grant_type: 'refresh_token'
        }
      }
      const { data }: { data: OauthResponse } = await this.axios(options)
      this.refreshToken = data.refresh_token
      this.accessToken = data.access_token
      this.accessTokenExpiresIn = +data.access_token_expires_in
      this.refreshTokenExpiresIn = +data.refresh_token_expires_in
    } catch (error) {
      throw error
    }    
  }

  private set accessTokenExpiresIn(expiresIn: number) {
    this.accessTokenExpiresAt = new Date().setSeconds(new Date().getSeconds() + expiresIn - 10)
  }

  private set refreshTokenExpiresIn(expiresIn: number) {
    this.refreshTokenExpiresAt = new Date().setSeconds(new Date().getSeconds() + expiresIn - 10)
  }

  private get jsonHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    }
  }

  private get hasValidAccessToken() {
    return this.accessToken && this.accessTokenExpiresAt
      ? +new Date() < this.accessTokenExpiresAt
      : false
  }

  private get hasValidRefreshToken() {
    return this.accessToken && this.refreshTokenExpiresAt
      ? +new Date() < this.refreshTokenExpiresAt
      : false
  }
}
