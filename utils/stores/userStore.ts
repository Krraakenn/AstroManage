/**
 * Store and manage user data using AsyncStorage in a React Native application.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Interface representing user data structure.
 */
export interface UserData {
  id: string; // Unique identifier for the user
  username: string; // The username of the user
  profilePicture?: string; // (Optional) URL or path to the user's profile picture
}

// Key used to store and retrieve user data in AsyncStorage
const USER_DATA_KEY = "@user_data";

/**
 * Stores the user data into AsyncStorage.
 *
 * @param {UserData} userData - The user data to be stored.
 * @returns {Promise<void>} - A promise that resolves when the data is successfully stored.
 */
export const storeUserData = async (userData: UserData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

/**
 * Retrieves the user data from AsyncStorage.
 *
 * @returns {Promise<UserData | null>} - A promise that resolves with the user data if it exists, or null if it doesn't.
 */
export const getUserData = async (): Promise<UserData | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error reading user data:", error);
    return null;
  }
};

/**
 * Removes the stored user data from AsyncStorage.
 *
 * @returns {Promise<void>} - A promise that resolves when the data is successfully removed.
 */
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error("Error removing user data:", error);
  }
};

/**
 * Clears all data stored in AsyncStorage, including user data.
 *
 * @returns {Promise<void>} - A promise that resolves when all storage is cleared.
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing the storage:", error);
  }
};
