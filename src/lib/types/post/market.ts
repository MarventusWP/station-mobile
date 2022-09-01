import { DisplayCoin } from '..'
import { Field } from '../common/form'
import { BankData, BankDataV2 } from '../data/bank'
import { CW20Pairs } from '..'

export interface SwapUI {
  bank?: BankData|BankDataV2
  pairs?: CW20Pairs
  mode: string
  message: string
  expectedPrice?: {
    title: string
    text: string
  }
  max?: {
    title: string
    display: DisplayCoin
    attrs: { onClick: () => void }
  }
  spread?: {
    title: string
    text?: string
    value?: string
    unit?: string
    tooltip?: string
  }
  label: {
    multipleSwap: string
  }
  slippageField: Field
}
