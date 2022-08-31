import { CoinItem, Balance, BalanceV2 } from '..'
import { find, plus, lte } from '../utils'

interface Params {
  amount: string
  denom: string
  fee: CoinItem
  tax?: CoinItem
}

type Validate = (params: Params, balance: Balance[] | BalanceV2[], isClassic?: boolean) => boolean

export const isAvailable: Validate = (params, balance, isClassic) => {
  const { amount, denom, fee, tax } = params
  const total = plus(amount, tax?.amount ?? '0')
  const available = find(`${denom}:${isClassic ? 'available' : 'amount'}`, balance) || '0'

  return fee.denom === denom
    ? lte(plus(total, fee.amount), available)
    : lte(total, available) && isFeeAvailable(fee, balance, isClassic)
}

export const isDelegatable: Validate = (params, balance, isClassic) => {
  const { amount, denom, fee } = params
  const available =
    (denom && find(`${denom}:${isClassic ? 'available' : 'amount'}`, balance)) ?? '0'
  const delegatable =
    (denom && find(`${denom}:${isClassic ? 'delegatable' : 'amount'}`, balance)) ?? '0'
  return denom === fee.denom
    ? lte(plus(amount, fee.amount), delegatable) &&
        lte(fee.amount, available)
    : lte(amount, delegatable) && isFeeAvailable(params, balance, isClassic)
}

export const isFeeAvailable = (
  fee: CoinItem,
  balance: Balance[] | BalanceV2[],
  isClassic?: boolean
): boolean => {
  const available = find(`${fee.denom}:${isClassic ? 'available' : 'amount'}`, balance) || '0'
  return lte(fee.amount, available)
}

export const getFeeDenomList = (balance: Balance[] | BalanceV2[]): string[] =>
  balance?.map(({ denom }) => denom)
