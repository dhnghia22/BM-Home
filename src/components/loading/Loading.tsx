import { Colors } from '@/constants/colors'
import React from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.light.primary} animating={true} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Loading
