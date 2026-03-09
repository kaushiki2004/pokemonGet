import React from "react";
import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { usePokemonController } from "../controllers/usePokemonController";

export default function HomeScreen() {
  const { pokemonName, setPokemonName, loading, error, pokemon, search } =
    usePokemonController();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Pokemon name (e.g., pikachu)"
        value={pokemonName}
        onChangeText={setPokemonName}
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={search} // optional: press enter to search
        returnKeyType="search"
      />

      <Button title={loading ? "Searching..." : "Get Pokemon"} onPress={search} disabled={loading} />

      {loading && <Text>Loading...</Text>}
      {!!error && <Text style={{ color: "red" }}>{error}</Text>}

      {!!pokemon && (
        <View style={{ marginTop: 16, alignItems: "center", gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>{pokemon.name}</Text>

          {!!pokemon.image && (
            <Image
              source={{ uri: pokemon.image }}
              style={{ width: 120, height: 120 }}
            />
          )}

          <Text>Types: {pokemon.types?.join(", ")}</Text>
          <Text>Abilities: {pokemon.abilities?.join(", ")}</Text>

          <Text style={{ fontWeight: "600", marginTop: 8 }}>Moves (first 5):</Text>
          {pokemon.moves?.map((m) => (
            <Text key={m}>• {m}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 10 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
});