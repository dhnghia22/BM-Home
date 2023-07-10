import { SCREENS } from '@/constants/screens'
import NavigationService from '@/utils/navigation'

export class AppRoutes {
  static openDummyScreen() {
    NavigationService.navigate(SCREENS.DUMMY)
  }

  static openAuth() {}

  static open(type: string, link: string) {
    console.log(type)
    console.log(link)
    switch (type) {
      case 'WEB':
        console.log('dsdsds')
        NavigationService.navigate(SCREENS.WEB, {url: link})
        break
      default:
        AppRoutes.openDummyScreen()
        break
    }
  }
}
