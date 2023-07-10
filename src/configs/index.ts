import { prod, dev } from './env'
export class ConfigUtil {
  static configs = dev
  static setConfigs = (name) => {
    if (name === 'dev') {
      ConfigUtil.configs = dev
    } else if (name === 'prod') {
      ConfigUtil.configs = prod
    }
  }
}
