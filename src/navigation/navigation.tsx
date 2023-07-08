import { createStackNavigator } from '@react-navigation/stack'
import {
  NavigationContainer,
  NavigationContainerRef
} from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import NavigationService from '@/utils/navigation'
import { SCREENS } from '@/constants/screens'
import HomeScreen from '@/module/common/screens/home/HomeScreen'

const Stack = createStackNavigator()

const AppNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef>(null)

  useEffect(() => {
    NavigationService.setNavigationRef(navigationRef.current)
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
