import { urlPath } from '@/constants/url-path'
import { ApiService } from '@/utils/api-client'

// coordinates=106.68078570346272,10.81675548675936
// features=iconrevamp
// name=

export interface IGetHomeParam {
  coordinates: string
  features: string
  name: string
  page?: number
}

export const HomeApiServices = {
  getHomeData(params: IGetHomeParam): Promise<object> {
    return ApiService.instance.get<object>(urlPath.views.home, {
      params: {
        coordinates: params.coordinates,
        features: params.features,
        name: params.name,
        page: params.page
      }
    })
  }
}
