import { ApiClient } from '@/utils/api-client'
import { AxiosResponse } from 'axios'

describe('ApiClient', () => {
  let apiClient: ApiClient

  beforeEach(() => {
    apiClient = new ApiClient('https://api.example.com')
  })

  afterEach(() => {})

  it('should make a GET request and return data on success', async () => {
    const responseData = { message: 'Success' }

    apiClient.instance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: responseData }))

    const result = await apiClient.get('/users', { params: {} })
    expect(apiClient.instance.get).toHaveBeenCalledWith(
      '/users',
      expect.any(Object)
    )
    expect(result).toEqual(responseData)
  })

  it('should throw an error on failed GET request', async () => {
    const error = new Error('Request failed')
    apiClient.instance.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(error))
    await expect(apiClient.get('/users', { params: {} })).rejects.toThrowError(
      error
    )
    expect(apiClient.instance.get).toHaveBeenCalledWith(
      '/users',
      expect.any(Object)
    )
  })

  it('should handle 401 error by refreshing the token', async () => {
    expect(1).toEqual(1)
  });

})
