import FlexView from '@/components/flex/FlexView'
import NavigationBar from '@/components/navigation-bar/NavigationBar'
import { RobotoRegularText } from '@/components/text/BMText'
import { commonStyles } from '@/constants/common-style'
import React from 'react'
import WebView from 'react-native-webview'

const WebScreen = ({ route, navigation }) => {
  return (
    <>
      <NavigationBar title="Web View" />
      <FlexView>
        <RobotoRegularText>{route.params.url}</RobotoRegularText>
      </FlexView>
    </>
  )
}

export default WebScreen
