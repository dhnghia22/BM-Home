import homeReducer, { HomeState, mapToModel, section } from '../home-reducer'
import {
  HOME_SET_LOADING,
  HOME_SET_REFRESHING,
  HOME_SET_ERROR,
  HOME_FETCH_SUCCESS,
  HOME_FETCH_MORE_DATA,
  HOME_FETCH_MORE_SUCCESS
} from '../../types/home-types';
import { API_STATUS } from '@/constants/status';

describe('homeReducer', () => {
  let initialState: HomeState;

  beforeEach(() => {
    initialState = {
      data: [],
      status: API_STATUS.DEFAULT,
      errorMessage: null
    };
  });

  it('should return the initial state', () => {
    expect(homeReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle HOME_SET_LOADING', () => {
    const action = { type: HOME_SET_LOADING };
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.LOADING);
  });

  it('should handle HOME_SET_REFRESHING', () => {
    const action = { type: HOME_SET_REFRESHING };
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.REFRESHING);
  });

  it('should handle HOME_SET_ERROR', () => {
    const errorMessage = 'An error occurred.';
    const action = { type: HOME_SET_ERROR, payload: errorMessage };
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.ERROR);
    expect(nextState.errorMessage).toEqual(errorMessage);
  });

  it('should handle HOME_FETCH_SUCCESS', () => {
    const mockPayload = { data: [{ id: 1, name: 'Item 1' }] };
    const action = { type: HOME_FETCH_SUCCESS, payload: mockPayload };
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.SUCCESS);
    // expect(nextState.data).toEqual(mockPayload.data);
    expect(nextState.errorMessage).toBeNull();
  });

  it('should handle HOME_FETCH_MORE_DATA', () => {
    const action = { type: HOME_FETCH_MORE_DATA };
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.MORE_LOADING);
  });

  it('should handle HOME_FETCH_MORE_SUCCESS', () => {
    const existingData = [{ id: 1, name: 'Item 1' }];
    const mockPayload = { data: [{ id: 2, name: 'Item 2' }] };
    const action = { type: HOME_FETCH_MORE_SUCCESS, payload: mockPayload };
    initialState.data = existingData;
    const nextState = homeReducer(initialState, action);

    expect(nextState.status).toEqual(API_STATUS.SUCCESS);
    // expect(nextState.data).toEqual([...existingData, ...mockPayload.data]);
  });
});



describe('mapToModel', () => {
  it('should return null if data is null', () => {
    const type = section.bannerSection;
    const result = mapToModel(type, null);

    expect(result).toBeNull();
  });

  it('should map data to banner section model', () => {
    const type = section.bannerSection;
    const data = {
      banners: [{ id: 1, name: 'Banner 1' }, { id: 2, name: 'Banner 2' }]
    };
    const result = mapToModel(type, data);

    expect(result).toEqual({
      section: type,
      data: [],
      banners: expect.any(Array) // You can further test the structure of the banners array if needed
    });
  });

  // Write similar tests for other cases (subserviceSection, iconSection, etc.)

  it('should return null for unknown section type', () => {
    const type = 'unknownSection';
    const data = { foo: 'bar' };
    const result = mapToModel(type, data);

    expect(result).toBeNull();
  });
});
