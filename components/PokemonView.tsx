// src/components/PokemonView.tsx
import React from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Pokemon } from "../models/Pokemon";

type Props = {
  pokemonName: string;
  onChangeName: (text: string) => void;
  onSearch: () => void;

  loading: boolean;
  error: string;
  pokemon: Pokemon | null;

  favorites: string[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onLoadFavorite: (name: string) => void;
};

export function PokemonView({
  pokemonName,
  onChangeName,
  onSearch,
  loading,
  error,
  pokemon,
  favorites,
  isFavorite,
  onToggleFavorite,
  onLoadFavorite,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={onChangeName}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Button title="Get Pokemon" onPress={onSearch} />

      {loading && <Text>Loading...</Text>}
      {!!error && <Text style={styles.error}>{error}</Text>}

      {!!pokemon && (
        <View style={styles.result}>
          <Text style={styles.pokeName}>{pokemon.name}</Text>

          {!!pokemon.image && (
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          )}

          <Button
            title={isFavorite ? "Unfavorite" : "Favorite"}
            onPress={onToggleFavorite}
          />

          <Text>Types: {pokemon.types.join(", ")}</Text>
          <Text>Abilities: {pokemon.abilities.join(", ")}</Text>

          <Text style={styles.sectionTitle}>Moves (first 5):</Text>
          {pokemon.moves.slice(0, 5).map((m) => (
            <Text key={m}>• {m}</Text>
          ))}
        </View>
      )}

      <View style={styles.favoritesBox}>
        <Text style={styles.favoritesTitle}>Favorites</Text>

        {favorites.length === 0 ? (
          <Text style={styles.emptyFavorites}>No favorites yet.</Text>
        ) : (
          favorites.map((name) => (
            <View key={name} style={styles.favoriteItem}>
              <Button title={name} onPress={() => onLoadFavorite(name)} />
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  error: {
    color: "red",
  },
  result: {
    marginTop: 16,
    alignItems: "center",
    gap: 8,
  },
  pokeName: {
    fontSize: 20,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  image: {
    width: 120,
    height: 120,
  },
  sectionTitle: {
    marginTop: 8,
    fontWeight: "600",
  },
  favoritesBox: {
    marginTop: 20,
    width: "100%",
  },
  favoritesTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  emptyFavorites: {
    opacity: 0.6,
  },
  favoriteItem: {
    marginBottom: 6,
  },
});