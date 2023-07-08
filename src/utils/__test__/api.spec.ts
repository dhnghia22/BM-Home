import { ApiClient } from '../api-client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient('https://api.example.com');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should make a GET request and return the response', async () => {
      const responseData = { id: 1, name: 'John Doe' };
      const expectedResponse = { data: responseData };
      mockedAxios.get.mockResolvedValueOnce(expectedResponse);

      const response = await apiClient.get('/users');

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/users', undefined);
      expect(response).toEqual(expectedResponse);
    });

    it('should handle a 401 response by refreshing the token and retrying the request', async () => {
      const responseData = { id: 1, name: 'John Doe' };
      const unauthorizedErrorResponse = { response: { status: 401 } };
      const refreshTokenResponse = { data: { accessToken: 'new-access-token' } };
      const expectedResponse = { data: responseData };
      mockedAxios.get.mockRejectedValueOnce(unauthorizedErrorResponse);
      mockedAxios.get.mockResolvedValueOnce(expectedResponse);
      mockedAxios.post.mockResolvedValueOnce(refreshTokenResponse);

      const response = await apiClient.get('/users');

      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/users', undefined);
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith('https://api.example.com/refresh-token', undefined);
      expect(response).toEqual(expectedResponse);
    });

    it('should handle a failed token refresh by rejecting the request', async () => {
      const unauthorizedErrorResponse = { response: { status: 401 } };
      const refreshTokenErrorResponse = { response: { status: 500 } };
      mockedAxios.get.mockRejectedValueOnce(unauthorizedErrorResponse);
      mockedAxios.post.mockRejectedValueOnce(refreshTokenErrorResponse);

      await expect(apiClient.get('/users')).rejects.toEqual(unauthorizedErrorResponse);

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });
  });

  // Add more test cases for other HTTP methods (e.g., post, put, delete)

});
