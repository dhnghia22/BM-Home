import { ConfigUtil } from '@/configs'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { get } from 'lodash'

export class ApiClient {
  instance: AxiosInstance
  isRetry = false
  queueApisWaitRefreshToken = []
  isRefreshToken = false

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
      // Other default configurations
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Add custom logic for request interception
        config.headers = {
          'User-Agent': `BAEMIN/${new Date().getTime()} CFNetwork/1399 Darwin/22.1.0`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Add custom logic for successful response interception
        return response
      },
      async (error) => {
        if (error.response?.status === 401) {
          const originalRequest = error.config || {}
          if (!this.isRefreshToken) {
            this.isRefreshToken = true
            try {
              await this.refreshToken()
              originalRequest.headers['Authorization'] = `Bearer ${this.getAccessToken()}`
              this.queueApisWaitRefreshToken.forEach((update) => update())
            } catch (e) {
              return Promise.reject(e)
            } finally {
              this.isRefreshToken = false
              this.queueApisWaitRefreshToken = []
            }
          } else {
            return new Promise((resolve, reject) => {
              this.queueApisWaitRefreshToken.push(() => {
                originalRequest.headers[
                  'Authorization'
                ] = `Bearer ${this.getAccessToken()}`
                resolve(this.instance.request(originalRequest))
              })
            })
          }
        }
        return Promise.reject(error)
      }
    )
  }

  private refreshToken(): Promise<void> {
    return Promise.resolve()
  }

  private getAccessToken(): string {
    return 'your-access-token'
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.get<T>(url, config)
        resolve(res.data)
      } catch (e) {
        reject(e)
      }
    })
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.post<T>(url, config)
        resolve(res.data)
      } catch (e) {
        reject(e)
      }
    })
  }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
}
