import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "POKEMON_FAVORITES";

export async function loadFavorites(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!json) return [];
    return JSON.parse(json);
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: string[]): Promise<void> {
  try {
    const json = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, json);
  } catch {
    // optional: handle error (logging, etc.)
  }
}