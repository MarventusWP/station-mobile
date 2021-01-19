import React, { FC, ReactNode, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { FormUI, Field as FieldProps } from 'use-station/src'
import Field from './Field'
import Text from 'components/Text'

interface Props {
  form: FormUI
  disabled?: boolean
  reversed?: boolean
  renderField?: (field: FieldProps) => ReactNode
  render?: (params: State) => ReactNode
}

export interface State {
  index: number
  setIndex: (index: number) => void
}

const Form: FC<Props> = ({
  form,
  renderField,
  render,
  children,
  ...props
}) => {
  const { reversed } = props
  const { title, fields, submitLabel, onSubmit } = form
  const disabled = props.disabled || form.disabled
  const [currentFieldIndex, setCurrentFieldIndex] = useState<number>(
    -1
  )

  return (
    <View>
      <Text>{title}</Text>
      {reversed && children}

      {fields.map((field, index) => (
        <Field
          field={field}
          focus={index === currentFieldIndex}
          onFocus={(): void => setCurrentFieldIndex(index)}
          render={renderField}
          key={field.attrs.id}
        />
      ))}

      {!reversed && children}
      {render?.({
        index: currentFieldIndex,
        setIndex: setCurrentFieldIndex,
      })}

      <TouchableOpacity onPress={onSubmit} disabled={disabled}>
        <Text>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Form
