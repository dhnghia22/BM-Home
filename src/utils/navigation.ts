import { NavigationContainerRef } from '@react-navigation/native'

class NavigationService {
  private static navigationRef: NavigationContainerRef | null = null

  static setNavigationRef(ref: NavigationContainerRef | null) {
    NavigationService.navigationRef = ref
  }

  static navigate(routeName: string, params?: object) {
    if (NavigationService.navigationRef) {
      NavigationService.navigationRef.navigate(routeName, params)
    }
  }

  static goBack() {
    if (NavigationService.navigationRef) {
      NavigationService.navigationRef.goBack()
    }
  }
}

export default NavigationService
