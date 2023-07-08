import { SCREENS } from '@/constants/screens'
import NavigationService from '@/utils/navigation'

export class AppRoutes {
  static openDummyScreen() {
    NavigationService.navigate(SCREENS.DUMMY)
  }

  static openAuth() {}
}
