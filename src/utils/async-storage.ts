import AsyncStorage from '@react-native-async-storage/async-storage';

export const get = async (name: string): Promise<any | undefined> => {
  try {
    const str = await AsyncStorage.getItem(`${name}`);
    if (str !== null) {
      return JSON.parse(str);
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

interface SetParams {
  name: string;
  data: any;
}

export const set = async ({ name, data }: SetParams): Promise<void> => {
  try {
    const stringJson = JSON.stringify(data);
    await AsyncStorage.setItem(name, stringJson);
  } catch (error) {}
};
