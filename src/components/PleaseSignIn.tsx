import React, { ReactElement } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useInfo, Trans } from 'use-station/src'
// import Info from './Info'
import EStyleSheet from 'react-native-extended-stylesheet'
import Card from './Card'
import Text from 'components/Text'

const PleaseSignIn = (): ReactElement => {
  const { navigate } = useNavigation()
  const { SIGN_IN_REQUIRED } = useInfo()
  const { title, i18nKey, button } = SIGN_IN_REQUIRED

  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>
        <Trans i18nKey={i18nKey}>
          <Text />
        </Trans>
      </Text>
      <TouchableWithoutFeedback
        onPress={(): void => navigate('AuthMenu')}
      >
        <View style={styles.button}>
          <Text style={styles.button_text}>{button}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Card>
  )
}

const styles = EStyleSheet.create({
  title: {
    color: '$primaryColor',
    fontSize: 18,
    lineHeight: 27,
    marginBottom: 5,
  },
  content: {
    color: '$primaryColor',
    fontSize: 14,
    lineHeight: 21,
  },
  button: {
    backgroundColor: '$primaryColor',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
  },
})

export default PleaseSignIn
