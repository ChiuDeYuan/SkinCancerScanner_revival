import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const saveString = async (key:string, value:string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key:string, value:any) => {
  saveString(key, JSON.stringify(value));
}
  

export const get = async (key:string) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      return JSON.parse(itemString);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const deleteData = async(key: string) => {
  try{
    await AsyncStorage.removeItem(key)
  }
  catch(e){
    console.log(e);
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};

export default {
  saveString,
  save,
  get,
  deleteData,
  clearStorage
};