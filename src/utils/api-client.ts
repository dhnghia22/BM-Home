import { ConfigUtil } from '@/configs'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { get } from 'lodash'

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __isRetryRequest?: boolean
}

export class ApiClient {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
      // Other default configurations
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
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
      (error) => {
        // Check if the response code is 401
        if (
          error.response &&
          error.response.status === 401 &&
          !error.config.__isRetryRequest
        ) {
          // Mark the request as a retry request
          error.config.__isRetryRequest = true

          // Call the refresh token API to get a new token
          return this.refreshToken()
            .then(() => {
              // Update the token header with the new token
              error.config.headers.Authorization = `Bearer ${this.getAccessToken()}`

              // Retry the original request
              return this.instance.request(error.config)
            })
            .catch(() => {
              // Handle the failure of the refresh token request
              // e.g., redirect to login page or show an error message
              // ...

              // Reject the original error
              return Promise.reject(error)
            })
        }

        // Handle other error cases
        // ...

        return Promise.reject(error)
      }
    )
  }

  private refreshToken(): Promise<void> {
    // Call the refresh token API and update the access token
    // ...

    return Promise.resolve()
  }

  private getAccessToken(): string {
    // Get the current access token
    // ...

    return 'your-access-token'
  }

  public get<T>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('start')
        const res = await this.instance.get<T>(url, config);
        console.log('res')
        resolve(res.data);
      } catch (e) {
        console.log(e)
        reject(e);
      }
    })
  }

  public post<T>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.instance.post<T>(url, config);
        resolve(res.data);
      } catch (e) {
        reject(e);
      }
    })
  }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
}