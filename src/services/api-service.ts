import { ConfigUtil } from "@/configs"
import { ApiClient, CustomAxiosRequestConfig } from "@/utils/api-client"
import { AxiosResponse } from "axios"
import { get } from 'lodash'

export interface IApiRequester {
  get<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T>
  post<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T>
}

export class ApiClientService implements IApiRequester {
  
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient(ConfigUtil.configs.BASE_URL)
  }

  get<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.get(url, config)
  }
  post<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return this.apiClient.post(url, config)
  }
}

export class ApiClientMockService implements IApiRequester {
  get<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return new Promise((resolve) => {
      resolve
      setTimeout(() => {
        let mockFileName = url.replace(/\//g, '_')
        const json = require('@/services/mocks/index')
        if (!!get(config, 'params.page')) {
          mockFileName = mockFileName + `_page_${get(config, 'params.page')}`
        }
        console.log('Load mock from: ', mockFileName)
        const response: AxiosResponse<T> = {
          data: json[mockFileName],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {}
        }
        resolve(response.data)
      }, Math.floor(Math.random() * (1000 - 250 + 1)) + 250)
    })
  }

  post<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return new Promise((resolve) => {
      resolve
      setTimeout(() => {
        const mockFileName = url.replace(/\//g, '_')
        const json = require('@/services/mocks/index')
        const response: AxiosResponse<T> = {
          data: json[mockFileName],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {}
        }
        resolve(response.data)
      }, Math.floor(Math.random() * (1000 - 250 + 1)) + 250)
    })
  }
}

function createApiClientInstance(environment: string): IApiRequester {
  console.log('createApiClientInstance: ', environment)
  if (environment === 'dev') {
    return new ApiClientMockService()
  } else if (environment === 'prod') {
    return new ApiClientService()
  } else {
    throw new Error(`Invalid environment: ${environment}`)
  }
}

export class ApiService {
  static instance: IApiRequester

  static initService() {
    this.instance = createApiClientInstance(ConfigUtil.configs.ENVIRONMENT)
  }

  static setService(instance: IApiRequester) {
    this.instance = instance
  }
}
