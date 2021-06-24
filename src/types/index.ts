export type ApiUrl =
  'https://api-staging.upgrade.chat'
  | 'https://api.upgrade.chat'
  | 'https://api-local.upgrade.chat'

export type ApiVersion = 'v1'

export interface OauthResponse {
  access_token: string
  refresh_token: string
  // In milliseconds
  refresh_token_expires_in: string
  // In milliseconds
  access_token_expires_in: string
  type: 'Bearer'
  token_type: 'Bearer'
}

export enum PaymentProcessor {
  Stripe = 'STRIPE',
  PayPal = 'PAYPAL'
}

export enum OrderType {
  UPGRADE = 'UPGRADE',
  SHOP = 'SHOP'
}

export enum BillingInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year'
}

export enum OrderItemProductType {
  DISCORD_ROLE = 'DISCORD_ROLE'
}

export enum ProductType {
  UPGRADE = 'UPGRADE',
  SHOP_PRODUCT = 'SHOP_PRODUCT'
}

export interface Order {
  id: string
  uuid: string
  purchased_at: Date
  payment_processor: PaymentProcessor
  payment_processor_record_id: string
  /** Total Amount Excluding Discounts */
  subtotal: number
  /** Total Amount Subtracking Discounts */
  total: number
  /** Total Discount */
  discount: number
  type: OrderType
  is_subscription: boolean
  /** The date the user set the subscription to cancel */
  cancelled_at: Date
  /** The date the Upgrade bonuses were removed */
  deleted: Date
  user: User
  order_items: OrderItem[]
}

export interface User {
  id: number
  discord_id?: string
  username?: string
  email?: string
}

export interface OrderItem {
  price: number
  interval?: BillingInterval
  interval_count?: number
  is_time_limited: boolean
  free_trial_length?: number
  payment_processor_record_id: string
  payment_processor: PaymentProcessor
  quantity: number
  product: Pick<Product, 'name' | 'uuid'>
  product_types: OrderItemProductType[]
  discord_roles: DiscordRole[]
}

export interface Product {
  uuid: string
  name: string
  checkout_url?: string
  account_id: number
  price: number
  interval?: BillingInterval
  interval_count?: number
  free_trial_length?: number
  description?: string
  image_link?: string
  variable_price: boolean
  is_time_limited: boolean
  limited_inventory: boolean
  available_stock?: number
  shippable?: boolean
  paymentless_trial: boolean
  product_types: ProductType[]
}

export interface DiscordRole {

}

export interface Webhook {
  id: string
  uri: string
}

export enum WebhookEventType {
  ORDER_CREATED = 'order.created',
  ORDER_UPDATED = 'order.updated',
  ORDER_DELETED = 'order.deleted'
}
export interface WebhookEvent {
  id: string
  body: any
  type: WebhookEventType
  attempts: number
  webhook_id: string
}